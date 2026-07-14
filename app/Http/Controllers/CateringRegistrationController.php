<?php

namespace App\Http\Controllers;

use App\Models\Catering;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CateringRegistrationController extends Controller
{
    public function create()
    {
        $user = auth()->user();

        if ($user->catering) {
            return redirect()->route('home')->with('error', 'Anda sudah memiliki catering.');
        }

        return Inertia::render('RegisterCatering', [
            'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slogan' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        $user = auth()->user();

        if ($user->catering) {
            return back()->with('error', 'Anda sudah memiliki catering.');
        }

        $catering = new Catering();
        $catering->user_id = $user->id;
        $catering->category_id = Category::first()->id ?? 1;
        $catering->name = $data['name'];
        $catering->slug = Str::slug($data['name']) . '-' . Str::random(5);
        $catering->slogan = $data['slogan'] ?? null;
        $catering->description = $data['description'] ?? null;

        if ($request->hasFile('logo')) {
            $catering->logo = $request->file('logo')->store('catering-logos', 'public');
        }

        $catering->save();

        session(['catering_registration_id' => $catering->id]);

        return Inertia::render('RegisterCatering', [
            'step' => 2,
            'user' => $user,
            'catering_id' => $catering->id,
        ]);
    }

    public function storeStep2(Request $request)
    {
        $data = $request->validate([
            'catering_id' => 'required|exists:caterings,id',
            'owner_name' => 'required|string|max:255',
            'owner_nik' => 'required|string|max:20',
            'owner_phone' => 'required|string|max:20',
            'owner_address' => 'required|string',
        ]);

        $catering = Catering::findOrFail($data['catering_id']);

        if ($catering->user_id !== auth()->id()) {
            abort(403);
        }

        $catering->update([
            'owner_name' => $data['owner_name'],
            'owner_nik' => $data['owner_nik'],
            'owner_phone' => $data['owner_phone'],
            'owner_address' => $data['owner_address'],
        ]);

        return Inertia::render('RegisterCatering', [
            'step' => 3,
            'user' => auth()->user(),
            'catering_id' => $catering->id,
        ]);
    }

    public function submit(Request $request)
    {
        $catering = Catering::findOrFail($request->catering_id);

        if ($catering->user_id !== auth()->id()) {
            abort(403);
        }

        $catering->update([
            'is_active' => false,
        ]);

        session()->forget('catering_registration_id');

        return Inertia::render('RegisterCatering', [
            'step' => 3,
            'submitted' => true,
            'user' => auth()->user(),
        ]);
    }
}
