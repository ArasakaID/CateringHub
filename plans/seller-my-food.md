# 🍱 Seller My Food (List Catering) — USER_FIX

> **File Figma**: `unsaved-mri02kq9-vihs832b`
> **Frame**: `610:6511` — Seller - My Food (375×812px)
> **Background**: `#ffffff`
> **Updated**: 2026-07-13
> **Status**: 🔜 Belum diimplementasi

---

## State Overview

Page ini memiliki **2 state**:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. List with data** | Page load | Daftar menu seller dengan tab filter kategori |
| **2. Empty state** | Belum ada menu | Tampilan kosong dengan CTA tambah menu |

---

## Layout

```
┌──────────────────────────────┐
│  [←]    List Catering        │  Top bar (y:50-95)
│                              │
│   All    Acara  Harian Snack │  Tab bar (y:127-161)
│   ────                       │  Active indicator #fb6d3a
│                              │
│  Total 03 items              │  y:185, Sen 14px #9c9ba6
│                              │
│  ┌──────┐ Chicken Thai B.   │  Food 1 (y:222-324)
│  │      │ Acara              │  102×102 image
│  │      │ ★ 4.9 (10 Review) │  Badge pill #ff7622 opacity 0.2
│  └──────┘    Rp15.000/Box   │  More (⋮) right-aligned
│                              │
│  ┌──────┐ Ikan Bhuna        │  Food 2 (y:344-446)
│  │      │ Acara              │
│  │      │ ★ 4.9 (10 Review) │
│  └──────┘    Rp15.000/Box   │
│                              │
│  ┌──────┐ Mazalichiken H.   │  Food 3 (y:466-568)
│  │      │ Harian             │
│  │      │ ★ 4.9 (10 Review) │
│  └──────┘    Rp15.000/Box   │
│                              │
│ [🏠] [📋] [＋] [🔔] [👤]    │  Bottom tab bar (y:723-812)
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Group (610:6694)`

| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran 45×45, bg `#ecf0f4`, arrow stroke `#181c2e` weight 2 |
| **"List Catering"** | Sen 17px Regular, `#181c2e` |

### 2. Tab Bar — `Group (y:127-161)`

| Elemen | Detail |
|--------|--------|
| **"All" (active)** | Sen 14px Bold, `#fb6d3a` |
| **"Acara"** | Sen 14px Regular, `#32343e` |
| **"Harian"** | Sen 14px Regular, `#32343e` |
| **"Snack"** | Sen 14px Regular, `#32343e` |
| **Active indicator** | Line `#fb6d3a`, width ~50px, di bawah "All" |
| **Bottom line** | Full width `#f6f8fa` |

### 3. Food Cards — 3 Items

Setiap card memiliki struktur yang sama:

| Properti | Value |
|----------|-------|
| **Image** | 102×102, fill `#98a8b8`, radius 20 |
| **Nama** | Sen 14px Bold, `#32343e` |
| **Badge** | Pill radius ~29px, bg `#ff7622` opacity 0.2, text Sen 13.67px Regular `#ff7622` |
| **Star icon** | ~16.6×16.6, stroke `#fb6d3a`, weight 8.79 |
| **Rating** | Sen 13.67px Bold, `#fb6d3a` |
| **Review count** | Sen 13.67px Regular, `#afafaf` |
| **Harga** | Sen 14px Bold, `#32343e`, right-aligned (e.g. "Rp15.000/Box") |
| **More (⋮)** | 3 dots vertikal, ~23.3×23.3, stroke `#32343e` weight 1.94, rotated -90° |

**Food 1** (y:222): "Chicken Thai Biriyani", badge "Acara", Rp15.000/Box
**Food 2** (y:344): "Ikan Bhuna", badge "Acara", Rp15.000/Box
**Food 3** (y:466): "Mazalichiken Halim", badge "Harian", Rp15.000/Box

### 4. Layout Spacing

| Item | Value |
|------|-------|
| **Card spacing** | 122px antar card (y:222 → 344 → 466) |
| **Card height** | 102px |
| **Gap between cards** | 20px |
| **Left margin** | 24px |
| **Text start** | x:138 (102px image + 12px gap + 24px margin) |
| **Price right-align** | x:276, width 75px |

### 5. "Total items" text

| Properti | Value |
|----------|-------|
| **Text** | "Total 03 items" |
| **Font** | Sen 14px Regular, `#9c9ba6` |
| **Position** | x:24, y:185 |

---

## Route & Backend Plan

### Database

- **menus** — sudah ada, query dengan filter `category_id` dan `user_id` (seller)
- **reviews** — aggregation `AVG(rating)` dan `COUNT(*)` per menu

### Route Baru

```php
Route::middleware(['auth', 'seller'])->prefix('seller')->group(function () {
    Route::get('/my-food', [SellerMenuController::class, 'index'])->name('seller.my-food');
    Route::delete('/menu/{menu}', [SellerMenuController::class, 'destroy'])->name('seller.menu.destroy');
});
```

### Controller

| Method | Fungsi |
|--------|--------|
| `index()` | Tampilkan daftar menu seller, filter by kategori (All/Acara/Harian/Snack) |
| `destroy(Menu $menu)` | Hapus menu → redirect ke My Food |

### Page Baru

- `resources/js/Pages/Seller/MyFood.jsx` — Daftar menu seller dengan tab filter

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma**: Data yang dibutuhkan: menu list per seller, filter kategori, rating aggregation
- [ ] **🎨 Cek resource Figma**: Ekstrak star icon, more-vertical icon dari frame `610:6511`
- [ ] Buat `SellerMenuController` (jika belum ada dari Add Menu plan)
- [ ] Tambah route `/seller/my-food` dan `DELETE /seller/menu/{menu}`
- [ ] Query: menus milik seller + eager load category + reviews aggregation
- [ ] Pass data: `menus`, `categories`, `activeTab`, `totalItems`

### ⬜ Phase 2: Top Bar & Tab Filter
- [ ] Buat `resources/js/Pages/Seller/MyFood.jsx`
- [ ] Back button — `#ecf0f4`, arrow `#181c2e`
- [ ] Title "List Catering" — Sen 17px `#181c2e`
- [ ] Tab bar: All (active `#fb6d3a` Bold), Acara, Harian, Snack (`#32343e` Regular)
- [ ] Active indicator line `#fb6d3a`
- [ ] Tab switching → filter via Inertia visit atau local state
- [ ] "Total X items" — Sen 14px `#9c9ba6`

### ⬜ Phase 3: Food Cards
- [ ] List rendering dari data `menus`
- [ ] Image 102×102, radius 20
- [ ] Nama menu — Sen 14px Bold `#32343e`
- [ ] Badge pill — bg `#ff7622` opacity 0.2, text `#ff7622`
- [ ] Rating: star icon + "4.9" + "(10 Review)"
- [ ] Harga — Sen 14px Bold, right-aligned
- [ ] More (⋮) — 3 dots vertikal `#32343e`

### ⬜ Phase 4: Actions
- [ ] Tap card → navigasi ke Food Details
- [ ] Tap More (⋮) → dropdown: Edit / Hapus
- [ ] Hapus → konfirmasi dialog → `DELETE /seller/menu/{id}`
- [ ] Empty state jika belum ada menu
- [ ] Center FAB (+) → navigasi ke Add Menu

### ⬜ Phase 5: Bottom Tab Bar
- [ ] Shared component `SellerTabBar.jsx`
- [ ] Active tab: Menu icon (📋) stroke `#ff7622`

### ⬜ Phase 6: Validasi Error (Browser)
- [ ] Buka halaman di browser
- [ ] Cek console logs
- [ ] Cek responsiveness
- [ ] Test tab switching
- [ ] Test more menu dropdown
- [ ] Test hapus menu

### ⬜ Phase 7: Figma Design Comparison
- [ ] Screenshot Figma frame `610:6511`
- [ ] Screenshot Web
- [ ] Bandingkan — target ≥ 90%

### ⬜ Phase 8: Git Commit & Push
- [ ] `git commit -m "feat: seller my food list with category filter & CRUD actions"`
- [ ] `git push`

---

## Catatan Implementasi

- **Badge pill** menggunakan `#ff7622` opacity 0.2 sebagai background — bukan solid
- **More (⋮)** rotated -90° — 3 dots horizontal yang di-rotate jadi vertikal
- **Card spacing** 122px (102px card + 20px gap)
- **Active tab** "All" menggunakan Bold + `#fb6d3a`, lainnya Regular + `#32343e`
- **Bottom tab** active di icon Menu (📋), bukan Grid
- **🎨 Figma Resources**: Ekstrak star icon dan more-vertical icon dari frame `610:6511`
