<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Catering;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerSettingController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $catering = Catering::where('user_id', $user->id)->first();

        return Inertia::render('Seller/Settings', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'catering' => $catering ? [
                'name' => $catering->name,
                'address' => $catering->address,
                'phone' => $catering->phone,
                'is_open' => $catering->is_open ?? true,
            ] : null,
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $catering = Catering::where('user_id', $user->id)->first();

        if ($catering) {
            $catering->update([
                'is_open' => $request->boolean('is_open', true),
            ]);
        }

        return back()->with('success', 'Settings updated');
    }
}
