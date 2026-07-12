# 🍽️ Seller Food Details — USER_FIX

> **File Figma**: `unsaved-mri02kq9-vihs832b`
> **Frame**: `610:6268` — Seller - Chef Food Details (375×872px)
> **Background**: `#ffffff`
> **Updated**: 2026-07-13
> **Status**: 🔜 Belum diimplementasi

---

## State Overview

Page ini memiliki **1 state**:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. Food Details** | Tap item di My Food | Detail menu seller dengan ingredients, description, dan tombol Edit |

---

## Layout

```
┌──────────────────────────────┐
│  [←]    Food Details   Edit  │  Top bar (y:50-95)
│                              │
│  ┌──────────────────────┐   │  Food image (y:127-337)
│  │                      │   │  327×210, radius 20
│  │    (food image)      │   │
│  │                      │   │
│  │ [Breakfast]  [Delivery] │  Badges (y:297)
│  │      • • • •          │   │  Carousel dots
│  └──────────────────────┘   │
│                              │
│  Chicken Thai Biriyani  $60 │  y:350
│  📍 Kentucky 39495          │  y:378
│              ★ 4.9 (10 Rev) │
│  ────────────────────────── │  Divider (y:421)
│                              │
│  ingridents                  │  y:441
│                              │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ │  Row 1 (y:478)
│  │🧂│ │🍗│ │🧅│ │🧄│ │🌶️│ │  50×50 circles, bg #ffebe4
│  Salt Chicken onion Garlic Pap. │
│                              │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐       │  Row 2 (y:577)
│  │🫚│ │🥦│ │🍊│ │🥜│       │
│  Ginger Broc. Orange Walnut  │
│                              │
│  ────────────────────────── │  Divider (y:666)
│                              │
│  Description                 │  y:686
│  Lorem ipsum dolor sit...    │  y:717, Sen 13px #747783
│                              │
│ [🏠] [📋] [＋] [🔔] [👤]    │  Bottom tab bar (y:783-872)
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Group (610:6410)`

| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran 45×45, bg `#ecf0f4`, arrow stroke `#181c2e` weight 2 |
| **"Food Details"** | Sen 17px Regular, `#181c2e` |
| **"Edit"** | **Poppins** 14px Medium (500), `#fb6d3a` — x:322 |

### 2. Food Image & Badges — `Group (610:6383)`

| Properti | Value |
|----------|-------|
| **Image** | 327×210, fill `#98a8b8`, radius 20 |
| **"Breakfast" badge** | 90×28, bg `#ffffff` opacity 0.8, radius 61, text Sen 14px `#32343e` |
| **"Delivery" badge** | 83×28, bg `#ffffff` opacity 0.8, radius 61, text Sen 14px `#32343e` |
| **Carousel dots** | 4 ellipses 10×10 white + 1 rect 21×10 white radius 22 (active) |

### 3. Food Info

| Elemen | Detail |
|--------|--------|
| **"Chicken Thai Biriyani"** | Sen 16px Bold, `#32343e` |
| **"$60"** | Sen 18px Bold, `#32343e`, right-aligned |
| **Location icon** | 12×12, fill `#afafaf` |
| **"Kentucky 39495"** | Sen 13px Regular, `#afafaf` |
| **Star icon** | 17×17, stroke `#fb6d3a`, weight 9 |
| **"4.9"** | Sen 14px Bold, `#fb6d3a` |
| **"(10 Reviews)"** | Sen 14px Regular, `#afafaf` |

### 4. Ingredients Grid — `Group (610:6271)`

| Properti | Value |
|----------|-------|
| **Heading "ingridents"** | Sen 14px Regular, `#32343e` |
| **Circle** | 50×50, fill `#ffebe4`, radius 100 |
| **Icon** | 24×24, fill/stroke `#fb6d3a` |
| **Label** | Sen 12px Regular, `#747783` |

**Row 1** (5 items): Salt, Chicken, onion (Alergy), Garlic, Pappers–(Alergy)
**Row 2** (4 items): Ginger, Broccoli, Orange, Walnut

### 5. Description

| Elemen | Detail |
|--------|--------|
| **Heading** | "Description" — Sen 14px Regular, `#32343e` |
| **Body** | Sen 13px Regular, `#747783`, 324×62 |

### 6. Divider Lines

| Posisi | Stroke |
|--------|--------|
| y:421 (setelah food info) | `#f0f4f9`, weight 1, 327px |
| y:666 (setelah ingredients) | `#f0f4f9`, weight 1, 327px |

---

## Route & Backend Plan

### Database

- **menus** — sudah ada, perlu kolom:
  - `ingredients` (JSON/text) — daftar bahan
  - `badges` (JSON) — ["Breakfast", "Delivery"]
  - `description` (text) — deskripsi panjang
  - `location` (string) — lokasi catering

### Route Baru

```php
Route::middleware(['auth', 'seller'])->prefix('seller')->group(function () {
    Route::get('/food/{menu}', [SellerFoodController::class, 'show'])->name('seller.food.show');
    Route::get('/food/{menu}/edit', [SellerFoodController::class, 'edit'])->name('seller.food.edit');
});
```

### Controller

| Method | Fungsi |
|--------|--------|
| `show(Menu $menu)` | Tampilkan detail menu seller |
| `edit(Menu $menu)` | Redirect ke halaman edit (Add Menu form) |

### Page Baru

- `resources/js/Pages/Seller/FoodDetails.jsx` — Detail menu seller

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma**: Kolom baru di `menus`: `ingredients`, `badges`, `description`, `location`
- [ ] **🎨 Cek resource Figma**: Ekstrak 9 ingredient icons + star icon + location icon dari frame `610:6268`
- [ ] Migration: tambah kolom `ingredients` (JSON), `badges` (JSON), `description` (text), `location` (string) ke `menus`
- [ ] Update model `Menu` ($fillable, $casts)
- [ ] Buat `SellerFoodController`
- [ ] Tambah route `/seller/food/{menu}`
- [ ] Pass data: `menu` (dengan ingredients, badges, description, reviews)

### ⬜ Phase 2: Top Bar & Food Image
- [ ] Buat `resources/js/Pages/Seller/FoodDetails.jsx`
- [ ] Back button — `#ecf0f4`, arrow `#181c2e`
- [ ] Title "Food Details" — Sen 17px `#181c2e`
- [ ] "Edit" link — Poppins 14px Medium `#fb6d3a`
- [ ] Food image 327×210, radius 20
- [ ] Badges "Breakfast" & "Delivery" — pill bg white opacity 0.8
- [ ] Carousel dots

### ⬜ Phase 3: Food Info
- [ ] Nama menu — Sen 16px Bold `#32343e`
- [ ] Harga — Sen 18px Bold `#32343e`, right-aligned
- [ ] Location + icon
- [ ] Rating + star icon + review count
- [ ] Divider line `#f0f4f9`

### ⬜ Phase 4: Ingredients Grid
- [ ] Heading "ingridents" — Sen 14px
- [ ] Grid 5 kolom: circle 50×50 bg `#ffebe4` + icon 24×24 `#fb6d3a` + label Sen 12px `#747783`
- [ ] Row 1 (5 items) + Row 2 (4 items)
- [ ] Dynamic dari data `menu.ingredients`

### ⬜ Phase 5: Description & Bottom Tab
- [ ] Heading "Description"
- [ ] Body text Sen 13px `#747783`
- [ ] Divider line
- [ ] Bottom Tab Bar (shared component dari Dashboard plan)

### ⬜ Phase 6: Validasi Error (Browser)
- [ ] Buka halaman di browser
- [ ] Cek console logs
- [ ] Cek responsiveness
- [ ] Cek "Edit" button navigasi ke form edit

### ⬜ Phase 7: Figma Design Comparison
- [ ] Screenshot Figma frame `610:6268`
- [ ] Screenshot Web
- [ ] Bandingkan — target ≥ 90%

### ⬜ Phase 8: Git Commit & Push
- [ ] `git commit -m "feat: seller food details page with ingredients grid & description"`
- [ ] `git push`

---

## Catatan Implementasi

- **"Edit" text** menggunakan font **Poppins** (bukan Sen) — satu-satunya elemen non-Sen
- **Ingredients** disimpan sebagai JSON di kolom `menus.ingredients`
- **Badges** disimpan sebagai JSON array di `menus.badges`
- **Carousel dots** untuk multiple food images
- **Bottom Tab Bar** shared component dari Dashboard
- **🎨 Figma Resources**: Ekstrak 9 ingredient icons dari frame `610:6268`
