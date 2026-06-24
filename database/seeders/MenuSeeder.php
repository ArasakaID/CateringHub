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
            [
                'catering_id' => 1, 'category_id' => 2, 'name' => 'Nasi Goreng Spesial',
                'description' => 'Nasi goreng dengan bumbu spesial pilihan, dilengkapi telur mata sapi, kerupuk, dan acar segar.',
                'price' => 25000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop',
                'options' => '["Nasi hangat", "Telur puyuh"]',
            ],
            [
                'catering_id' => 1, 'category_id' => 2, 'name' => 'Ayam Bakar Madu',
                'description' => 'Ayam bakar dengan balutan madu asli, empuk dan meresap hingga ke tulang. Disajikan dengan sambal terasi dan lalapan.',
                'price' => 30000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop',
                'options' => '["Sambal terasi", "Sambal kecap"]',
            ],
            [
                'catering_id' => 1, 'category_id' => 2, 'name' => 'Sop Buntut',
                'description' => 'Sop buntut sapi dengan kuah kaldu bening yang gurih, wortel, kentang, dan taburan bawang goreng.',
                'price' => 35000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop',
                'options' => '["Nasi putih", "Kentang goreng"]',
            ],
            [
                'catering_id' => 1, 'category_id' => 3, 'name' => 'Pisang Goreng',
                'description' => 'Pisang raja yang matang sempurna, digoreng dengan tepung crispy, disajikan hangat dengan topping keju dan coklat.',
                'price' => 10000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&h=400&fit=crop',
                'options' => '["Keju", "Coklat", "Mix"]',
            ],
            [
                'catering_id' => 1, 'category_id' => 5, 'name' => 'Es Teh Manis',
                'description' => 'Teh pilihan yang diseduh segar, disajikan dengan es batu dan gula batu asli.',
                'price' => 5000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
                'options' => '["Tawar", "Manis", "Extra manis"]',
            ],

            // Snack Corner (catering_id = 2)
            [
                'catering_id' => 2, 'category_id' => 3, 'name' => 'Kentang Goreng',
                'description' => 'Kentang goreng premium dengan tekstur renyah di luar dan lembut di dalam. Cocok sebagai teman santai.',
                'price' => 15000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop',
                'options' => '["Saos sambal", "Saos keju", "Mayonaise"]',
            ],
            [
                'catering_id' => 2, 'category_id' => 3, 'name' => 'Cireng Isi',
                'description' => 'Cireng isi daging ayam dan sayuran pilihan, digoreng crispy, cocok untuk cemilan sore.',
                'price' => 12000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=400&fit=crop',
                'options' => '["Ayam pedas", "Ayam original", "Sosis"]',
            ],
            [
                'catering_id' => 2, 'category_id' => 3, 'name' => 'Risol Mayo',
                'description' => 'Risol dengan isian mayo, telur, dan daging asap. Kulitnya lembut dan creamy di dalam.',
                'price' => 10000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a7?w=400&h=400&fit=crop',
                'options' => '["Original", "Keju"]',
            ],
            [
                'catering_id' => 2, 'category_id' => 5, 'name' => 'Es Campur',
                'description' => 'Minuman segar dengan campuran buah-buahan, cincau, kolang kaling, dan sirup manis.',
                'price' => 15000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop',
                'options' => '["Susu", "Tanpa susu"]',
            ],

            // Catering Hajatan (catering_id = 3)
            [
                'catering_id' => 3, 'category_id' => 4, 'name' => 'Paket Nasi Box A',
                'description' => 'Paket nasi box lengkap dengan ayam goreng, sambal goreng kentang, capcay, kerupuk udang, dan buah potong.',
                'price' => 35000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop',
                'options' => '["Nasi putih", "Nasi goreng"]',
            ],
            [
                'catering_id' => 3, 'category_id' => 4, 'name' => 'Paket Nasi Box B',
                'description' => 'Paket nasi box premium dengan rendang daging sapi, sayur nangka, telur balado, dan sambal ijo.',
                'price' => 45000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
                'options' => '["Nasi putih", "Nasi uduk"]',
            ],
            [
                'catering_id' => 3, 'category_id' => 4, 'name' => 'Paket Prasmanan',
                'description' => 'Paket prasmanan lengkap untuk 10 orang: 5 menu utama, 3 menu sayur, lalapan, dan es buah segar.',
                'price' => 75000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=400&fit=crop',
                'options' => '["Nasi putih", "Nasi kuning"]',
            ],
            [
                'catering_id' => 3, 'category_id' => 5, 'name' => 'Es Teh Manis',
                'description' => 'Teh manis segar dengan es batu, cocok sebagai pelengkap hidangan nasi box.',
                'price' => 5000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
                'options' => null,
            ],
            [
                'catering_id' => 3, 'category_id' => 5, 'name' => 'Air Mineral',
                'description' => 'Air mineral kemasan gelas 240ml, bersih dan higienis.',
                'price' => 3000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop',
                'options' => null,
            ],

            // Warung Sedep (catering_id = 4)
            [
                'catering_id' => 4, 'category_id' => 2, 'name' => 'Pecel Lele',
                'description' => 'Lele goreng crispy dengan bumbu pecel khas, sambal terasi segar, dan lalapan mentimun-kemangi.',
                'price' => 18000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1615937657715-bc88b967b05b?w=400&h=400&fit=crop',
                'options' => '["Nasi putih", "Nasi merah"]',
            ],
            [
                'catering_id' => 4, 'category_id' => 2, 'name' => 'Ayam Geprek',
                'description' => 'Ayam goreng tepung krispi yang digeprek dengan sambal bawang pedas. Dilengkapi lalapan segar.',
                'price' => 20000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=400&fit=crop',
                'options' => '["Nasi putih", "Nasi goreng"]',
            ],
            [
                'catering_id' => 4, 'category_id' => 2, 'name' => 'Ikan Bakar',
                'description' => 'Ikan nila bakar bumbu rica-rica khas Manado, pedas gurih menggugah selera.',
                'price' => 28000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1629735869182-62118bae3b79?w=400&h=400&fit=crop',
                'options' => '["Nasi putih", "Nasi kuning"]',
            ],
            [
                'catering_id' => 4, 'category_id' => 3, 'name' => 'Tempe Mendoan',
                'description' => 'Tempe mendoan crispy dengan bumbu kecap pedas manis. Cocok sebagai camilan atau lauk pendamping.',
                'price' => 8000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=400&fit=crop',
                'options' => '["Kecap pedas", "Kecap manis"]',
            ],

            // Es Teh Indonesia (catering_id = 5)
            [
                'catering_id' => 5, 'category_id' => 5, 'name' => 'Es Teh Manis',
                'description' => 'Teh melati pilihan, disajikan dingin dengan gula batu asli. Segar dan nikmat.',
                'price' => 5000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
                'options' => '["Tawar", "Manis", "Extra manis"]',
            ],
            [
                'catering_id' => 5, 'category_id' => 5, 'name' => 'Es Jeruk',
                'description' => 'Jeruk peras segar asli, tanpa pemanis buatan, kaya vitamin C.',
                'price' => 7000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop',
                'options' => '["Manis", "Asam", "Mix"]',
            ],
            [
                'catering_id' => 5, 'category_id' => 5, 'name' => 'Kopi Susu',
                'description' => 'Kopi robusta pilihan dengan campuran susu segar, disajikan dingin. Cocok untuk pecinta kopi.',
                'price' => 12000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
                'options' => '["Gula aren", "Gula pasir"]',
            ],
            [
                'catering_id' => 5, 'category_id' => 5, 'name' => 'Jus Alpukat',
                'description' => 'Alpukat segar dijus dengan campuran susu coklat, taburan keju parut di atasnya.',
                'price' => 15000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=400&fit=crop',
                'options' => '["Susu coklat", "Susu putih", "Tanpa susu"]',
            ],
            [
                'catering_id' => 5, 'category_id' => 6, 'name' => 'Kue Cubit',
                'description' => 'Kue cubit klasik dengan tekstur lembut, taburan meises dan keju di atasnya.',
                'price' => 10000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',
                'options' => '["Meises", "Keju", "Matcha"]',
            ],
            [
                'catering_id' => 5, 'category_id' => 6, 'name' => 'Pastel',
                'description' => 'Pastel isi daging cincang, sayuran, dan bihun. Kulitnya renyah, cocok untuk teman minum teh.',
                'price' => 8000, 'is_available' => true,
                'image' => 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&h=400&fit=crop',
                'options' => '["Original", "Pedas"]',
            ],
        ];

        foreach ($menus as $menu) {
            $data = $menu;
            if (isset($data['options']) && is_string($data['options'])) {
                $data['options'] = json_decode($data['options'], true);
            }
            Menu::updateOrCreate(
                ['catering_id' => $menu['catering_id'], 'name' => $menu['name']],
                $data
            );
        }
    }
}
