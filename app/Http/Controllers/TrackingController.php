<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Courier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class TrackingController extends Controller
{
    /**
     * Display the tracking page (State 1 & 2).
     */
    public function show(Order $order)
    {
        // Authorize — only the order owner can track
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->load(['catering', 'items', 'couriers', 'trackingLogs']);

        $courier = $order->courier();
        $trackingLogs = $order->trackingLogs;

        // Determine if we show State 2 (picked_up / arriving_soon) vs State 1
        $isAdvanced = in_array($order->status, ['picked_up', 'arriving_soon']);

        // Estimated delivery time (default 20 min, could be from tracking log)
        $eta = '20 min';

        return Inertia::render('Tracking', [
            'order' => $order,
            'courier' => $courier,
            'trackingLogs' => $trackingLogs,
            'eta' => $eta,
            'isAdvanced' => $isAdvanced,
        ]);
    }

    /**
     * Display the call screen for a courier.
     */
    public function initiateCall(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $courier = $order->courier();

        return Inertia::render('CallScreen', [
            'order' => $order,
            'courier' => $courier,
        ]);
    }

    /**
     * Display the chat/message screen for an order.
     */
    public function chat(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->load(['chatMessages', 'catering']);

        $courier = $order->courier();

        return Inertia::render('MessageScreen', [
            'order' => $order,
            'courier' => $courier,
            'messages' => $order->chatMessages,
        ]);
    }

    /**
     * Send a new message from the user to the courier (AJAX).
     */
    public function sendMessage(Request $request, Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        // Save user message
        $message = $order->chatMessages()->create([
            'sender_type' => 'user',
            'message' => $validated['message'],
            'is_read' => false,
        ]);

        // Generate AI reply synchronously
        $groqKey = config('services.groq.api_key');
        $aiReply = null;

        if ($groqKey) {
            $order->loadMissing(['catering', 'couriers']);
            $courier = $order->courier();
            $cateringName = $order->catering?->name ?? 'Catering';
            $driverName = $courier?->name ?? 'Kurir';
            $statusLabel = match ($order->status) {
                'confirmed' => 'pesanan dikonfirmasi, sedang dipersiapkan',
                'preparing' => 'sedang dimasak',
                'picked_up' => 'sedang dalam perjalanan',
                'arriving_soon' => 'akan segera tiba',
                'delivered', 'completed' => 'sudah diantar',
                default => 'dalam proses',
            };
            $eta = in_array($order->status, ['picked_up', 'arriving_soon']) ? '20 menit lagi' : 'masih diproses';

            $systemContext = "Kamu adalah {$driverName}, kurir pengiriman dari {$cateringName}. "
                . "Status pesanan: {$statusLabel} (estimasi {$eta}). "
                . "Balas pesan pembeli dengan singkat, sopan, natural dalam Bahasa Indonesia sebagai seorang kurir. "
                . "Maksimal 2 kalimat.";

            $latestUserMsg = $validated['message'];

            try {
                $response = Http::withOptions(['verify' => false])
                    ->withHeaders([
                        'Authorization' => 'Bearer ' . $groqKey,
                        'Content-Type' => 'application/json',
                    ])->timeout(15)->post('https://api.groq.com/openai/v1/chat/completions', [
                        'model' => 'llama-3.3-70b-versatile',
                        'messages' => [
                            ['role' => 'system', 'content' => $systemContext],
                            ['role' => 'user', 'content' => $latestUserMsg],
                        ],
                        'max_tokens' => 100,
                    ]);

                if ($response->successful()) {
                    $reply = $response->json('choices.0.message.content');
                    if ($reply) {
                        $aiReply = $order->chatMessages()->create([
                            'sender_type' => 'courier',
                            'message' => trim($reply),
                            'is_read' => true,
                        ]);
                    }
                }
            } catch (\Exception $e) {
                // Silently fail — user message was still sent
            }
        }

        return response()->json([
            'message' => $message,
            'ai_reply' => $aiReply,
        ]);
    }

    /**
     * Fetch new messages since a given ID (AJAX polling).
     */
    public function fetchNewMessages(Request $request, Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $after = $request->integer('after', 0);

        $messages = $order->chatMessages()
            ->where('id', '>', $after)
            ->orderBy('created_at')
            ->get();

        return response()->json(['messages' => $messages]);
    }

    /**
     * Advance order status to next step (for auto-progress demo).
     */
    public function advanceStatus(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $flow = ['pending', 'confirmed', 'preparing', 'picked_up', 'arriving_soon', 'delivered'];
        $currentIdx = array_search($order->status, $flow);

        if ($currentIdx === false || $currentIdx >= count($flow) - 1) {
            return response()->json(['done' => true, 'status' => $order->status]);
        }

        $nextStatus = $flow[$currentIdx + 1];
        $order->update(['status' => $nextStatus]);

        // Update/create tracking log for each completed step
        for ($i = 1; $i <= $currentIdx + 1; $i++) {
            \App\Models\OrderTrackingLog::updateOrCreate(
                ['order_id' => $order->id, 'status' => $flow[$i]],
                ['label' => match($flow[$i]) {
                    'confirmed' => 'Your order has been received',
                    'preparing' => 'The restaurant is preparing your food',
                    'picked_up' => 'Your order has been picked up for delivery',
                    'arriving_soon' => 'Order arriving soon!',
                    'delivered' => 'Order delivered',
                    default => $flow[$i],
                }, 'is_completed' => true, 'completed_at' => now()]
            );
        }

        return response()->json(['status' => $nextStatus]);
    }
}
