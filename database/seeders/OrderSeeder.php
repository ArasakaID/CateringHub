<?php

namespace Database\Seeders;

use App\Models\Catering;
use App\Models\Menu;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $caterings = Catering::all();

        foreach ($caterings as $catering) {
            $menus = Menu::where('catering_id', $catering->id)->take(5)->get();
            if ($menus->isEmpty()) continue;

            $statuses = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];
            $days = [0, 1, 2, 3, 4, 5, 6];

            foreach ($days as $day) {
                $numOrders = rand(1, 4);
                for ($i = 0; $i < $numOrders; $i++) {
                    $status = $statuses[array_rand($statuses)];
                    $menu = $menus->random();
                    $qty = rand(1, 3);
                    $subtotal = $menu->price * $qty;
                    $deliveryFee = $catering->delivery_fee;
                    $total = $subtotal + $deliveryFee;

                    $order = Order::create([
                        'user_id' => $catering->user_id,
                        'catering_id' => $catering->id,
                        'order_number' => 'ORD-' . strtoupper(uniqid()),
                        'subtotal' => $subtotal,
                        'delivery_fee' => $deliveryFee,
                        'total' => $total,
                        'status' => $status,
                        'notes' => null,
                        'delivery_address' => $catering->address,
                        'phone' => $catering->phone,
                        'payment_method' => 'transfer',
                        'payment_status' => in_array($status, ['confirmed', 'preparing', 'delivered']) ? 'paid' : 'unpaid',
                        'paid_at' => in_array($status, ['confirmed', 'preparing', 'delivered']) ? now()->subDays($day)->addHours(rand(1, 12)) : null,
                        'created_at' => now()->subDays($day)->addHours(rand(8, 20)),
                        'updated_at' => now()->subDays($day)->addHours(rand(8, 20)),
                    ]);

                    OrderItem::create([
                        'order_id' => $order->id,
                        'menu_id' => $menu->id,
                        'menu_name' => $menu->name,
                        'price' => $menu->price,
                        'quantity' => $qty,
                        'subtotal' => $subtotal,
                    ]);
                }
            }
        }
    }
}
