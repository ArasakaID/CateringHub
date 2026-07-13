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

            $revenueChartData = $this->getRevenueChartData($catering->id, $request->get('period', 'daily'));

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

    private function getRevenueChartData(int $cateringId, string $period): array
    {
        $orders = Order::where('catering_id', $cateringId)
            ->where('payment_status', 'paid')
            ->get(['total', 'created_at']);

        return match ($period) {
            'weekly' => $this->weeklyChartData($orders),
            'monthly' => $this->monthlyChartData($orders),
            default => $this->dailyChartData($orders),
        };
    }

    private function dailyChartData($orders): array
    {
        $buckets = [];
        for ($i = 10; $i <= 16; $i++) {
            $buckets[$i] = 0;
        }
        foreach ($orders as $order) {
            $hour = (int) $order->created_at->format('G');
            if (isset($buckets[$hour])) {
                $buckets[$hour] += (float) $order->total;
            }
        }
        $result = [];
        foreach ($buckets as $hour => $revenue) {
            $label = $hour <= 12 ? $hour . 'AM' : ($hour - 12) . 'PM';
            $result[] = ['label' => $label, 'value' => $revenue];
        }
        return $result;
    }

    private function weeklyChartData($orders): array
    {
        $days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        $buckets = array_fill_keys($days, 0);
        foreach ($orders as $order) {
            $day = $order->created_at->format('D');
            if (isset($buckets[$day])) {
                $buckets[$day] += (float) $order->total;
            }
        }
        $result = [];
        foreach ($buckets as $day => $revenue) {
            $result[] = ['label' => $day, 'value' => $revenue];
        }
        return $result;
    }

    private function monthlyChartData($orders): array
    {
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $buckets = array_fill_keys($months, 0);
        foreach ($orders as $order) {
            $month = $order->created_at->format('M');
            if (isset($buckets[$month])) {
                $buckets[$month] += (float) $order->total;
            }
        }
        $result = [];
        foreach ($buckets as $month => $revenue) {
            $result[] = ['label' => $month, 'value' => $revenue];
        }
        return $result;
    }
}
