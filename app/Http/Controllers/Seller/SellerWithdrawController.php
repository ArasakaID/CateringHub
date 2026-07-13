<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerWithdrawController extends Controller
{
    public function success()
    {
        return Inertia::render('Seller/WithdrawSuccess');
    }
}
