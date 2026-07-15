<?php

namespace App\Filament\Widgets;

use App\Models\Menu;
use App\Models\Order;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class CateringStatsWidget extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $cateringIds = auth()->user()->managedCateringIds();

        $totalMenu = Menu::whereIn('catering_id', $cateringIds)->count();
        $totalOrders = Order::whereIn('catering_id', $cateringIds)->count();
        $pendingOrders = Order::whereIn('catering_id', $cateringIds)
            ->where('status', 'pending')
            ->count();
        $totalRevenue = Order::whereIn('catering_id', $cateringIds)
            ->where('payment_status', 'paid')
            ->sum('total');

        return [
            Stat::make('Total Menu', $totalMenu)
                ->description('Menu kamu tersedia')
                ->descriptionIcon('heroicon-o-clipboard-document-list')
                ->color('primary'),

            Stat::make('Pesanan Masuk', $totalOrders)
                ->description($pendingOrders . ' pesanan pending')
                ->descriptionIcon('heroicon-o-shopping-cart')
                ->color('warning'),

            Stat::make('Pendapatan', 'Rp ' . number_format($totalRevenue, 0, ',', '.'))
                ->description('Total pendapatan')
                ->descriptionIcon('heroicon-o-currency-dollar')
                ->color('success'),
        ];
    }
}
