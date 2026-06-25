<?php

namespace App\Http\Controllers;

use App\Models\Catering;
use App\Models\Menu;
use App\Models\Category;
use App\Services\CartService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    protected CartService $cart;

    public function __construct(CartService $cart)
    {
        $this->cart = $cart;
    }

    public function index(Request $request)
    {
        $query = $request->input('q');
        $tag = $request->input('tag');

        // Keywords — derived from active categories
        $keywords = Category::active()->get();

        // Search caterings
        $caterings = collect();
        if ($query || $tag) {
            $cateringQuery = Catering::with('category')->active();

            if ($query) {
                $cateringQuery->where(function ($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                      ->orWhere('description', 'like', "%{$query}%");
                });
            }

            if ($tag) {
                $cateringQuery->whereHas('category', function ($q) use ($tag) {
                    $q->where('slug', $tag);
                });
            }

            $caterings = $cateringQuery->get();
        } else {
            // Default: show featured caterings for "Rekomendasi"
            $caterings = Catering::with('category')->active()->featured()->get();
        }

        // Popular menus (top rated menus with catering info)
        $menus = Menu::with(['catering' => function ($q) {
            $q->active();
        }])
            ->whereHas('catering', function ($q) {
                $q->active();
            })
            ->available()
            ->inRandomOrder()
            ->take(4)
            ->get()
            ->filter(fn ($m) => $m->catering !== null);

        // Filter menus by tag if selected
        if ($tag) {
            $menus = $menus->filter(function ($menu) use ($tag) {
                return $menu->category && $menu->category->slug === $tag;
            });
        }

        // Filter menus by search query
        if ($query) {
            $menus = $menus->filter(function ($menu) use ($query) {
                return stripos($menu->name, $query) !== false;
            });
        }

        // If query matches a caterings by name, also include their menus
        if ($query) {
            $matchingCateringIds = Catering::active()
                ->where('name', 'like', "%{$query}%")
                ->pluck('id');

            if ($matchingCateringIds->isNotEmpty()) {
                $extraMenus = Menu::with(['catering' => function ($q) {
                    $q->active();
                }])
                    ->whereIn('catering_id', $matchingCateringIds)
                    ->whereHas('catering', function ($q) {
                        $q->active();
                    })
                    ->available()
                    ->take(4)
                    ->get()
                    ->filter(fn ($m) => $m->catering !== null);

                $menus = $menus->merge($extraMenus)->unique('id')->take(4);
            }
        }

        return Inertia::render('Search', [
            'query' => $query,
            'activeTag' => $tag,
            'caterings' => $caterings->values(),
            'menus' => $menus->values(),
            'keywords' => $keywords,
            'cartCount' => $this->cart->getCount(),
        ]);
    }
}
