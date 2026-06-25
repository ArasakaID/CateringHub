<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            CateringSeeder::class,
            MenuSeeder::class,
            CourierSeeder::class,
        ]);

        // Assign couriers to orders after orders exist
        $this->call([
            OrderCourierSeeder::class,
            OrderTrackingLogSeeder::class,
            ChatMessageSeeder::class,
        ]);
    }
}
