<?php

namespace Database\Seeders;

use App\Models\Catering;
use App\Models\User;
use Illuminate\Database\Seeder;

class CateringSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first() ?? User::factory()->create([
            'name' => 'Admin CateringHub',
            'email' => 'admin@cateringhub.com',
            'password' => bcrypt('password'),
            'role' => 'seller',
        ]);

        // Ensure admin user has a known password even if already exists
        if (User::where('email', 'admin@cateringhub.com')->exists()) {
            User::where('email', 'admin@cateringhub.com')->update([
                'password' => bcrypt('password'),
                'role' => 'seller',
            ]);
        }

        $caterings = [
            [
                'user_id' => $user->id,
                'category_id' => 2, // Harian
                'name' => 'Dapur Bunda',
                'slug' => 'dapur-bunda',
                'description' => 'Masakan rumahan fresh setiap hari. Menu bergizi dan halal.',
                'address' => 'Jl. Merpati No. 12',
                'phone' => '081234567890',
                'rating' => 4.8,
                'review_count' => 120,
                'delivery_type' => 'antar',
                'delivery_time' => '20-30 menit',
                'delivery_fee' => 5000,
                'is_active' => true,
                'is_featured' => true,
                'image' => 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=327&h=137&fit=crop',
                'logo' => 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=60&h=60&fit=crop',
            ],
            [
                'user_id' => $user->id,
                'category_id' => 3, // Snack
                'name' => 'Snack Corner',
                'slug' => 'snack-corner',
                'description' => 'Aneka camilan renyah dan manis untuk menemani harimu.',
                'address' => 'Jl. Kenanga No. 5',
                'phone' => '081234567891',
                'rating' => 4.5,
                'review_count' => 85,
                'delivery_type' => 'antar',
                'delivery_time' => '15-25 menit',
                'delivery_fee' => 3000,
                'is_active' => true,
                'is_featured' => true,
                'image' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=327&h=137&fit=crop',
                'logo' => 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=60&h=60&fit=crop',
            ],
            [
                'user_id' => $user->id,
                'category_id' => 4, // Acara
                'name' => 'Catering Hajatan',
                'slug' => 'catering-hajatan',
                'description' => 'Paket prasmanan untuk acara spesial Anda. Enak dan berkesan.',
                'address' => 'Jl. Mawar No. 8',
                'phone' => '081234567892',
                'rating' => 4.7,
                'review_count' => 200,
                'delivery_type' => 'antar',
                'delivery_time' => 'dipesan H-1',
                'delivery_fee' => 0,
                'is_active' => true,
                'is_featured' => false,
                'image' => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=327&h=137&fit=crop',
                'logo' => 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=60&h=60&fit=crop',
            ],
            [
                'user_id' => $user->id,
                'category_id' => 2, // Harian
                'name' => 'Warung Sedep',
                'slug' => 'warung-sedep',
                'description' => 'Masakan rumahan dengan cita rasa tradisional.',
                'address' => 'Jl. Melati No. 3',
                'phone' => '081234567893',
                'rating' => 4.3,
                'review_count' => 65,
                'delivery_type' => 'antar',
                'delivery_time' => '25-35 menit',
                'delivery_fee' => 4000,
                'is_active' => true,
                'is_featured' => false,
                'image' => 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=327&h=137&fit=crop',
                'logo' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop',
            ],
            [
                'user_id' => $user->id,
                'category_id' => 5, // Minuman
                'name' => 'Es Teh Indonesia',
                'slug' => 'es-teh-indonesia',
                'description' => 'Minuman segar kekinian, es teh, kopi, dan jus buah.',
                'address' => 'Jl. Tulip No. 7',
                'phone' => '081234567894',
                'rating' => 4.6,
                'review_count' => 150,
                'delivery_type' => 'antar',
                'delivery_time' => '10-20 menit',
                'delivery_fee' => 2000,
                'is_active' => true,
                'is_featured' => true,
                'image' => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=327&h=137&fit=crop',
                'logo' => 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=60&h=60&fit=crop',
            ],
        ];

        foreach ($caterings as $catering) {
            Catering::updateOrCreate(
                ['slug' => $catering['slug']],
                $catering
            );
        }
    }
}
