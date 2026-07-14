<?php

namespace App\Http\Controllers;

use App\Models\Catering;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index(Catering $catering)
    {
        $reviews = $catering->reviews()
            ->with('user')
            ->latest()
            ->paginate(10);

        return Inertia::render('ReviewScreen', [
            'catering' => $catering,
            'reviews' => $reviews,
        ]);
    }
}
