<?php

namespace App\Http\Controllers;

use App\Models\UserAddress;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Display list of user addresses (Daftar Lokasi).
     */
    public function index()
    {
        $addresses = auth()->user()->addresses()
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($addr) {
                return [
                    'id' => $addr->id,
                    'label' => $addr->label,
                    'address' => $addr->address,
                    'province' => $addr->province,
                    'postal_code' => $addr->postal_code,
                    'detail' => $addr->detail,
                    'latitude' => $addr->latitude,
                    'longitude' => $addr->longitude,
                    'is_active' => $addr->is_active,
                ];
            });

        return Inertia::render('Lokasi/DaftarLokasi', [
            'addresses' => $addresses,
        ]);
    }

    /**
     * Show location access permission page (Akses Lokasi).
     */
    public function access()
    {
        return Inertia::render('Lokasi/AksesLokasi');
    }

    /**
     * Show map selection page (Memilih Lokasi).
     */
    public function select(Request $request)
    {
        return Inertia::render('Lokasi/MemilihLokasi', [
            'latitude' => $request->lat ? (float) $request->lat : null,
            'longitude' => $request->lng ? (float) $request->lng : null,
            'city' => $request->city ?? 'Yogyakarta',
        ]);
    }

    /**
     * Save location from map (coordinates only) — redirects to success.
     */
    public function saveFromMap(Request $request)
    {
        $validated = $request->validate([
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'city' => 'nullable|string|max:255',
        ]);

        session([
            'pending_location' => [
                'latitude' => $validated['latitude'],
                'longitude' => $validated['longitude'],
                'city' => $validated['city'] ?? 'Yogyakarta',
            ],
        ]);

        return redirect()->route('location.create');
    }

    /**
     * Show success page (Simpan Lokasi Sukses).
     */
    public function success()
    {
        return Inertia::render('Lokasi/SimpanLokasiSukses', [
            'from' => url()->previous(),
        ]);
    }

    /**
     * Show form to create a new address (Tambah Lokasi Baru).
     */
    public function create()
    {
        $pendingLocation = session('pending_location', [
            'latitude' => null,
            'longitude' => null,
            'city' => null,
        ]);

        return Inertia::render('Lokasi/TambahLokasiBaru', [
            'pendingLocation' => $pendingLocation,
        ]);
    }

    /**
     * Store a new address.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|in:Rumah,Kantor,Lainya',
            'address' => 'required|string|max:255',
            'province' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'detail' => 'nullable|string|max:500',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);

        $validated['user_id'] = auth()->id();

        $address = UserAddress::create($validated);

        // If this is the first address, or was requested as active, set it
        $userAddressCount = auth()->user()->addresses()->count();
        if ($userAddressCount === 1 || $request->boolean('set_active')) {
            $this->setActiveInternal($address->id, auth()->id());
        }

        return redirect()->route('location.success');
    }

    /**
     * Show edit form for an address.
     */
    public function edit($id)
    {
        $address = UserAddress::where('user_id', auth()->id())->findOrFail($id);

        return Inertia::render('Lokasi/TambahLokasiBaru', [
            'address' => $address,
            'pendingLocation' => [
                'latitude' => $address->latitude,
                'longitude' => $address->longitude,
                'city' => null,
            ],
        ]);
    }

    /**
     * Update an address.
     */
    public function update(Request $request, $id)
    {
        $address = UserAddress::where('user_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'label' => 'required|in:Rumah,Kantor,Lainya',
            'address' => 'required|string|max:255',
            'province' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'detail' => 'nullable|string|max:500',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);

        $address->update($validated);

        return redirect()->route('location.index');
    }

    /**
     * Delete an address.
     */
    public function destroy($id)
    {
        $address = UserAddress::where('user_id', auth()->id())->findOrFail($id);
        $address->delete();

        return redirect()->route('location.index');
    }

    /**
     * Set an address as active (only one per user).
     */
    public function setActive($id)
    {
        $this->setActiveInternal($id, auth()->id());

        return redirect()->back();
    }

    /**
     * Internal helper: set one address active, deactivate all others for the user.
     */
    private function setActiveInternal($addressId, $userId): void
    {
        UserAddress::where('user_id', $userId)->update(['is_active' => false]);
        UserAddress::where('id', $addressId)->where('user_id', $userId)->update(['is_active' => true]);
    }
}
