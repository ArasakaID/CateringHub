<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected CartService $cart;

    public function __construct(CartService $cart)
    {
        $this->cart = $cart;
    }

    /**
     * Add item to cart.
     */
    public function add(Request $request)
    {
        $validated = $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'quantity' => 'required|integer|min:1',
            'options' => 'nullable|array',
            'options.*' => 'string',
        ]);

        $menu = Menu::with('catering')->findOrFail($validated['menu_id']);

        $item = $this->cart->addItem(
            menuId: $menu->id,
            menuName: $menu->name,
            menuImage: $menu->image ?? '',
            menuPrice: (float) $menu->price,
            quantity: $validated['quantity'],
            options: $validated['options'] ?? [],
            cateringId: $menu->catering?->id,
            cateringName: $menu->catering?->name,
        );

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'item' => $item,
                'count' => $this->cart->getCount(),
                'catering' => $this->cart->getCateringInfo(),
            ]);
        }

        return redirect()->back()->with('success', 'Item ditambahkan ke keranjang!');
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'item_id' => 'required|string',
            'quantity' => 'required|integer|min:0',
        ]);

        if ($validated['quantity'] <= 0) {
            $this->cart->removeItem($validated['item_id']);
        } else {
            $this->cart->updateQuantity($validated['item_id'], $validated['quantity']);
        }

        return response()->json([
            'success' => true,
            'items' => $this->cart->getItems(),
            'total' => $this->cart->getTotal(),
            'count' => $this->cart->getCount(),
        ]);
    }

    /**
     * Remove item from cart.
     */
    public function remove(Request $request)
    {
        $request->validate(['item_id' => 'required|string']);

        $this->cart->removeItem($request->item_id);

        return response()->json([
            'success' => true,
            'items' => $this->cart->getItems(),
            'total' => $this->cart->getTotal(),
            'count' => $this->cart->getCount(),
        ]);
    }

    /**
     * Toggle checked state.
     */
    public function toggleCheck(Request $request)
    {
        $request->validate(['item_id' => 'required|string']);

        $this->cart->toggleChecked($request->item_id);

        return response()->json([
            'success' => true,
            'items' => $this->cart->getItems(),
            'total' => $this->cart->getTotal(),
            'count' => $this->cart->getCount(),
        ]);
    }

    /**
     * Get cart count (for navbar badge).
     */
    public function count()
    {
        return response()->json([
            'count' => $this->cart->getCount(),
        ]);
    }
}
