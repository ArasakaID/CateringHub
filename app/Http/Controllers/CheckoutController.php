<?php

namespace App\Http\Controllers;

use App\Models\Catering;
use App\Models\Order;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    protected CartService $cart;

    public function __construct(CartService $cart)
    {
        $this->cart = $cart;
    }

    /**
     * Show checkout page.
     */
    public function index()
    {
        $items = $this->cart->getCheckedItems();
        $total = $this->cart->getTotal();

        // Get user address info
        $user = Auth::user();
        $userAddress = $user?->address ?? '';
        $userPhone = $user?->phone ?? '';
        $userAddresses = null;
        $activeAddress = null;

        if ($user) {
            $userAddresses = $user->addresses()
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(fn ($a) => [
                    'id' => $a->id,
                    'label' => $a->label,
                    'address' => $a->address,
                    'province' => $a->province,
                    'postal_code' => $a->postal_code,
                    'detail' => $a->detail,
                    'is_active' => $a->is_active,
                ]);
            $activeAddress = $userAddresses->firstWhere('is_active', true);
        }

        // If no items, redirect back
        if (empty($items)) {
            return redirect()->route('home')->with('error', 'Keranjang belanja kosong!');
        }

        return Inertia::render('Checkout', [
            'items' => $items,
            'total' => $total,
            'userAddress' => $activeAddress
                ? ($activeAddress['address'] . ($activeAddress['detail'] ? ', ' . $activeAddress['detail'] : ''))
                : ($userAddress ?? ''),
            'userPhone' => $userPhone,
            'userAddresses' => $userAddresses,
            'activeAddress' => $activeAddress,
        ]);
    }

    /**
     * Place an order.
     */
    public function placeOrder(Request $request)
    {
        $items = $this->cart->getCheckedItems();

        if (empty($items)) {
            return redirect()->back()->with('error', 'Tidak ada item yang dipilih!');
        }

        $validated = $request->validate([
            'delivery_address' => 'required|string|max:500',
            'phone' => 'required|string|max:20',
            'delivery_date' => 'nullable|string',
            'notes' => 'nullable|string|max:500',
        ]);

        // Get first catering from items (assume single catering per order)
        $cateringId = $items[0]['catering_id'] ?? null;

        // Calculate totals
        $subtotal = $this->cart->getTotal();
        $catering = $cateringId ? Catering::find($cateringId) : null;
        $deliveryFee = $catering?->delivery_fee ?? 0;
        $total = $subtotal + $deliveryFee;

        // Create order
        $order = Order::create([
            'user_id' => Auth::id() ?? 1, // fallback to first user if not authenticated
            'catering_id' => $cateringId,
            'order_number' => 'ORD-' . strtoupper(Str::random(8)),
            'subtotal' => $subtotal,
            'delivery_fee' => $deliveryFee,
            'total' => $total,
            'status' => 'pending',
            'notes' => $validated['notes'] ?? null,
            'delivery_address' => $validated['delivery_address'],
            'phone' => $validated['phone'],
        ]);

        // Create order items
        foreach ($items as $item) {
            $itemSubtotal = $item['price'] * $item['quantity'];
            $order->items()->create([
                'menu_id' => $item['menu_id'],
                'menu_name' => $item['name'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'subtotal' => $itemSubtotal,
            ]);
        }

        // Clear cart
        $this->cart->clear();

        return redirect()->route('pembayaran', ['order' => $order->id]);
    }
}
