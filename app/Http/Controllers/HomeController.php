<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Catering;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::active()->get();
        $caterings = Catering::with('category')->active()->get();

        return Inertia::render('Home', [
            'categories' => $categories,
            'caterings' => $caterings,
        ]);
    }

    public function showCatering($slug)
    {
        $catering = Catering::with([
            'category',
            'menus' => function ($query) {
                $query->where('is_available', true)->with('category');
            },
        ])
            ->where('slug', $slug)
            ->active()
            ->firstOrFail();

        // Derive filter keywords from unique menu categories
        $keywords = $catering->menus
            ->pluck('category')
            ->unique('id')
            ->values();

        return Inertia::render('CateringAcara', [
            'catering' => $catering,
            'keywords' => $keywords,
        ]);
    }

    public function filter(Request $request)
    {
        $query = Catering::with('category')->active();

        if ($request->filled('category_id') && $request->category_id !== 'semua') {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $caterings = $query->get();

        return response()->json($caterings);
    }
}
