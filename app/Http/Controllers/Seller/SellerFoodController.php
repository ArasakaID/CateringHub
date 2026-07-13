<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerFoodController extends Controller
{
    public function show(Menu $menu)
    {
        $user = request()->user();
        if ($menu->catering->user_id !== $user->id) {
            abort(403);
        }

        $reviewAvg = Review::where('catering_id', $menu->catering_id)->avg('rating') ?? 0;
        $reviewCount = Review::where('catering_id', $menu->catering_id)->count();

        return Inertia::render('Seller/FoodDetails', [
            'menu' => array_merge($menu->toArray(), [
                'rating' => round($reviewAvg, 1),
                'review_count' => $reviewCount,
            ]),
        ]);
    }

    public function edit(Menu $menu)
    {
        $user = request()->user();
        if ($menu->catering->user_id !== $user->id) {
            abort(403);
        }

        return redirect()->route('seller.add-menu', ['menu' => $menu->id]);
    }
}
