<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\SavedCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PembayaranController extends Controller
{
    /**
     * Available payment methods.
     */
    protected array $paymentMethods = [
        [
            'id' => 'cash',
            'name' => 'Tunai',
            'icon_type' => 'cash',
        ],
        [
            'id' => 'qris',
            'name' => 'QRIS',
            'icon_type' => 'qris',
        ],
        [
            'id' => 'mastercard',
            'name' => 'Mastercard',
            'icon_type' => 'mastercard',
        ],
        [
            'id' => 'bca',
            'name' => 'BCA',
            'icon_type' => 'bca',
        ],
        [
            'id' => 'mandiri',
            'name' => 'Mandiri',
            'icon_type' => 'mandiri',
        ],
        [
            'id' => 'bri',
            'name' => 'BRI',
            'icon_type' => 'bri',
        ],
    ];

    /**
     * Show the payment page.
     */
    public function index(Request $request)
    {
        $orderId = $request->query('order');
        $order = Order::with('items')->findOrFail($orderId);

        // Verify order belongs to current user
        if ($order->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this order.');
        }

        // If already paid, redirect to success
        if ($order->payment_status === 'paid') {
            return redirect()->route('pembayaran.sukses', $order);
        }

        // Get saved cards for current user
        $savedCards = SavedCard::where('user_id', Auth::id())->get();

        return Inertia::render('Pembayaran', [
            'order' => $order,
            'total' => (float) $order->total,
            'paymentMethods' => $this->paymentMethods,
            'savedCards' => $savedCards,
        ]);
    }

    /**
     * Process the payment.
     */
    public function proses(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|integer|exists:orders,id',
            'payment_method' => 'required|string|in:cash,qris,mastercard,bca,mandiri,bri',
        ]);

        $order = Order::findOrFail($validated['order_id']);

        // Verify order belongs to current user
        if ($order->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this order.');
        }

        // Check if already paid
        if ($order->payment_status === 'paid') {
            return redirect()->route('pembayaran.sukses', $order);
        }

        // Update order payment status
        $order->update([
            'payment_method' => $validated['payment_method'],
            'payment_status' => 'paid',
            'paid_at' => now(),
            'status' => 'confirmed',
        ]);

        return redirect()->route('pembayaran.sukses', $order);
    }

    /**
     * Show payment success page.
     */
    public function sukses(Order $order)
    {
        // Verify order belongs to current user
        if ($order->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this order.');
        }

        // If not paid yet, redirect back to payment
        if ($order->payment_status !== 'paid') {
            return redirect()->route('pembayaran', ['order' => $order->id]);
        }

        return Inertia::render('PembayaranBerhasil', [
            'order' => $order,
        ]);
    }

    /**
     * Get the list of payment methods (for JS).
     */
    public function methods()
    {
        return response()->json($this->paymentMethods);
    }
}
