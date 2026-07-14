<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Services\CartService;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function show($id, CartService $cart)
    {
        $menu = Menu::with(['catering' => function ($query) {
            $query->active();
        }, 'category'])
            ->available()
            ->findOrFail($id);

        // Ensure the menu's catering is active
        if (!$menu->catering) {
            abort(404);
        }

        // Related menus from the same catering (excluding current menu)
        $relatedMenus = $menu->catering->menus()
            ->where('id', '!=', $menu->id)
            ->available()
            ->take(4)
            ->get();

        return Inertia::render('DetailProduk', [
            'menu' => $menu,
            'catering' => $menu->catering,
            'relatedMenus' => $relatedMenus,
            'cartCount' => $cart->getCount(),
        ]);
    }
}
