<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Catering;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerOrderController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $catering = Catering::where('user_id', $user->id)->first();

        $runningOrders = collect();
        $orderRequestCount = 0;

        if ($catering) {
            $runningOrders = Order::with(['items.menu', 'user'])
                ->where('catering_id', $catering->id)
                ->whereIn('status', ['confirmed', 'preparing'])
                ->latest()
                ->get();

            $orderRequestCount = Order::where('catering_id', $catering->id)
                ->where('status', 'pending')
                ->count();
        }

        return Inertia::render('Seller/RunningOrders', [
            'runningOrders' => $runningOrders,
            'runningCount' => $runningOrders->count(),
            'orderRequestCount' => $orderRequestCount,
        ]);
    }

    public function markDone(Order $order)
    {
        if ($order->catering->user_id !== auth()->id()) {
            abort(403);
        }

        $order->update(['status' => 'completed']);

        return back()->with('success', 'Order selesai');
    }

    public function cancel(Order $order)
    {
        if ($order->catering->user_id !== auth()->id()) {
            abort(403);
        }

        $order->update(['status' => 'cancelled']);

        return back()->with('success', 'Order dibatalkan');
    }
}
