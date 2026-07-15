<?php

namespace App\Filament\Widgets;

use App\Models\Catering;
use App\Models\Menu;
use App\Models\Order;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class AdminStatsWidget extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Users', User::count())
                ->description('Semua pengguna terdaftar')
                ->descriptionIcon('heroicon-o-users')
                ->color('gray'),

            Stat::make('Total Catering', Catering::count())
                ->description('Mitra catering aktif')
                ->descriptionIcon('heroicon-o-building-storefront')
                ->color('warning'),

            Stat::make('Total Menu', Menu::count())
                ->description('Menu tersedia')
                ->descriptionIcon('heroicon-o-clipboard-document-list')
                ->color('primary'),

            Stat::make('Total Pesanan', Order::count())
                ->description('Semua order masuk')
                ->descriptionIcon('heroicon-o-shopping-cart')
                ->color('success'),
        ];
    }
}
