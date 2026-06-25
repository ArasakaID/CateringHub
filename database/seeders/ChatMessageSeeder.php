<?php

namespace Database\Seeders;

use App\Models\ChatMessage;
use App\Models\Order;
use Illuminate\Database\Seeder;

class ChatMessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Only seed chat messages for orders that have couriers assigned
        // For now, seed for the first order that has progressed past "preparing"
        $order = Order::whereIn('status', ['picked_up', 'arriving_soon', 'delivered'])->first();

        if (!$order) {
            // Fallback: use the latest order
            $order = Order::latest()->first();
            if (!$order) return;
        }

        $messages = [
            [
                'sender_type' => 'user',
                'message' => 'Pesanan saya aman ?',
                'is_read' => true,
                'created_at' => now()->subMinutes(12),
            ],
            [
                'sender_type' => 'courier',
                'message' => 'Aman, sudah diantar ketujuan',
                'is_read' => true,
                'created_at' => now()->subMinutes(11),
            ],
            [
                'sender_type' => 'user',
                'message' => 'Posisi sudah di mana ya ?',
                'is_read' => true,
                'created_at' => now()->subMinutes(10),
            ],
            [
                'sender_type' => 'courier',
                'message' => 'Sebentar lagi di tunggu ya..',
                'is_read' => true,
                'created_at' => now()->subMinutes(9),
            ],
            [
                'sender_type' => 'user',
                'message' => 'Tolong cepat',
                'is_read' => false,
                'created_at' => now()->subMinutes(8),
            ],
        ];

        foreach ($messages as $msg) {
            ChatMessage::create([
                'order_id' => $order->id,
                'sender_type' => $msg['sender_type'],
                'message' => $msg['message'],
                'is_read' => $msg['is_read'],
                'created_at' => $msg['created_at'],
                'updated_at' => $msg['created_at'],
            ]);
        }
    }
}
