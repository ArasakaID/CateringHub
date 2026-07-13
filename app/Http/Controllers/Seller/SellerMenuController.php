<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Menu;
use App\Models\Review;
use App\Models\Catering;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerMenuController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $catering = Catering::where('user_id', $user->id)->first();

        $categories = Category::active()->get();
        $activeTab = $request->query('category', 'all');

        $menusQuery = Menu::where('catering_id', $catering?->id);

        if ($activeTab !== 'all') {
            $category = Category::where('slug', $activeTab)->first();
            if ($category) {
                $menusQuery->where('category_id', $category->id);
            }
        }

        $menus = $menusQuery->with('category')->get();

        $reviewAvg = 0;
        $reviewCount = 0;
        if ($catering) {
            $reviewAvg = Review::where('catering_id', $catering->id)->avg('rating') ?? 0;
            $reviewCount = Review::where('catering_id', $catering->id)->count();
        }

        $menus->transform(function ($menu) use ($reviewAvg, $reviewCount) {
            $menu->rating = round($reviewAvg, 1);
            $menu->review_count = $reviewCount;
            return $menu;
        });

        return Inertia::render('Seller/MyFood', [
            'menus' => $menus,
            'categories' => $categories,
            'activeTab' => $activeTab,
            'totalItems' => $menus->count(),
        ]);
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();

        return redirect()->route('seller.my-food')
            ->with('success', 'Menu berhasil dihapus');
    }
}
