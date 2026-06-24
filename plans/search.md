# 🔍 Search — USER_FIX

> **File Figma**: `unsaved-mqs49lag-zcqi8mlr`
> **Frame**: `610:3718` — Search (363×844px)
> **Background**: `#ffffff`
> **Updated**: 2026-06-24
> **Status**: ✅ Sudah diimplementasi  
> **Figma match**: 93% (diverifikasi via Gemini visual comparison pada 2026-06-24)

---

## Layout (Dari Atas ke Bawah)

```
┌──────────────────────────────┐
│  [← Back]   Cari     [Cart]  │  Top bar
│                              │
│  ┌─ Search ────────────────┐ │
│  │ 🔍 Catring amanda    [×] │ │  Search bar, bg #f6f6f6, 327×62
│  └─────────────────────────┘ │
│                              │
│  Ktegori                     │  Title
│  [Makanan] [Snack] [Sehat]   │  Keyword tags (border #ededed)
│  [Prasmanan]                 │
│                              │
│  Rekomendasi Ketring         │  Section title
│  ┌──────────────────────────┐│
│  │ [img] Catering Ibu Jum.. ││  Rest 01 — ★4.7
│  │──────────────────────────││  Line separator
│  │ [img] Cering Kost Putr.. ││  Rest 02 — ★4.3
│  │──────────────────────────││
│  │ [img] Snack Box Ahui     ││  Rest 03 — ★4.0
│  └──────────────────────────┘│
│                              │
│  Paket Terpopuler            │  Section title
│  ┌──────┐ ┌──────┐          │
│  │Nasi  │ │Nasi  │          │  2 menu cards (153×165)
│  │Uduk  │ │Kotak │          │  Shadow: 0 12px 30px rgba(150,150,154,0.15)
│  │...   │ │...   │          │
│  └──────┘ └──────┘          │
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Group (610:3770)`
| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran `#ecf0f4` 45×45, arrow stroke `#181c2e`, weight 2 |
| **Title "Cari"** | Teks — Sen 17px, `#181c2e`, lineHeight 22px |
| **Cart icon** | Lingkaran `#181c2e` 45×45, cart icon putih |
| **Badge cart** | Notifikasi oranye di pojok kanan atas |

### 2. Search Input — `Group (610:3758)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:123 |
| Ukuran | 327×62 |
| Background | `#f6f6f6`, `border-radius: 10px` |
| **Search icon** | Stroke `#a0a5ba`, weight 2, di kiri |
| **Input text** | "Catring amanda" — Sen 14px, `#676767` |
| **Cursor** | Vector vertical stroke `#181c2e`, weight 0.8 |
| **Clear button** | Lingkaran `#cdcdcf` 20×20, icon X putih |

### 3. Keyword Tags — `Group (610:3747)`
| Elemen | Detail Figma |
|--------|-------------|
| **Title "Ktegori"** | Sen 20px, `#32343e`, posisi x:24, y:209 |
| **Tag "Makanan"** | 89×46, border `#ededed` weight 2, `border-radius: 33`, text Sen 16px `#181c2e` |
| **Tag "Snack"** | 86×46, border `#ededed` |
| **Tag "Sehat"** | 72×46, border `#ededed` |
| **Tag "Prasmanan"** | 102×46, border `#ededed` |
| **Tag aktif** (belum ada di Figma — perlu active state) | Mungkin bg `#ffd27c` seperti di Home |

### 4. Rekomendasi Ketring — `Group (610:3721)`
| Elemen | Detail Figma |
|--------|-------------|
| **Title** | "Rekomendasi Ketring" — Sen 20px, `#32343e` |
| **Rest 01** | Image 60×50, "Catering Ibu Jumilah" Sen 16px, star `#ff7622` + "4.7", line separator `#ebebeb` |
| **Rest 02** | Image 60×50, "Cering Kost Putri/Putra" Sen 16px, star `#ff7622` + "4.3", line separator |
| **Rest 03** | Image 60×50, "Snack Box Ahui" Sen 16px, star `#ff7622` + "4.0" |
| **Setiap item** | Tinggi 64px, lebar 327px, ada image 60×50, divider line |

### 5. Paket Terpopuler — `Group (610:3719)`
| Elemen | Detail Figma |
|--------|-------------|
| **Title** | "Paket Terpopuler" — Sen 20px, `#181c2e` |

### 6. Menu Cards
| Elemen | Detail Figma |
|--------|-------------|
| **Card size** | 153×165px |
| **Image** | 119×79 / 122×79, `border-radius: 15` |
| **Nama menu** | "Nasi Uduk" / "Nasi Kotak" — Sen Bold 15px, `#32343e` |
| **Nama catering** | "Jumilah Catering" / "Barokah Resto" — Sen 13px, `#646982` |
| **Harga** | "Rp 21.000" / "Rp 25.000" — Sen Bold 16px, `#181c2e` |
| **Plus button** | Lingkaran `#f58d1d` 30×30, icon + putih |
| **Rating** | Star stroke `#ff7622` + "4.7" |
| **Shadow** | `0 12px 30px rgba(150,150,154,0.15)` |

---

## Ringkasan Node

| Tipe | Jumlah |
|------|--------|
| 🖼️ FRAME | 1 (Search) |
| 📦 GROUP | 10+ (Top, Search bar, Keyword, 4× Tag, 3× Rest, 2× Menu card) |
| 📝 TEXT | 9 (Cari, input teks, Ktegori, 4× tag label, 2× section title) |
| 🟪 VECTOR | 4+ (Search bg, tag borders, cursor, card shadows) |
| 🔷 INSTANCE | 2 (menu, Burger 11) |
| **Total** | **~30 node** |

---

## Route & Backend Plan

### ⚠️ Database: Foto Profile Catering
**`caterings.image` sudah dipakai untuk hero banner (327×137px). Figma butuh foto profile kecil (60×50px) untuk list "Rekomendasi Ketring".**

```php
// Migration baru: tambah kolom logo ke caterings
Schema::table('caterings', function (Blueprint $table) {
    $table->string('logo')->nullable()->after('image');
});
```

**Seeder**: Tambah URL foto profile (logo) di `CateringSeeder` untuk tiap catering — pilih gambar profile (foto orang/logo) dari Unsplash, ukuran 60×60:

| Catering | Logo URL (contoh) |
|----------|------------------|
| Dapur Bunda | `https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=60&h=60&fit=crop` |
| Snack Corner | `https://images.unsplash.com/photo-1594381898411-846e7d193883?w=60&h=60&fit=crop` |
| Catering Hajatan | `https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=60&h=60&fit=crop` |
| Warung Sedep | `https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop` |
| Es Teh Indonesia | `https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=60&h=60&fit=crop` |

### Route Baru
```php
Route::get('/search', [SearchController::class, 'index'])->name('search');
```

Atau pakai route yang sudah ada:
```php
// Sudah ada — bisa dipakai untuk filter/search API
Route::get('/api/caterings/filter', [HomeController::class, 'filter'])->name('caterings.filter');
```

### SearchController
- `index(Request)` — menerima `?q=` query string
- Mencari `Catering` berdasarkan `name` atau `description`
- Mencari `Menu` berdasarkan `name`
- Mengembalikan data: `caterings` (rekomendasi), `menus` (paket terpopuler), `keywords` (tags filter)

### Page Baru
- `resources/js/Pages/Search.jsx` — Halaman Search Inertia

---

## Milestone Implementasi

### Phase 1: Database Migration, Route & Page
- [x] **Migration**: Tambah kolom `logo` ke tabel `caterings` (string, nullable, after `image`)
- [x] **Seeder**: Tambah URL logo/profile photo di `CateringSeeder` untuk tiap catering
- [x] **Model**: Tambah `logo` ke `$fillable` di `app/Models/Catering.php`
- [x] Buat `SearchController` dengan method `index()`
- [x] Tambah route `/search` di `routes/web.php`
- [x] Buat `resources/js/Pages/Search.jsx` sebagai Inertia page
- [x] Pass data: `query`, `caterings`, `menus`, `keywords`

### Phase 2: Top Bar & Search Input
- [x] Back button — lingkaran `#ecf0f4` 45×45, arrow icon, link ke home
- [x] Title "Cari" — Sen 17px, center
- [x] Cart icon + badge notifikasi
- [x] Search input — bg `#f6f6f6`, rounded-[10px], 327×62
- [x] Search icon stroke `#a0a5ba` di kiri
- [x] Pre-fill input dengan query dari parameter
- [x] Clear button (lingkaran `#cdcdcf` + X) — muncul hanya jika ada teks

### Phase 3: Keyword Tags
- [x] Title "Ktegori" — Sen 20px, `#32343e`
- [x] 4 tag pills (Makanan, Snack, Sehat, Prasmanan)
- [x] Border `#ededed`, weight 2, `rounded-full`, h-[46px]
- [x] Active state tag (bg `#ffd27c` + border `#ffd27c` saat dipilih)
- [x] Filter menus berdasarkan tag aktif
- [x] Scroll horizontal dengan grab-to-scroll (drag mouse)

### Phase 4: Rekomendasi Ketring
- [x] Section title "Rekomendasi Ketring" — Sen 20px
- [x] 3 list item catering (logo/profile photo 60×50, nama, rating star)
- [x] **Gunakan field `logo`** untuk profile photo (bukan `image` hero banner)
- [x] Fallback: jika `logo` null, tampilkan inisial/placeholder
- [x] Divider line `#ebebeb` antar item dengan gap `mt-[13px]`
- [x] Klik item → navigasi ke `catering.show`
- [x] Data dari backend (catering featured/populer)

### Phase 5: Paket Terpopuler
- [x] Section title "Paket Terpopuler" — Sen 20px
- [x] Grid 2 kolom menu cards (153×165)
- [x] Image container `rounded-[15px]`, `h-[79px]`, `top: '-12px'`
- [x] Nama menu (Sen Bold 15px), nama catering (Sen 13px)
- [x] Harga (Sen Bold 16px)
- [x] Plus button `#f58d1d` 30×30
- [x] Rating star
- [x] Shadow card sesuai Figma

### Phase 6: Interaksi & Polish
- [x] Search berubah saat user mengetik (debounce 400ms)
- [x] Keyboard enter → submit search
- [x] Clear button mereset input
- [x] Tag filter bekerja dengan search query
- [x] Click catering → Inertia visit ke CateringAcara
- [x] Click menu → plus button (placeholder untuk add to cart)
- [x] Empty state jika tidak ada hasil

---

## Catatan Implementasi
- Halaman Search adalah halaman **full Inertia page** (bukan modal/overlay)
- Search query dikirim via URL parameter `?q=`
- Data dari backend mencakup catering, menu, dan keyword tags yang dinamis
- Font: Sen (semua weight) konsisten
- Warna dasar putih (`#ffffff`)
- Mobile-first max-width 430px (inner wrapper 363px)

---

## 🔧 Figma Comparison Fixes (Round 1 — 2026-06-24)

Setelah implementasi awal, dilakukan **visual comparison menggunakan Gemini** antara Figma design dan implementasi web. Berikut daftar perbaikan yang diterapkan:

### Container & Wrapper
| Sebelum | Sesudah | Keterangan |
|---------|---------|------------|
| Padding `px-6` langsung di root | Inner wrapper `<div className="mx-auto" style={{ maxWidth: '363px' }}>` | Figma frame 363px, app container 430px |
| `px-6` (24px padding) | `px-[18px]` (18px padding) | Content area menjadi 327px (363 - 2×18) sesuai Figma |

### 1. Top Bar
| Item | Sebelum | Sesudah |
|------|---------|---------|
| Badge cart size | `w-[28px] h-[28px]` | `w-[25px] h-[25px]` |
| Badge font size | `text-[14px]` | `text-[11px]` |

### 2. Search Input
| Item | Sebelum | Sesudah |
|------|---------|---------|
| Height | `h-[72px]` | `h-[62px]` |
| Padding horizontal | `px-[22px]` | `px-5` (20px) |
| Input font size | `text-[16px]` | `text-[14px]` |

### 3. Keyword Tags (Ktegori)
| Item | Sebelum | Sesudah |
|------|---------|---------|
| Margin top | `mt-[28px]` | `mt-[24px]` |
| Label font | `text-[23px]` | `text-[20px]` |
| Tag height | `h-[56px]` | `h-[46px]` |
| Tag font | `text-[18px]` | `text-[16px]` |
| Tag padding X | `px-7` (28px) | `px-[11px]` |
| Gap antar tag | `gap-3` (12px) | `gap-[15px]` |
| Border radius | `rounded-[33px]` | `rounded-full` |
| **Grab-to-scroll** | ❌ Tidak ada | ✅ `onMouseDown/Move/Up/Leave` + ref `tagScrollRef` + cursor classes |

### 4. Rekomendasi Ketring
| Item | Sebelum | Sesudah |
|------|---------|---------|
| Margin top | `mt-[36px]` | `mt-[30px]` |
| Label font | `text-[23px]` | `text-[20px]` |
| Logo shape | `w-[60px] h-[60px] rounded-full` | `w-[60px] h-[50px] rounded-[10px]` |
| Nama warna | `text-[#181c2e]` | `text-[#32343e]` |
| Rating font | `text-[14px]` | `text-[16px]` |
| Chevron kanan | ❌ Ada | ✅ Dihapus (tidak di Figma) |
| Gap divider | Langsung di bawah item | Wrapper `mt-[13px]` sebelum divider |

### 5. Paket Terpopuler
| Item | Sebelum | Sesudah |
|------|---------|---------|
| Margin top | `mt-[38px]` | `mt-[32px]` |
| Label font | `text-[23px]` | `text-[20px]` |
| Card width | `flex-1` (flexibel) | `w-[153px]` (fixed) |
| Shadow | (default) | `0 12px 30px rgba(150,150,154,0.15)` |
| Image height | `h-[100px]` | `h-[79px]` dengan `top: '-12px'` |
| Nama menu | `text-[16px]` | `text-[15px]` |
| Nama catering | `text-[14px]` | `text-[13px]` |
| Harga | `text-[17px]` | `text-[16px]` |
| Plus button | `w-[38px] h-[38px]` | `w-[30px] h-[30px]` |
| Rating | `text-[15px]` | `text-[16px]` |

### Auto-focus Dihapus
- `useEffect` auto-focus pada input dikomentari agar focus ring tidak muncul di default state (search bar tetap terlihat borderless)

### Hasil Akhir
- **Figma match**: 93% (Gemini visual comparison)
- **Struktur**: 6 section lengkap (Top Bar, Search Input, Keyword Tags, Rekomendasi Ketring, Paket Terpopuler, Empty State)
- **Interaksi**: Debounce search, grab-to-scroll tags, filter tag, clear button, klik navigate

---

## 📝 Changelog

| Tanggal | Perubahan |
|---------|-----------|
| 2026-06-24 | Initial plan dibuat |
| 2026-06-24 | Implementasi awal Search.jsx |
| 2026-06-24 | **Round 1 fixes**: Semua perbaikan padding, spacing, font size, dan container setelah Figma comparison |
| 2026-06-24 | Grab-to-scroll ditambahkan ke keyword tags |
| 2026-06-24 | Dokumentasi diperbarui — final match rate 93% |
