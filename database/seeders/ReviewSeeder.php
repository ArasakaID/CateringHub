<?php

namespace Database\Seeders;

use App\Models\Catering;
use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $caterings = Catering::all();

        foreach ($caterings as $catering) {
            $numReviews = rand(10, 30);
            for ($i = 0; $i < $numReviews; $i++) {
                Review::create([
                    'user_id' => $catering->user_id,
                    'catering_id' => $catering->id,
                    'rating' => rand(3, 5),
                    'comment' => 'Review for ' . $catering->name . ' #' . ($i + 1),
                    'created_at' => now()->subDays(rand(0, 30)),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
