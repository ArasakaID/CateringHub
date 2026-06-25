<?php

namespace Database\Seeders;

use App\Models\Courier;
use Illuminate\Database\Seeder;

class CourierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $couriers = [
            [
                'name' => 'Robert F.',
                'phone' => '0812-3456-7890',
                'vehicle_type' => 'Motor',
                'is_active' => true,
            ],
            [
                'name' => 'Amanda Ketring',
                'phone' => '0812-3456-7891',
                'vehicle_type' => 'Mobil',
                'is_active' => true,
            ],
            [
                'name' => 'Budi Santoso',
                'phone' => '0812-3456-7892',
                'vehicle_type' => 'Motor',
                'is_active' => true,
            ],
        ];

        foreach ($couriers as $courier) {
            Courier::create($courier);
        }
    }
}
