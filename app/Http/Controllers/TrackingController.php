<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Courier;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        return Inertia::render('MessageScreen', [
            'order' => $order,
            'messages' => $order->chatMessages,
        ]);
    }

    /**
     * Send a new message from the user to the courier.
     */
    public function sendMessage(Request $request, Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $message = $order->chatMessages()->create([
            'sender_type' => 'user',
            'message' => $validated['message'],
            'is_read' => false,
        ]);

        return redirect()->route('tracking.chat', $order->id);
    }
}
