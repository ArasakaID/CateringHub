<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $menus = [
            // Dapur Bunda (catering_id = 1)
            ['catering_id' => 1, 'category_id' => 2, 'name' => 'Nasi Goreng Spesial', 'price' => 25000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop'],
            ['catering_id' => 1, 'category_id' => 2, 'name' => 'Ayam Bakar Madu', 'price' => 30000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop'],
            ['catering_id' => 1, 'category_id' => 2, 'name' => 'Sop Buntut', 'price' => 35000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop'],
            ['catering_id' => 1, 'category_id' => 3, 'name' => 'Pisang Goreng', 'price' => 10000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&h=400&fit=crop'],
            ['catering_id' => 1, 'category_id' => 5, 'name' => 'Es Teh Manis', 'price' => 5000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop'],

            // Snack Corner (catering_id = 2)
            ['catering_id' => 2, 'category_id' => 3, 'name' => 'Kentang Goreng', 'price' => 15000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop'],
            ['catering_id' => 2, 'category_id' => 3, 'name' => 'Cireng Isi', 'price' => 12000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=400&fit=crop'],
            ['catering_id' => 2, 'category_id' => 3, 'name' => 'Risol Mayo', 'price' => 10000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a7?w=400&h=400&fit=crop'],
            ['catering_id' => 2, 'category_id' => 5, 'name' => 'Es Campur', 'price' => 15000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop'],

            // Catering Hajatan (catering_id = 3) — added Minuman menus for filtering variety
            ['catering_id' => 3, 'category_id' => 4, 'name' => 'Paket Nasi Box A', 'price' => 35000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop'],
            ['catering_id' => 3, 'category_id' => 4, 'name' => 'Paket Nasi Box B', 'price' => 45000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop'],
            ['catering_id' => 3, 'category_id' => 4, 'name' => 'Paket Prasmanan', 'price' => 75000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=400&fit=crop'],
            ['catering_id' => 3, 'category_id' => 5, 'name' => 'Es Teh Manis', 'price' => 5000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop'],
            ['catering_id' => 3, 'category_id' => 5, 'name' => 'Air Mineral', 'price' => 3000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop'],

            // Warung Sedep (catering_id = 4) — added Snack menu for filtering variety
            ['catering_id' => 4, 'category_id' => 2, 'name' => 'Pecel Lele', 'price' => 18000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1615937657715-bc88b967b05b?w=400&h=400&fit=crop'],
            ['catering_id' => 4, 'category_id' => 2, 'name' => 'Ayam Geprek', 'price' => 20000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=400&fit=crop'],
            ['catering_id' => 4, 'category_id' => 2, 'name' => 'Ikan Bakar', 'price' => 28000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1629735869182-62118bae3b79?w=400&h=400&fit=crop'],
            ['catering_id' => 4, 'category_id' => 3, 'name' => 'Tempe Mendoan', 'price' => 8000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=400&fit=crop'],

            // Es Teh Indonesia (catering_id = 5) — added Snack/Kue menu for filtering variety
            ['catering_id' => 5, 'category_id' => 5, 'name' => 'Es Teh Manis', 'price' => 5000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop'],
            ['catering_id' => 5, 'category_id' => 5, 'name' => 'Es Jeruk', 'price' => 7000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop'],
            ['catering_id' => 5, 'category_id' => 5, 'name' => 'Kopi Susu', 'price' => 12000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop'],
            ['catering_id' => 5, 'category_id' => 5, 'name' => 'Jus Alpukat', 'price' => 15000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=400&fit=crop'],
            ['catering_id' => 5, 'category_id' => 6, 'name' => 'Kue Cubit', 'price' => 10000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop'],
            ['catering_id' => 5, 'category_id' => 6, 'name' => 'Pastel', 'price' => 8000, 'is_available' => true, 'image' => 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&h=400&fit=crop'],
        ];

        foreach ($menus as $menu) {
            Menu::updateOrCreate(
                ['catering_id' => $menu['catering_id'], 'name' => $menu['name']],
                $menu
            );
        }
    }
}
