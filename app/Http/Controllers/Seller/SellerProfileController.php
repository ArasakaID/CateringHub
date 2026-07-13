<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerProfileController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $orderCount = $user->catering?->orders()->count() ?? 0;

        return Inertia::render('Seller/Profile', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'balance' => (float) ($user->balance ?? 500.00),
                'avatar' => $user->avatar,
            ],
            'orderCount' => $orderCount,
        ]);
    }
}
