<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Catering;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerRevenueController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $catering = Catering::where('user_id', $user->id)->first();

        $totalRevenue = 0;
        $transactions = collect();
        $dailyRevenue = 0;
        $weeklyRevenue = 0;
        $monthlyRevenue = 0;

        if ($catering) {
            $paidOrders = Order::where('catering_id', $catering->id)
                ->where('payment_status', 'paid')
                ->with('items');

            $totalRevenue = (clone $paidOrders)->sum('total');

            $now = now();
            $dailyRevenue = (clone $paidOrders)->whereDate('created_at', $now)->sum('total');
            $weeklyRevenue = (clone $paidOrders)->whereBetween('created_at', [$now->copy()->startOfWeek(), $now->copy()->endOfWeek()])->sum('total');
            $monthlyRevenue = (clone $paidOrders)->whereMonth('created_at', $now->month)->whereYear('created_at', $now->year)->sum('total');

            $transactions = $paidOrders->orderByDesc('created_at')->take(20)->get()->map(fn ($o) => [
                'id' => $o->id,
                'order_number' => $o->order_number,
                'total' => (float) $o->total,
                'status' => $o->status,
                'created_at' => $o->created_at->format('d M Y, H:i'),
                'item_count' => $o->items->count(),
            ]);
        }

        return Inertia::render('Seller/RevenueDetails', [
            'totalRevenue' => (float) $totalRevenue,
            'dailyRevenue' => (float) $dailyRevenue,
            'weeklyRevenue' => (float) $weeklyRevenue,
            'monthlyRevenue' => (float) $monthlyRevenue,
            'transactions' => $transactions,
        ]);
    }
}
