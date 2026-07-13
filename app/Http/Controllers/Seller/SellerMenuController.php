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

    public function create()
    {
        $categories = Category::active()->get();

        return Inertia::render('Seller/AddMenu', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $catering = Catering::where('user_id', $user->id)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'unit' => 'nullable|string|max:50',
            'category_id' => 'required|exists:categories,id',
            'ingredients' => 'nullable|string',
            'extras' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'nullable|string',
        ]);

        $imagePaths = [];
        $mainImage = null;

        if (!empty($validated['images'])) {
            foreach ($validated['images'] as $base64) {
                if (!$base64 || !str_starts_with($base64, 'data:image')) continue;
                $imageData = base64_decode(explode(',', $base64)[1] ?? '');
                if (!$imageData) continue;
                $ext = explode('/', explode(';', $base64)[0])[1] ?? 'jpg';
                $filename = 'menu_' . uniqid() . '.' . $ext;
                $path = 'menus/' . $filename;
                \Illuminate\Support\Facades\Storage::disk('public')->put($path, $imageData);
                $imagePaths[] = $path;
                if (!$mainImage) $mainImage = $path;
            }
        }

        $menu = Menu::create([
            'catering_id' => $catering->id,
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'price' => $validated['price'],
            'unit' => $validated['unit'] ?? 'Box',
            'ingredients' => $validated['ingredients'] ? explode("\n", $validated['ingredients']) : [],
            'badges' => [],
            'location' => $catering->address ?? '',
            'extras' => $validated['extras'] ?? '',
            'image' => $mainImage,
            'images' => $imagePaths,
            'is_available' => true,
        ]);

        return redirect()->route('seller.food.show', $menu)
            ->with('success', 'Menu berhasil ditambahkan');
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();

        return redirect()->route('seller.my-food')
            ->with('success', 'Menu berhasil dihapus');
    }
}
