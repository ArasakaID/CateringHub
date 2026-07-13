<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Catering;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerPersonalInfoController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $catering = Catering::where('user_id', $user->id)->first();

        return Inertia::render('Seller/PersonalInfo', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? '',
            ],
            'catering' => $catering ? [
                'name' => $catering->name,
                'address' => $catering->address,
                'phone' => $catering->phone,
            ] : null,
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $catering = Catering::where('user_id', $user->id)->first();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'catering_name' => 'nullable|string|max:255',
            'catering_address' => 'nullable|string|max:500',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        if ($catering) {
            $catering->update([
                'name' => $request->catering_name ?? $catering->name,
                'address' => $request->catering_address ?? $catering->address,
            ]);
        }

        return back()->with('success', 'Informasi berhasil diperbarui');
    }
}
