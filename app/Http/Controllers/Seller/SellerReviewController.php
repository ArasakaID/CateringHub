<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Catering;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerReviewController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $catering = Catering::where('user_id', $user->id)->first();

        $reviews = collect();
        $averageRating = 0;
        $totalReviews = 0;

        if ($catering) {
            $averageRating = round(Review::where('catering_id', $catering->id)->avg('rating') ?? 0, 1);
            $totalReviews = Review::where('catering_id', $catering->id)->count();

            $reviews = Review::where('catering_id', $catering->id)
                ->with('user')
                ->orderByDesc('created_at')
                ->get()
                ->map(fn ($r) => [
                    'id' => $r->id,
                    'rating' => $r->rating,
                    'comment' => $r->comment,
                    'user_name' => $r->user->name ?? 'Anonymous',
                    'created_at' => $r->created_at->diffForHumans(),
                ]);
        }

        return Inertia::render('Seller/Reviews', [
            'reviews' => $reviews,
            'averageRating' => $averageRating,
            'totalReviews' => $totalReviews,
        ]);
    }
}
