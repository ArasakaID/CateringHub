# 🍽️ Detail Produk — USER_FIX

> **File Figma**: `unsaved-mqs49lag-zcqi8mlr`
> **Frame**: `610:3790` — Detail Produk (375×844px)
> **Background**: `#ffffff`
> **Updated**: 2026-06-24
> **Status**: 🔜 Belum diimplementasi

---

## Layout (Dari Atas ke Bawah)

```
┌──────────────────────────────┐
│  [← Back]   Detail Produk    │  Top bar (Back + title)
│                              │
│  ┌──────────────────────────┐│
│  │                          ││
│  │      Hero Image          ││  Image 327×184, rounded-[32px]
│  │          [♡ Save]        ││  Save icon (lingkaran putih opacity 0.2)
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │ [●] Catering Ibu Jumilah ││  Catering pill (rounded-full, border #e9e9e9)
│  └──────────────────────────┘│
│                              │
│  Nasi uduk                   │  Product name — Sen Bold 20px
│                              │
│  Deskripsi produk panjang... │  Sen 14px, #a0a5ba, lineHeight 24px
│                              │
│  ★ 4.7    🚚 Antar    🕐 1 hr │  Info bar (rating, delivery, time)
│                              │
│  PILIHAN                     │  Opsi bahan/pilihan (Sen 13px, #32343e)
│  ☐ Nasi hangat               │  Checkbox option 1
│  ☐ Telur puyuh               │  Checkbox option 2
│                              │
│  ┌──────────────────────────┐│
│  │                          ││  Bottom sheet bg #f0f5fa, rounded-t-[24px]
│  │  Rp 21.000    [-] 12 [+] ││  Price + quantity selector
│  │                          ││
│  │  ┌────────────────────┐  ││
│  │  │   Masuk keranjang   │  ││  Button #ff7622, 327×62, rounded-[12px]
│  │  └────────────────────┘  ││
│  └──────────────────────────┘│
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Group (610:3818)`
| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran `#ecf0f4` 45×45, arrow stroke `#181c2e`, weight 2 |
| **Title "Detail Produk"** | Teks — Sen 17px, `#181c2e`, lineHeight 22px |

> Tidak ada Cart icon di top bar (beda dengan Search/Home).

### 2. Hero Image — `Group (610:3812)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:86 |
| **Image Background** | 327×184, `border-radius: 32` |
| **Fill** | IMAGE (menu image dari DB — pakai `menu.image` yang sudah ada) |
| **Save icon** | Lingkaran 37×37, putih opacity 0.2, vector heart/bookmark putih |
| Posisi save | x:294, y:244 (di atas gambar) |

### 3. Catering Profile Pill — `Group (610:3808)`
| Properti | Value |
|----------|-------|
| Posisi | x:27, y:320 |
| Ukuran | 201×47 |
| Background | `#ffffff`, border `#e9e9e9` weight 1, `border-radius: 50` |
| **Foto profile** | Ellipse 21×21, IMAGE fill — **pakai `catering.logo`** (kolom baru) |
| **Nama catering** | "Catering Ibu Jumilah" — Sen 14px, `#181c2e` |
| Klik | Navigasi ke halaman CateringAcara |

### 4. Product Name — `Text (610:3807)`
| Properti | Value |
|----------|-------|
| Posisi | x:27, y:387 |
| Font | Sen Bold 20px |
| Warna | `#181c2e` |
| Isi | `menu.name` dari database |

### 5. Description — `Text (610:3806)`
| Properti | Value |
|----------|-------|
| Posisi | x:27, y:418 |
| Ukuran | 307×48 (auto-height) |
| Font | Sen Regular 14px |
| Warna | `#a0a5ba` |
| Line height | 24px |
| Isi | `menu.description` dari database |

### 6. Info Bar — 3 item horizontal
| Elemen | Detail |
|--------|--------|
| **Rating** | Star `#ff7622` 20×20 + "4.7" — Sen Bold 16px `#181c2e` |
| **Delivery** | Delivery icon 23×16 + "Antar" — Sen 14px `#181c2e` |
| **Time** | Clock icon 20×20 + "1 hari" — Sen 14px `#181c2e` |

### 7. Pilihan (Ingredients/Pilihan) — `Group (610:3863)`
| Elemen | Detail |
|--------|--------|
| **Title "PILIHAN"** | Sen 13px, `#32343e`, letterSpacing 2%, uppercase |
| **Option 1** | Icon checkbox + "Nasi hangat" |
| **Option 2** | Icon checkbox + "telur puyuh (rebus dan kupas)" |
| Sumber data | Dari `menu.options` atau tambahan tabel baru |

> ⚠️ **Catatan**: DB belum punya tabel/kolom untuk opsi pilihan menu. Perlu:
> - Alternatif 1: Kolom `options` (JSON) di tabel `menus`
> - Alternatif 2: Tabel `menu_options` baru (id, menu_id, name, price_adjustment)

### 8. Bottom Sheet Add Cart — `Group (610:3824)`
| Elemen | Detail |
|--------|--------|
| **Background card** | `#f0f5fa`, 375×184, `border-radius: 24` (topLeft/topRight) |
| **Price** | "Rp 21.000" — Sen 28px, `#181c2e`, posisi x:23, y:656 |
| **Qty Selector** | Rectangle `#121223`, `border-radius: 50`, shadow |
| **Qty number** | "12" — Sen Bold 16px, putih |
| **Minus button** | Lingkaran kecil di kiri angka |
| **Plus button** | Lingkaran kecil di kanan angka |
| **"Masuk keranjang"** | Button `#ff7622`, 327×62, `rounded-[12px]` |
| **Button text** | "Masuk keranjang" — Sen Bold 16px, `#ffffff`, centered |

---

## Ringkasan Node

| Tipe | Jumlah |
|------|--------|
| 🖼️ FRAME | 1 (Detail Produk) |
| 📦 GROUP | 10+ (Top, Heading Image, Save, Catering pill, Info bar, Pilihan, Qty, Button, dll) |
| 📝 TEXT | 7 (Detail Produk, Nama produk, Deskripsi, Rating, PILIHAN, Price, Button) |
| 🟪 VECTOR/RECTANGLE | 5+ (Hero image, bg card, button, checkbox, dll) |
| 🔷 ELLIPSE | 3 (Back, Save icon bg, Foto profile) |
| **Total** | **~30 node** |

---

## Route & Backend Plan

### Database
Sudah ada di `menus`:
- `id`, `catering_id`, `category_id`, `name`, `description`, `price`, `image`, `is_available`

**Yang perlu ditambah:**
- [ ] Kolom `options` (JSON) di `menus` — untuk menyimpan opsi pilihan:
  ```json
  [{"name": "Nasi hangat"}, {"name": "telur puyuh (rebus dan kupas)"}]
  ```

### Route Baru
```php
Route::get('/menu/{id}', [MenuController::class, 'show'])->name('menu.show');
```

### MenuController
- `show($id)` — ambil satu menu dengan relasi `catering`
- Kembalikan Inertia render `DetailProduk` dengan data:
  - `menu` — detail menu
  - `catering` — parent catering (untuk nama + logo)
  - `relatedMenus` — menu lain dari catering yang sama (opsional)

### Page Baru
- `resources/js/Pages/DetailProduk.jsx` — Halaman Detail Produk Inertia

### Link dari Halaman Lain
| Dari | Action |
|------|--------|
| **CateringAcara.jsx** | Klik card menu → `route('menu.show', { id: menu.id })` |
| **Search.jsx** | Klik card menu → `route('menu.show', { id: menu.id })` |

---

## Milestone Implementasi

### ✅ Phase 1: Database & Backend
- [x] **Migration**: Tambah kolom `options` (JSON/nullable) ke tabel `menus`
- [x] **Seeder**: Update `MenuSeeder` dengan `description` dan `options` untuk tiap menu
- [x] **Model**: Tambah `options` ke `$fillable` dan `$casts` di `Menu.php`
- [x] Buat `MenuController` dengan method `show($id)`
- [x] Tambah route `GET /menu/{id}` di `routes/web.php`
- [x] Load menu + relasi catering

### ✅ Phase 2: Page & Top Bar
- [x] Buat `resources/js/Pages/DetailProduk.jsx`
- [x] Back button — lingkaran `#ecf0f4` 45×45, arrow, link ke halaman catering
- [x] Title "Detail Produk" — Sen 17px

### ✅ Phase 3: Hero Image & Catering Pill
- [x] Hero image — 327×184, `rounded-[32px]`, pakai `menu.image` + fallback
- [x] Save/bookmark icon — heart icon, lingkaran putih opacity 0.2 di pojok kanan atas
- [x] Catering profile pill — `rounded-full`, border `#e9e9e9`, 201×47
- [x] Foto profile 21×21 — pakai `catering.logo` (dengan fallback)
- [x] Nama catering — klik navigasi ke `catering.show`

### ✅ Phase 4: Info Produk
- [x] Product name — `menu.name`, Sen Bold 20px
- [x] Description — `menu.description`, Sen 14px, `#a0a5ba`, lineHeight 24px
- [x] Rating star `#ff7622` + angka rating
- [x] Delivery icon + teks
- [x] Clock icon + delivery time

### ✅ Phase 5: Pilihan Options
- [x] Title "PILIHAN" — Sen 13px, letterSpacing 2%, uppercase
- [x] Render opsi dari `menu.options` (JSON array)
- [x] Quantity counter per opsi (bukan checkbox) — unified dark capsule
- [x] State selected options (optionQtys)

### ✅ Phase 6: Add to Cart Bottom Sheet
- [x] Background `#f0f5fa`, `rounded-t-[24px]`
- [x] Price — `menu.price`, format Rp, Sen 28px
- [x] Qty selector unified dark capsule: minus, angka, plus — bg `#121223`
- [x] "MASUK KERANJANG" button — `#ff7622`, 327×62, `rounded-[12px]`, uppercase
- [ ] Button click — integrasi cart (nanti)

### ✅ Phase 7: Interaksi & Polish
- [x] Qty minimum 1, tidak bisa minus dari 1
- [x] Total harga update saat qty berubah (price × qty)
- [x] Save/bookmark toggle (favorit)
- [x] Click catering pill → navigasi ke CateringAcara
- [x] Image fallback jika URL rusak
- [x] Error state — 404 otomatis dari controller findOrFail

### ✅ Phase 8: Figma Design Comparison
- [x] Screenshot Figma (via `save_screenshots` Figma MCP — frame `610:3790`)
- [x] Screenshot Web (via `browser_save_screenshot` Browser MCP)
- [x] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [x] Skor v1: **79.75%** → v2: **94%** → v3 final: **96.25%** ✅ Target ≥90% tercapai!

### ⏳ Phase 9: Git Commit & Push
- [ ] `git add` semua perubahan
- [ ] `git commit` dengan pesan deskriptif
- [ ] `git push` ke remote repository

---

## Catatan Implementasi
- Halaman Detail Produk adalah **halaman penuh** (bukan modal)
- Route menggunakan `id` menu (bisa pakai slug nanti jika diperlukan)
- Hero image pakai `menu.image` (sudah ada di DB)
- Foto profile catering di pill pakai `catering.logo` — **kolom yang sama dengan Search plan**
- Qty selector dengan desain dark pill (`#121223`), bukan style konvensional
- Button "Masuk keranjang" konsisten dengan button auth (bg `#ff7622`, 327×62, `rounded-[12px]`)
- Font: Sen (semua weight) konsisten
- Mobile-first max-width 430px
