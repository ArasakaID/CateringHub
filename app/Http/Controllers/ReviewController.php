<?php

namespace App\Http\Controllers;

use App\Models\Catering;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index($slug)
    {
        $catering = Catering::where('slug', $slug)->active()->firstOrFail();

        $reviews = $catering->reviews()
            ->with('user:id,name,avatar')
            ->latest()
            ->paginate(10);

        return Inertia::render('ReviewScreen', [
            'catering' => $catering,
            'reviews' => $reviews,
        ]);
    }
}
