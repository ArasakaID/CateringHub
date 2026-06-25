<?php

namespace Database\Seeders;

use App\Models\Courier;
use App\Models\Order;
use Illuminate\Database\Seeder;

class OrderCourierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $couriers = Courier::all();
        $orders = Order::whereIn('status', ['confirmed', 'preparing', 'picked_up', 'arriving_soon', 'delivered'])->get();

        if ($couriers->isEmpty() || $orders->isEmpty()) {
            return;
        }

        foreach ($orders as $index => $order) {
            $courier = $couriers[$index % $couriers->count()];

            $pivotStatus = match ($order->status) {
                'confirmed' => 'assigned',
                'preparing' => 'picking',
                'picked_up' => 'delivering',
                'arriving_soon' => 'delivering',
                'delivered' => 'delivered',
                default => 'assigned',
            };

            $order->couriers()->attach($courier->id, [
                'assigned_at' => now()->subHours(3),
                'status' => $pivotStatus,
            ]);
        }
    }
}
