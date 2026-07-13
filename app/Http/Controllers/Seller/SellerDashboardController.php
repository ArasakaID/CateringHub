<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Catering;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SellerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $catering = Catering::where('user_id', $user->id)->first();

        $runningOrdersCount = 0;
        $orderRequestsCount = 0;
        $totalRevenue = 0;
        $revenueChartData = [];
        $reviewsSummary = ['average' => 0, 'count' => 0];
        $popularItems = collect();

        if ($catering) {
            $runningOrdersCount = Order::where('catering_id', $catering->id)
                ->whereIn('status', ['confirmed', 'preparing'])
                ->count();

            $orderRequestsCount = Order::where('catering_id', $catering->id)
                ->where('status', 'pending')
                ->count();

            $totalRevenue = Order::where('catering_id', $catering->id)
                ->where('payment_status', 'paid')
                ->sum('total');

            $revenueChartData = $this->getRevenueChartData($catering->id);

            $reviewsSummary = [
                'average' => round(Review::where('catering_id', $catering->id)->avg('rating') ?? 0, 1),
                'count' => Review::where('catering_id', $catering->id)->count(),
            ];

            $popularItems = Menu::where('catering_id', $catering->id)
                ->withCount(['orderItems as sold_count' => function ($q) {
                    $q->whereHas('order', fn ($oq) => $oq->where('payment_status', 'paid'));
                }])
                ->orderByDesc('sold_count')
                ->take(8)
                ->get()
                ->map(fn ($item) => [
                    'id' => $item->id,
                    'name' => $item->name,
                    'image' => $item->image,
                    'price' => $item->price,
                    'sold_count' => $item->sold_count,
                ]);
        }

        return Inertia::render('Seller/Dashboard', [
            'catering' => $catering ? [
                'id' => $catering->id,
                'name' => $catering->name,
                'address' => $catering->address,
            ] : null,
            'stats' => [
                'runningOrders' => $runningOrdersCount,
                'orderRequests' => $orderRequestsCount,
            ],
            'totalRevenue' => $totalRevenue,
            'revenueChartData' => $revenueChartData,
            'reviewsSummary' => $reviewsSummary,
            'popularItems' => $popularItems,
        ]);
    }

    private function getRevenueChartData(int $cateringId): array
    {
        $data = [];
        for ($i = 10; $i <= 16; $i++) {
            $data[$i] = 0;
        }

        $orders = Order::where('catering_id', $cateringId)
            ->where('payment_status', 'paid')
            ->get(['total', 'created_at']);

        foreach ($orders as $order) {
            $hour = (int) $order->created_at->format('G');
            if (isset($data[$hour])) {
                $data[$hour] += (float) $order->total;
            }
        }

        $result = [];
        foreach ($data as $hour => $revenue) {
            $label = $hour <= 12 ? $hour . 'AM' : ($hour - 12) . 'PM';
            $result[] = [
                'label' => $label,
                'value' => $revenue,
            ];
        }

        return $result;
    }
}
