<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Catering;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerWithdrawController extends Controller
{
    public function history(Request $request)
    {
        $user = $request->user();
        $catering = Catering::where('user_id', $user->id)->first();

        return Inertia::render('Seller/WithdrawalHistory', [
            'withdrawals' => [],
            'totalWithdrawn' => 0,
            'balance' => (float) ($user->balance ?? 0),
        ]);
    }

    public function success()
    {
        return Inertia::render('Seller/WithdrawSuccess');
    }
}
