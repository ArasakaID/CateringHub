<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderTrackingLog;
use Illuminate\Database\Seeder;

class OrderTrackingLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = Order::all();

        // Define the standard tracking steps
        $steps = [
            [
                'status' => 'confirmed',
                'label' => 'Your order has been received',
                'description' => 'The restaurant has confirmed your order and is preparing to cook.',
            ],
            [
                'status' => 'preparing',
                'label' => 'The restaurant is preparing your food',
                'description' => 'Your food is being cooked and packed with care.',
            ],
            [
                'status' => 'picked_up',
                'label' => 'Your order has been picked up for delivery',
                'description' => 'The courier has picked up your order and is on the way.',
            ],
            [
                'status' => 'arriving_soon',
                'label' => 'Order arriving soon!',
                'description' => 'Your courier is almost at your location.',
            ],
        ];

        foreach ($orders as $order) {
            // Determine how many steps to complete based on order status
            $completedCount = match ($order->status) {
                'pending' => 0,
                'confirmed' => 1,
                'preparing' => 2,
                'picked_up' => 3,
                'arriving_soon' => 4,
                'delivered' => 4,
                default => 0,
            };

            foreach ($steps as $index => $step) {
                $isCompleted = $index < $completedCount;
                $completedAt = $isCompleted ? now()->subHours(4 - $index) : null;

                OrderTrackingLog::create([
                    'order_id' => $order->id,
                    'status' => $step['status'],
                    'label' => $step['label'],
                    'description' => $step['description'],
                    'is_completed' => $isCompleted,
                    'completed_at' => $completedAt,
                ]);
            }
        }
    }
}
