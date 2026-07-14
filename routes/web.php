<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TrackingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/catering/{slug}', [HomeController::class, 'showCatering'])->name('catering.show');
Route::get('/api/caterings/filter', [HomeController::class, 'filter'])->name('caterings.filter');
Route::get('/search', [SearchController::class, 'index'])->name('search');
Route::get('/menu/{id}', [MenuController::class, 'show'])->name('menu.show');

// Cart
Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
Route::post('/cart/update', [CartController::class, 'update'])->name('cart.update');
Route::post('/cart/remove', [CartController::class, 'remove'])->name('cart.remove');
Route::post('/cart/toggle-check', [CartController::class, 'toggleCheck'])->name('cart.toggle');
Route::get('/cart/count', [CartController::class, 'count'])->name('cart.count');

// Checkout
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
Route::post('/checkout/place-order', [CheckoutController::class, 'placeOrder'])->name('checkout.place');

// Pembayaran
Route::get('/checkout/pembayaran', [PembayaranController::class, 'index'])->name('pembayaran');
Route::post('/checkout/pembayaran/proses', [PembayaranController::class, 'proses'])->name('pembayaran.proses');
Route::get('/checkout/berhasil/{order}', [PembayaranController::class, 'sukses'])->name('pembayaran.sukses');

// Pesanan
Route::middleware('auth')->group(function () {
    Route::get('/pesanan', [OrderController::class, 'index'])->name('pesanan');
    Route::post('/pesanan/{order}/cancel', [OrderController::class, 'cancelOrder'])->name('pesanan.cancel');
    Route::post('/pesanan/{order}/reorder', [OrderController::class, 'reorder'])->name('pesanan.reorder');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/profile/info', [ProfileController::class, 'info'])->name('profile.info');
    Route::get('/profile/edit-profile', [ProfileController::class, 'editProfile'])->name('profile.edit-profile');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/update', [ProfileController::class, 'updateProfile'])->name('profile.update-info');
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.update-avatar');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Tracking & Delivery routes (auth required)
Route::middleware('auth')->group(function () {
    Route::get('/pesanan/{order}/tracking', [TrackingController::class, 'show'])->name('tracking.show');
    Route::get('/pesanan/{order}/call', [TrackingController::class, 'initiateCall'])->name('tracking.call');
    Route::get('/pesanan/{order}/chat', [TrackingController::class, 'chat'])->name('tracking.chat');
    Route::post('/pesanan/{order}/chat/send', [TrackingController::class, 'sendMessage'])->name('tracking.chat.send');
    Route::get('/groq-test', function () {
        $key = config('services.groq.api_key');
        if (!$key) return 'GROQ_API_KEY not set in .env';
        try {
            $res = \Illuminate\Support\Facades\Http::withOptions(['verify' => false])
                ->withHeaders(['Authorization' => "Bearer $key"])
                ->timeout(10)
                ->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => 'llama-3.3-70b-versatile',
                    'messages' => [['role' => 'user', 'content' => 'Say hello in 3 words']],
                    'max_tokens' => 20,
                ]);
            if ($res->successful()) return 'OK: ' . $res->json('choices.0.message.content');
            return 'HTTP ' . $res->status() . ': ' . $res->body();
        } catch (\Exception $e) {
            return 'ERROR: ' . $e->getMessage();
        }
    });
    Route::post('/pesanan/{order}/chat/courier-say', function (\App\Models\Order $order) {
        if ($order->user_id !== auth()->id()) abort(403);
        $msg = \Illuminate\Support\Facades\Request::input('message', 'Halo, pesanan sudah dalam perjalanan');
        $order->chatMessages()->create(['sender_type' => 'courier', 'message' => $msg, 'is_read' => false]);
        return redirect()->route('tracking.chat', $order->id);
    })->name('tracking.chat.courier-say');
});

// Location routes (all require auth)
Route::middleware('auth')->group(function () {
    Route::get('/lokasi/akses', [LocationController::class, 'access'])->name('location.access');
    Route::get('/lokasi/pilih', [LocationController::class, 'select'])->name('location.select');
    Route::post('/lokasi/simpan-dari-map', [LocationController::class, 'saveFromMap'])->name('location.save-from-map');
    Route::get('/lokasi/sukses', [LocationController::class, 'success'])->name('location.success');
    Route::get('/lokasi', [LocationController::class, 'index'])->name('location.index');
    Route::get('/lokasi/tambah', [LocationController::class, 'create'])->name('location.create');
    Route::post('/lokasi', [LocationController::class, 'store'])->name('location.store');
    Route::get('/lokasi/{id}/edit', [LocationController::class, 'edit'])->name('location.edit');
    Route::put('/lokasi/{id}', [LocationController::class, 'update'])->name('location.update');
    Route::delete('/lokasi/{id}', [LocationController::class, 'destroy'])->name('location.destroy');
    Route::post('/lokasi/{id}/active', [LocationController::class, 'setActive'])->name('location.set-active');
});

Route::middleware(['auth', 'seller'])->prefix('seller')->name('seller.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Seller\SellerDashboardController::class, 'index'])->name('dashboard');
    Route::get('/my-food', [\App\Http\Controllers\Seller\SellerMenuController::class, 'index'])->name('my-food');
    Route::get('/withdraw/success', [\App\Http\Controllers\Seller\SellerWithdrawController::class, 'success'])->name('withdraw.success');
    Route::get('/running-orders', [\App\Http\Controllers\Seller\SellerOrderController::class, 'index'])->name('running-orders');
    Route::post('/orders/{order}/done', [\App\Http\Controllers\Seller\SellerOrderController::class, 'markDone'])->name('orders.done');
    Route::post('/orders/{order}/cancel', [\App\Http\Controllers\Seller\SellerOrderController::class, 'cancel'])->name('orders.cancel');
    Route::get('/add-menu', [\App\Http\Controllers\Seller\SellerMenuController::class, 'create'])->name('add-menu');
    Route::post('/menu', [\App\Http\Controllers\Seller\SellerMenuController::class, 'store'])->name('menu.store');
    Route::get('/menu', [\App\Http\Controllers\Seller\SellerProfileController::class, 'index'])->name('menu');
    Route::get('/food/{menu}', [\App\Http\Controllers\Seller\SellerFoodController::class, 'show'])->name('food.show');
    Route::get('/food/{menu}/edit', [\App\Http\Controllers\Seller\SellerFoodController::class, 'edit'])->name('food.edit');
    Route::delete('/menu/{menu}', [\App\Http\Controllers\Seller\SellerMenuController::class, 'destroy'])->name('menu.destroy');
    Route::get('/revenue-details', [\App\Http\Controllers\Seller\SellerRevenueController::class, 'index'])->name('revenue-details');
    Route::get('/reviews', [\App\Http\Controllers\Seller\SellerReviewController::class, 'index'])->name('reviews');
    Route::get('/personal-info', [\App\Http\Controllers\Seller\SellerPersonalInfoController::class, 'index'])->name('personal-info');
    Route::put('/personal-info', [\App\Http\Controllers\Seller\SellerPersonalInfoController::class, 'update'])->name('personal-info.update');
    Route::get('/settings', [\App\Http\Controllers\Seller\SellerSettingController::class, 'index'])->name('settings');
    Route::post('/settings', [\App\Http\Controllers\Seller\SellerSettingController::class, 'update'])->name('settings.update');
    Route::get('/withdrawal-history', [\App\Http\Controllers\Seller\SellerWithdrawController::class, 'history'])->name('withdrawal-history');
});

require __DIR__.'/auth.php';
