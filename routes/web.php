<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
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
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
