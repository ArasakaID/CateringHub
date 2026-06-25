<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    protected CartService $cart;

    public function __construct(CartService $cart)
    {
        $this->cart = $cart;
    }

    /**
     * Show the Pesanan page with Berlangsung and History tabs.
     */
    public function index()
    {
        // Get ALL orders for current user — client-side tab filtering
        $orders = Order::with(['catering', 'items'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
            $itemsCount = $order->items->sum('quantity');

            return [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'total' => (float) $order->total,
                'subtotal' => (float) $order->subtotal,
                'delivery_fee' => (float) $order->delivery_fee,
                'created_at' => $order->created_at->format('j M, H:i'),
                'items_count' => $itemsCount,
                'catering' => $order->catering ? [
                    'name' => $order->catering->name,
                    'image' => $order->catering->image,
                    'slug' => $order->catering->slug,
                ] : null,
                'items' => $order->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'menu_name' => $item->menu_name,
                        'quantity' => $item->quantity,
                        'price' => (float) $item->price,
                        'subtotal' => (float) $item->subtotal,
                    ];
                }),
            ];
        });

        return Inertia::render('Pesanan', [
            'orders' => $orders,
        ]);
    }

    /**
     * Cancel an order.
     */
    public function cancelOrder(Order $order)
    {
        // Verify order belongs to current user
        if ($order->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this order.');
        }

        // Can only cancel non-final orders
        if (in_array($order->status, ['delivered', 'cancelled'])) {
            return redirect()->back()->with('error', 'Pesanan sudah selesai dan tidak bisa dibatalkan.');
        }

        $order->update([
            'status' => 'cancelled',
        ]);

        return redirect()->back()->with('success', 'Pesanan berhasil dibatalkan.');
    }

    /**
     * Re-order: add all items from a previous order to cart.
     */
    public function reorder(Order $order)
    {
        // Verify order belongs to current user
        if ($order->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this order.');
        }

        $catering = $order->catering;
        if (!$catering) {
            return redirect()->back()->with('error', 'Data catering tidak ditemukan.');
        }

        // Add each order item to cart
        foreach ($order->items as $item) {
            $this->cart->addItem(
                menuId: $item->menu_id,
                menuName: $item->menu_name,
                menuImage: '', // will be loaded from menu if needed
                menuPrice: $item->price,
                quantity: $item->quantity,
                cateringId: $catering->id,
                cateringName: $catering->name,
            );
        }

        return redirect()->route('checkout')->with('success', 'Pesanan berhasil diulang. Silakan checkout.');
    }
}
