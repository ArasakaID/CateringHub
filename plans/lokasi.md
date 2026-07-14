# 📍 Lokasi (Address Management) — USER_FIX

> **File Figma**: `unsaved-mqs49lag-zcqi8mlr` (aktual: `unsaved-mqt9vr0i-b3u8pp3t`)
> **Frame**:
>   - `610:7104` — Akses Lokasi (375×812px)
>   - `610:7141` — Memilih Lokasi (375×812px)
>   - `610:7123` — Simpan Lokasi Sukses (375×812px)
>   - `610:4706` — Tambah Lokasi Baru (375×820px)
>   - `610:4753` — Daftar Lokasi (375×812px)
> **Background**: `#ffffff`
> **Updated**: 2026-06-26
> **Status**: ✅ Sudah diimplementasi — `Lokasi/` (5 pages)

---

## State Overview

Sistem lokasi memiliki **5 state/page** yang membentuk flow:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. Akses Lokasi** | Pertama kali user masuk ke fitur lokasi | Permintaan izin akses lokasi — ilustrasi + tombol "Access LOCATION" / "LOKASI ANDA" |
| **2. Memilih Lokasi** | User menekan tombol akses lokasi | Map dengan pin merah, tooltip "Move to edit location", bottom button "simpan LOkasi" |
| **3. Simpan Lokasi Sukses** | Lokasi berhasil disimpan | Ilustrasi sukses + teks "Lokasi telah di simpan" + tombol "Ok" |
| **4. Tambah Lokasi Baru** | User memilih tambah alamat baru | Form alamat lengkap: alamat, provinsi, kode pos, detail lainnya, label (Rumah/Kantor/Lainya) + peta |
| **5. Daftar Lokasi** | User melihat daftar alamat | List card alamat (Rumah, Kantor) + tombol "Tambah alamat baru" |

### Flow Diagram

```
Akses Lokasi → Memilih Lokasi → Simpan Lokasi Sukses → [kembali ke halaman sebelumnya]
                                                      → Daftar Lokasi

[User menekan "Tambah alamat baru"]

Daftar Lokasi → Tambah Lokasi Baru → Simpan Lokasi Sukses → Daftar Lokasi (updated)
```

---

## Layout

### State 1: Akses Lokasi — Frame `610:7104` (375×812px)

```
┌──────────────────────────────┐
│                              │
│                              │
│      ┌──────────────┐        │
│      │              │        │  Ilustrasi map
│      │  Map illus   │        │  Rectangle 206×250
│      │              │        │  rounded-[90px], centered x:84
│      └──────────────┘        │
│                              │
│   DFOOD WILL ACCESS YOUR     │  Sen 16px, #646982, centered
│   LOCATION ONLY WHILE        │  lineHeight 24px, width 323px
│   USING THE APP              │
│                              │
│  ┌────────────────────────┐  │
│  │   Access LOCATION  📍  │  │  Button #ff7622, 327×62, rounded-12
│  └────────────────────────┘  │  Atau "LOKASI ANDA" (2 state overlay)
└──────────────────────────────┘
```

### State 2: Memilih Lokasi — Frame `610:7141` (375×812px)

```
┌──────────────────────────────┐
│  [←]      Yogyakarta         │  Top bar — Back #212029, arrow putih
│                              │  Title Sen 17px, #181c2e
│  ┌──────────────────────────┐│
│  │                          ││
│  │     Map (full area)      ││  Map image extends to bounds
│  │                          ││
│  │        🔴 (pin)          ││  Red pin marker #f14237
│  │     ┌──────────┐         ││  Tooltip "Move to edit location"
│  │     │  Move to  │         ││  bg #32343e, text putih 9px
│  │     │  edit loc │         ││
│  │     └──────────┘         ││
│  │                          ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │   simpan LOkasi      📍  ││  Button #ff7622, 421×75, rounded-12
│  └──────────────────────────┘│  (melbar hingga -35 dari frame)
└──────────────────────────────┘
```

### State 3: Simpan Lokasi Sukses — Frame `610:7123` (375×812px)

```
┌──────────────────────────────┐
│                              │
│                              │
│   ┌──────────────────────┐   │
│   │  Success illustration │   │  Group dengan elemen orange #fb6d3a
│   │  ● checkmark          │   │  Lingkaran 99×99 + centang putih
│   │  ✦ decorative dots   │   │  Bintang/ellipse orange opacity 0.3-0.4
│   └──────────────────────┘   │
│                              │
│    Lokasi telah di simpan    │  Poppins Medium 22px, #333333
│                              │
│   ┌──────────────────────┐   │
│   │         Ok           │   │  Button #ff7622, 327×60, rounded-10
│   └──────────────────────┘   │  Sen Regular 18px, putih
└──────────────────────────────┘
```

### State 4: Tambah Lokasi Baru — Frame `610:4706` (375×820px)

```
┌──────────────────────────────┐
│  [←]                         │  Back button #32343e, arrow putih
│                              │
│  ┌──────────────────────────┐│
│  │     Map area             ││  Rectangle #c4c4c4, 375×295
│  │      ┌──────────┐       ││  Tooltip "Sesuaikan lokasi kamu"
│  │      │ Sesuaikan │       ││  bg #32343e, text putih
│  │      │ lokasi    │       ││
│  │      └──────────┘       ││
│  │         🟠 (pin)         ││  Map pin #fb6d3a
│  └──────────────────────────┘│
│                              │
│  alamat                      │  Label Sen 14px, #32343e
│  ┌──────────────────────────┐│
│  │ 📍 jl. ringroad utara... ││  Input #f0f5fa, 327×50, rounded-10
│  └──────────────────────────┘│  Text 12px, #6b6e82
│                              │
│  provinsi         Kode pos   │  Label Sen 14px, #32343e
│  ┌────────────┐  ┌────────┐ │
│  │ di yogyak  │  │ 55883  │ │  Input #f0f5fa, 156×50, rounded-10
│  └────────────┘  └────────┘ │
│                              │
│  Detail lainnya              │  Label Sen 14px, #32343e
│  ┌──────────────────────────┐│
│  │ sebelum rumah kuning     ││  Input #f0f5fa, 327×50, rounded-10
│  └──────────────────────────┘│  Text 12px, #6b6e82
│                              │
│  Tandai sebagai              │  Label Sen 14px, #32343e, letterSpacing 2%
│  ┌──────┐ ┌──────┐ ┌──────┐ │
│  │Rumah │ │Kantor│ │Lainya│ │  Pill 94×45, rounded-22.5
│  │🟠actv│ │⚪ina │ │⚪ina │ │  Active: #f58d1d, Inactive: #f0f5fa
│  └──────┘ └──────┘ └──────┘ │
│                              │
│  ┌──────────────────────────┐│
│  │     simpan alamat         ││  Button #ff7622, 327×62, rounded-12
│  └──────────────────────────┘│  Sen Bold 14px, putih
└──────────────────────────────┘
```

### State 5: Daftar Lokasi — Frame `610:4753` (375×812px)

```
┌──────────────────────────────┐
│  [←]   Alamat Saya           │  Top bar — Back #ecf0f4, arrow #32343e
│                              │  Title Sen 17px, #32343e
│                              │
│  ┌──────────────────────────┐│
│  │ 🏠 Rumah             ✏️🗑️││  Card #f0f5fa, 327×101, rounded-16
│  │ jl. ringroad utara,     ││  Icon: lingkaran putih 48×48, rumah biru #2790c3
│  │ Ngropoh, Condongcatrur, ││  Text #32343e 14px (50% opacity address)
│  │ DI Yogyakarta 55883     ││  Edit icon orange, Delete icon orange
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │ 💼 Kantor            ✏️🗑️││  Card #f0f5fa, 327×101, rounded-16
│  │ 3891 Ranchview Dr.      ││  Icon: lingkaran putih 48×48, kantor ungu #a03bb1
│  │ Richardson, California  ││
│  │ 62639                   ││
│  └──────────────────────────┘│
│                              │
│                              │
│  ┌──────────────────────────┐│
│  │   Tambah alamat baru      ││  Button #ff7622, 327×62, rounded-12
│  └──────────────────────────┘│  Sen Bold 14px, putih
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Akses Lokasi — Frame `610:7104`

#### 1a. Ilustrasi Map — `Rectangle (610:7122)`
| Properti | Value |
|----------|-------|
| **Ukuran** | 206×250px |
| **Posisi** | x:84, y:176 |
| **Border radius** | 90px |
| **Background** | IMAGE (MAP illustration) |
| **Catatan** | Ini gambar ilustrasi statis, bukan interactive map |

#### 1b. Deskripsi Text — `Text (610:7105)`
| Properti | Value |
|----------|-------|
| **Ukuran** | 323×48px |
| **Posisi** | x:26, y:618 |
| **Font** | Sen Regular 16px |
| **Warna** | `#646982` |
| **Line height** | 24px |
| **Alignment** | Center |
| **Isi** | "DFOOD WILL ACCESS YOUR LOCATION ONLY WHILE USING THE APP" |

#### 1c. Button — `Group (610:7106)` dan `Group (610:7114)`
| Properti | Value |
|----------|-------|
| **Ukuran** | 327×62px |
| **Posisi** | x:24, y:519.5 |
| **Background** | `#ff7622` |
| **Border radius** | 12px |
| **Text (state 1)** | "Access LOCATION" — Sen Bold 16px, `#ffffff` |
| **Text (state 2)** | "LOKASI ANDA" — Sen Bold 16px, `#ffffff` |
| **Icon** | Map pin — lingkaran putih opacity 0.2 32×32 + pin icon |

> **Catatan**: Ada 2 button di posisi sama — ini 2 state berbeda (sebelum dan sesudah dapat izin lokasi)

### 2. Memilih Lokasi — Frame `610:7141`

#### 2a. Top Bar — `Group (610:7151)`
| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran `#212029` 45×45, arrow stroke `#ffffff` weight 2 |
| **Title "Yogyakarta"** | Sen 17px, `#181c2e` |

#### 2b. Map — `Group (610:7142)`
| Properti | Value |
|----------|-------|
| **Ukuran** | 619×787px (extends beyond frame) |
| **Posisi** | x:-159, y:-50 |
| **Background** | IMAGE (map tile) — `FILL` mode |

#### 2c. Pin Marker — `Group (610:7145)`
| Elemen | Detail |
|--------|--------|
| **Marker** | Ellipse `#f14237` 36×35 |
| **Inside icon** | White pin vector, stroke weight 3 |
| **Posisi** | x:188, y:326 (center of map) |

#### 2d. Tooltip — `Group (610:7165)`
| Properti | Value |
|----------|-------|
| **Background** | Rectangle `#32343e`, 111×27, rounded-3 |
| **Text** | "Move to edit location" — Poppins Regular 9px, `#ffffff` |
| **Arrow** | Polygon `#32343e` pointing down |
| **Posisi** | x:151, y:294 |

#### 2e. Bottom Button — `Group (610:7157)`
| Properti | Value |
|----------|-------|
| **Ukuran** | 421×75px |
| **Posisi** | x:-35, y:739 (melbar dari frame) |
| **Background** | `#ff7622`, rounded-12 |
| **Text** | "simpan LOkasi" — Sen Bold 16px, `#ffffff` |
| **Icon** | Map pin — lingkaran putih opacity 0.2 32×32 + pin icon |

### 3. Simpan Lokasi Sukses — Frame `610:7123`

#### 3a. Success Illustration — `Group (610:7126)`
| Properti | Value |
|----------|-------|
| **Ukuran** | 260×181px |
| **Posisi** | x:57, y:219 |
| **Checkmark circle** | Vector `#fb6d3a` 99×99, centang putih |
| **Decorative elements** | Vectors orange `#fb6d3a` (bintang/titik) opacity 0.3-0.4 |
| **Sparkles** | Ellipse orange `#fb6d3a` opacity 0.3 |

#### 3b. Success Text — `Text (610:7125)`
| Properti | Value |
|----------|-------|
| **Font** | Poppins Medium 22px |
| **Warna** | `#333333` |
| **Isi** | "Lokasi telah di simpan" |

#### 3c. Ok Button — `Group (610:7138)`
| Properti | Value |
|----------|-------|
| **Background** | `#ff7622`, 327×60px, rounded-10 |
| **Text** | "Ok" — Sen Regular 18px, `#ffffff` |

### 4. Tambah Lokasi Baru — Frame `610:4706`

#### 4a. Back Button — `Group (610:4750)`
| Properti | Value |
|----------|-------|
| **Background** | Lingkaran `#32343e` 45×45 |
| **Arrow** | `#ffffff`, stroke weight 2 |

#### 4b. Map Area — `Group (610:4738)`
| Properti | Value |
|----------|-------|
| **Ukuran** | 375×295px |
| **Background** | Rectangle `#c4c4c4` (fallback) + map IMAGE |
| **Tooltip "Sesuaikan lokasi kamu"** | Dark bg `#32343e`, rounded-3, text putih 9px |
| **Pin** | Ellipse `#fb6d3a` 20×20 + glow ellipse 30×30 opacity 0.2 |

#### 4c. Form Fields
| Field | Type | Placeholder | Detail |
|-------|------|-------------|--------|
| **alamat** | Input text | Icon 📍 + "jl. ringroad utara, Ngropoh, Condongcatrur" | 327×50, `#f0f5fa`, rounded-10 |
| **provinsi** | Input text | "di yogyakarta" | 156×50, `#f0f5fa`, rounded-10 |
| **Kode pos** | Input text | "55883" | 156×50, `#f0f5fa`, rounded-10 |
| **Detail lainnya** | Input text | "sebelah rumah kuning" | 327×50, `#f0f5fa`, rounded-10 |

> Semua label: Sen Regular 14px, `#32343e`, letterSpacing 2%
> Semua value: Sen Regular 12px, `#6b6e82`, letterSpacing 2%

#### 4d. Label Tags — `Group (610:4710)`
| Elemen | Detail |
|--------|--------|
| **Label "Tandai sebagai"** | Sen 14px, `#32343e`, letterSpacing 2% |
| **Rumah** (active) | Pill `#f58d1d`, text putih, 94×45, rounded-22.5 |
| **Kantor** (inactive) | Pill `#f0f5fa`, text `#32343e`, 94×45, rounded-22.5 |
| **Lainya** (inactive) | Pill `#f0f5fa`, text `#32343e`, 94×45, rounded-22.5 |

#### 4e. Simpan Button — `Group (610:4707)`
| Properti | Value |
|----------|-------|
| **Background** | `#ff7622`, 327×62px, rounded-12 |
| **Text** | "simpan alamat" — Sen Bold 14px, `#ffffff` |

### 5. Daftar Lokasi — Frame `610:4753`

#### 5a. Top Bar — `Group (610:4792)`
| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran `#ecf0f4` 45×45, arrow stroke `#32343e` weight 2 |
| **Title "Alamat Saya"** | Sen 17px, `#32343e` |

#### 5b. Address Card — `Group Rumah (610:4754)` & `Group Kantor (610:4771)`
| Properti | Value |
|----------|-------|
| **Card ukuran** | 327×101px |
| **Card background** | `#f0f5fa`, rounded-16 |
| **Icon container** | Lingkaran putih 48×48, rounded-8 |
| **Icon Rumah** | House vector, stroke `#2790c3` weight 2 |
| **Icon Kantor** | Office/briefcase vector, stroke `#a03bb1` weight 2 |
| **Label** | "Rumah" / "Kantor" — Sen 14px, `#32343e` |
| **Alamat** | Sen 12px, `#6b6e82` opacity 50% |
| **Edit icon** | Pencil vector `#fb6d3a`, stroke weight 1.5 |
| **Delete icon** | Trash vector `#fb6d3a`, stroke weight 1.5 |

#### 5c. Tambah Button — `Group (610:4789)`
| Properti | Value |
|----------|-------|
| **Background** | `#ff7622`, 327×62px, rounded-12 |
| **Text** | "Tambah alamat baru" — Sen Bold 14px, `#ffffff` |

---

## Route & Backend Plan

### Database — Tabel Baru: `user_addresses`

| Kolom | Type | Keterangan |
|-------|------|-----------|
| `id` | bigIncrements | Primary key |
| `user_id` | foreignId | Foreign key ke `users.id` — `constrained()->cascadeOnDelete()` |
| `label` | enum | 'Rumah', 'Kantor', 'Lainya' |
| `address` | string | Alamat jalan lengkap |
| `province` | string, nullable | Provinsi |
| `postal_code` | string, nullable | Kode pos |
| `detail` | text, nullable | Detail lainnya (contoh: "sebelah rumah kuning") |
| `latitude` | decimal(10,7), nullable | Latitude koordinat |
| `longitude` | decimal(10,7), nullable | Longitude koordinat |
| `is_active` | boolean, default false | Alamat yang sedang dipilih/digunakan |
| `created_at` | timestamp | Otomatis |
| `updated_at` | timestamp | Otomatis |

### Model Baru: `UserAddress`

```php
class UserAddress extends Model
{
    protected $fillable = [
        'user_id', 'label', 'address', 'province',
        'postal_code', 'detail', 'latitude', 'longitude', 'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```

### Relasi di `User.php`
```php
public function addresses(): HasMany
{
    return $this->hasMany(UserAddress::class);
}
```

### Controller Baru: `LocationController`

| Method | Fungsi |
|--------|--------|
| `index()` | Tampilkan `DaftarLokasi` — list `user_addresses` milik user, diurutkan `created_at desc` |
| `create()` | Tampilkan `TambahLokasiBaru` — form tambah alamat |
| `store(Request)` | Simpan alamat baru → redirect ke `SimpanLokasiSukses` |
| `edit($id)` | Tampilkan form edit alamat |
| `update(Request, $id)` | Update alamat |
| `destroy($id)` | Hapus alamat |
| `setActive($id)` | Set `is_active` untuk alamat tertentu |
| `saveLocation(Request)` | Simpan dari map (latitude/longitude) → redirect form tambah |

### Route Baru

```php
Route::middleware(['auth'])->group(function () {
    // Akses Lokasi (izin)
    Route::get('/lokasi/akses', [LocationController::class, 'access'])->name('location.access');

    // Memilih Lokasi (map)
    Route::get('/lokasi/pilih', [LocationController::class, 'select'])->name('location.select');

    // Simpan dari map (POST untuk koordinat)
    Route::post('/lokasi/simpan-dari-map', [LocationController::class, 'saveFromMap'])->name('location.save-from-map');

    // Simpan Lokasi Sukses
    Route::get('/lokasi/sukses', [LocationController::class, 'success'])->name('location.success');

    // Daftar Lokasi (CRUD)
    Route::get('/lokasi', [LocationController::class, 'index'])->name('location.index');
    Route::get('/lokasi/tambah', [LocationController::class, 'create'])->name('location.create');
    Route::post('/lokasi', [LocationController::class, 'store'])->name('location.store');
    Route::get('/lokasi/{id}/edit', [LocationController::class, 'edit'])->name('location.edit');
    Route::put('/lokasi/{id}', [LocationController::class, 'update'])->name('location.update');
    Route::delete('/lokasi/{id}', [LocationController::class, 'destroy'])->name('location.destroy');
    Route::post('/lokasi/{id}/active', [LocationController::class, 'setActive'])->name('location.set-active');
});
```

### Page Baru

| File | Deskripsi |
|------|-----------|
| `resources/js/Pages/Lokasi/AksesLokasi.jsx` | Halaman izin akses lokasi |
| `resources/js/Pages/Lokasi/MemilihLokasi.jsx` | Halaman pilih lokasi di map |
| `resources/js/Pages/Lokasi/SimpanLokasiSukses.jsx` | Halaman sukses simpan lokasi |
| `resources/js/Pages/Lokasi/TambahLokasiBaru.jsx` | Halaman form tambah alamat |
| `resources/js/Pages/Lokasi/DaftarLokasi.jsx` | Halaman daftar alamat |

### Resource dari Figma

Perlu ekstrak dari Figma (via `save_screenshots` atau `get_screenshot`):
1. Map illustration — dari `Akses Lokasi` frame `610:7122` (Rectangle dgn IMAGE fill)
2. Success illustration vector — dari `Simpan Lokasi Sukses` frame `610:7124` (Group 8265)
3. Icon rumah — dari `Daftar Lokasi` frame `610:4765` (Group 8252 — house vector)
4. Icon kantor — dari `Daftar Lokasi` frame `610:4782` (Group 8254 — office vector)
5. Icon edit pencil — dari `Daftar Lokasi` frame `610:4768`
6. Icon delete trash — dari `Daftar Lokasi` frame `610:4758`
7. Map pin icon — dari `Akses Lokasi` frame `610:7109` (Map Pin group)
8. Location pin icon — dari `Tambah Lokasi Baru` frame `610:4735` (Vector)

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma untuk kebutuhan data**: Perlu tabel baru `user_addresses` untuk multiple alamat per user (Figma menunjukkan 2+ alamat: Rumah & Kantor). User existing hanya punya 1 kolom `address` — tidak cukup.
- [ ] **🎨 Cek resource Figma**: Ekstrak semua icon/vector/illustration dari 5 frame Figma (lihat daftar di atas). Simpan inline SVG atau di `public/images/`.
- [ ] Buat migration `create_user_addresses_table`
- [ ] Update model `User` — tambah relasi `addresses()`
- [ ] Buat model `UserAddress`
- [ ] Buat `LocationController` dengan method: `access`, `select`, `saveFromMap`, `success`, `index`, `create`, `store`, `edit`, `update`, `destroy`, `setActive`
- [ ] Tambah route di `routes/web.php` (semua di bawah middleware auth)
- [ ] Pass data ke Inertia (user addresses)

### ⬜ Phase 2: Halaman Akses Lokasi
- [ ] Buat `resources/js/Pages/Lokasi/AksesLokasi.jsx`
- [ ] Background putih `#ffffff`
- [ ] Ilustrasi map — 206×250, rounded-[90px], gambar dari Figma
- [ ] Teks "DFOOD WILL ACCESS YOUR LOCATION ONLY WHILE USING THE APP" — Sen 16px, `#646982`, centered
- [ ] Button "Access LOCATION" — `#ff7622`, 327×62, rounded-12, dengan map pin icon
- [ ] Button "LOKASI ANDA" (alternatif state setelah izin diberikan)
- [ ] Integrasi izin geolocation browser (navigator.geolocation)

### ⬜ Phase 3: Halaman Memilih Lokasi (Map)
- [ ] Buat `resources/js/Pages/Lokasi/MemilihLokasi.jsx`
- [ ] Map area — bisa pakai Leaflet.js atau map statis sederhana
- [ ] Back button — `#212029`, arrow putih
- [ ] Title dinamis — nama kota (dari geolocation atau input user)
- [ ] Red pin marker di tengah
- [ ] Tooltip "Move to edit location" — `#32343e`, rounded-3
- [ ] Bottom button "simpan LOkasi" — `#ff7622`, rounded-12
- [ ] Lat/lng state dari pin position

### ⬜ Phase 4: Halaman Simpan Lokasi Sukses
- [ ] Buat `resources/js/Pages/Lokasi/SimpanLokasiSukses.jsx`
- [ ] Success illustration — vector dari Figma (lingkaran `#fb6d3a` + centang)
- [ ] Decorative dots/stars — opasitas 0.3-0.4
- [ ] Teks "Lokasi telah di simpan" — Poppins Medium 22px, `#333333`
- [ ] Button "Ok" — `#ff7622`, 327×60, rounded-10
- [ ] Redirect ke halaman asal atau DaftarLokasi

### ⬜ Phase 5: Halaman Tambah Lokasi Baru (Form)
- [ ] Buat `resources/js/Pages/Lokasi/TambahLokasiBaru.jsx`
- [ ] Back button — `#32343e`, arrow putih
- [ ] Map area — 375×295, gray fallback
- [ ] Tooltip "Sesuaikan lokasi kamu"
- [ ] Form input: **alamat** (dengan icon 📍) — 327×50, `#f0f5fa`, rounded-10
- [ ] Form row: **provinsi** (156×50) + **Kode pos** (156×50) — side by side
- [ ] Form input: **Detail lainnya** — 327×50
- [ ] Label tags: **Rumah** (active `#f58d1d`), **Kantor** (inactive), **Lainya** (inactive)
- [ ] Button "simpan alamat" — `#ff7622`, 327×62, rounded-12
- [ ] Validasi form (required fields)
- [ ] Submit → store → redirect ke success atau DaftarLokasi

### ⬜ Phase 6: Halaman Daftar Lokasi
- [ ] Buat `resources/js/Pages/Lokasi/DaftarLokasi.jsx`
- [ ] Top bar: Back + "Alamat Saya"
- [ ] Back button — `#ecf0f4`, arrow dark `#32343e`
- [ ] Address cards (loop dari user.addresses):
  - Card background `#f0f5fa`, 327×101, rounded-16
  - Icon container 48×48 (rumah/kantor sesuai label)
  - Label + alamat lengkap
  - Edit icon orange → navigasi ke edit
  - Delete icon orange → konfirmasi + destroy
- [ ] Button "Tambah alamat baru" — `#ff7622`, 327×62, rounded-12
- [ ] Empty state jika tidak ada alamat
- [ ] Loading state
- [ ] Konfirmasi hapus (dialog/alert)

### ⬜ Phase 7: Interaksi & Polish
- [ ] Flow navigasi antar halaman:
  - AksesLokasi → klik "Access LOCATION" → MemilihLokasi
  - MemilihLokasi → klik "simpan" → SimpanLokasiSukses
  - SimpanLokasiSukses → klik "Ok" → DaftarLokasi atau halaman asal
  - DaftarLokasi → klik "Tambah alamat baru" → TambahLokasiBaru
  - TambahLokasiBaru → submit → SimpanLokasiSukses
- [ ] State management alamat aktif (is_active) untuk digunakan di halaman lain (checkout, home)
- [ ] Integrasi dengan halaman Home (lokasi dropdown) dan Checkout (pilih alamat pengiriman)
- [ ] Animasi transisi antar halaman

### ⬜ Phase 8: Validasi Error (Browser)
- [ ] Buka halaman di browser (via `php artisan serve + Vite`)
- [ ] Ambil **browser snapshot** (DOM) — cek struktur halaman untuk semua 5 frame
- [ ] Cek **browser console logs** — pastikan tidak ada error/warning
- [ ] Cek interaksi user: klik back, submit form, pilih label, hapus alamat
- [ ] Cek **responsiveness** di viewport mobile (max-width 430px)
- [ ] Cek empty state DaftarLokasi jika tidak ada alamat
- [ ] Cek validasi form (field kosong, dll)
- [ ] Cek error handling (gagal geolocation, gagal simpan)

### ⬜ Phase 9: Figma Design Comparison (Per-Frame Sequential)

Validasi dilakukan **satu per satu per frame** secara berurutan. Setiap frame diselesaikan dulu (screenshot Figma → screenshot Web → compare → iterasi jika < 90%) sebelum lanjut ke frame berikutnya.

**Frame 1: Akses Lokasi (`610:7104`)**
- [ ] Screenshot Figma frame `610:7104` — Akses Lokasi (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/` → lanjut Frame 2

**Frame 2: Memilih Lokasi (`610:7141`)**
- [ ] Screenshot Figma frame `610:7141` — Memilih Lokasi (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/` → lanjut Frame 3

**Frame 3: Simpan Lokasi Sukses (`610:7123`)**
- [ ] Screenshot Figma frame `610:7123` — Simpan Lokasi Sukses (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/` → lanjut Frame 4

**Frame 4: Tambah Lokasi Baru (`610:4706`)**
- [ ] Screenshot Figma frame `610:4706` — Tambah Lokasi Baru (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/` → lanjut Frame 5

**Frame 5: Daftar Lokasi (`610:4753`)**
- [ ] Screenshot Figma frame `610:4753` — Daftar Lokasi (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/`

### ⬜ Phase 10: Git Commit & Push
- [ ] `git add` semua perubahan
- [ ] `git commit` dengan pesan deskriptif (format: `feat: implement location management system — access, select, add, list, and success pages`)
- [ ] `git push` ke remote repository

---

## Catatan Implementasi

- **Background**: `#ffffff` untuk semua halaman lokasi
- **Dimensi**: 375×812px (Akses, Memilih, Simpan, Daftar), 375×820px (Tambah), mobile-first max-width 430px
- **Font**: Sen (konsisten) — kecuali Simpan Lokasi Sukses yang pakai Poppins untuk success title
- **Flow utama**: Izin lokasi → pilih map → simpan → lihat daftar → tambah/edit → simpan
- **Link ke halaman lain**:
  - **Home.jsx** — lokasi dropdown → `route('location.select')` atau `route('location.index')`
  - **Checkout.jsx** — pilih alamat pengiriman → `route('location.index')` (with callback)
- **Warna spesifik**:
  - `#ff7622` — Primary button semua halaman
  - `#32343e` — Back button (Tambah Lokasi), text labels
  - `#212029` — Back button (Memilih Lokasi) — dark theme
  - `#ecf0f4` — Back button (Daftar Lokasi)
  - `#f0f5fa` — Card bg, input bg
  - `#f58d1d` — Active label tag "Rumah"
  - `#fb6d3a` — Success illustration, edit/delete icons, map pin
  - `#2790c3` — Rumah icon (blue)
  - `#a03bb1` — Kantor icon (purple)
  - `#6b6e82` — Address text, placeholder text
  - `#646982` — Akses Lokasi description
  - `#333333` — Success title
  - `#c4c4c4` — Map area fallback
- **🎨 Figma Resources**: Semua icon/vector perlu diekstrak langsung dari Figma:
  - Map illustration (Akses Lokasi)
  - Success illustration (Simpan Lokasi Sukses)
  - House icon (Daftar Lokasi)
  - Office icon (Daftar Lokasi)
  - Edit pencil icon (Daftar Lokasi)
  - Delete trash icon (Daftar Lokasi)
  - Map pin icon (Akses Lokasi & Memilih Lokasi)
  - Location pin icon (Tambah Lokasi Baru)
- **⚠️ Catatan Penting**:
  - Untuk map interaktif (Memilih Lokasi, Tambah Lokasi Baru) bisa gunakan Leaflet.js (library ringan open source) atau fallback peta statis — Figma hanya menunjukkan desain visual map, bukan integrasi map real.
  - Geolocation API browser hanya support HTTPS/localhost — pastikan dev server via `php artisan serve`.
  - `is_active` hanya boleh 1 per user — gunakan query update untuk nonaktifkan yang lain saat set active baru.
  - Halaman Memilih Lokasi butuh data lat/lng dari geolocation atau dari pin drag.
  - Label tags di TambahLokasiBaru harus toggle (Rumah/Kantor/Lainya) — hanya 1 yang aktif.
