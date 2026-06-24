<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Semua', 'slug' => 'semua', 'icon' => '🍽️', 'sort_order' => 0],
            ['name' => 'Harian', 'slug' => 'harian', 'icon' => '📅', 'sort_order' => 1],
            ['name' => 'Snack', 'slug' => 'snack', 'icon' => '🍿', 'sort_order' => 2],
            ['name' => 'Acara', 'slug' => 'acara', 'icon' => '🎉', 'sort_order' => 3],
            ['name' => 'Minuman', 'slug' => 'minuman', 'icon' => '🥤', 'sort_order' => 4],
            ['name' => 'Kue', 'slug' => 'kue', 'icon' => '🍰', 'sort_order' => 5],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
