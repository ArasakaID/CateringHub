# 🍱 Seller My Food (List Catering) — USER_FIX

> **File Figma**: `unsaved-mri02kq9-vihs832b`
> **Frame**: `610:6511` — Seller - My Food (375×812px)
> **Background**: `#ffffff`
> **Updated**: 2026-07-13
> **Status**: ✅ Selesai — deployed ke https://catering.apep.dev/seller/my-food
> **QA Score**: 95% (Gemini)

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
- [x] **🔍 Analisis Figma**: Data yang dibutuhkan: menu list per seller, filter kategori, rating aggregation
- [x] **🎨 Cek resource Figma**: Ekstrak star icon, more-vertical icon dari frame `610:6511`
- [x] Buat `SellerMenuController` (jika belum ada dari Add Menu plan)
- [x] Tambah route `/seller/my-food` dan `DELETE /seller/menu/{menu}`
- [x] Query: menus milik seller + eager load category + reviews aggregation
- [x] Pass data: `menus`, `categories`, `activeTab`, `totalItems`

### ⬜ Phase 2: Top Bar & Tab Filter
- [x] Buat `resources/js/Pages/Seller/MyFood.jsx`
- [x] Back button — `#ecf0f4`, arrow `#181c2e`
- [x] Title "List Catering" — Sen 17px `#181c2e`
- [x] Tab bar: All (active `#fb6d3a` Bold), Acara, Harian, Snack (`#32343e` Regular)
- [x] Active indicator line `#fb6d3a`
- [x] Tab switching → filter via Inertia visit atau local state
- [x] "Total X items" — Sen 14px `#9c9ba6`

### ⬜ Phase 3: Food Cards
- [x] List rendering dari data `menus`
- [x] Image 102×102, radius 20
- [x] Nama menu — Sen 14px Bold `#32343e`
- [x] Badge pill — bg `#ff7622` opacity 0.2, text `#ff7622`
- [x] Rating: star icon + "4.9" + "(10 Review)"
- [x] Harga — Sen 14px Bold, right-aligned
- [x] More (⋮) — 3 dots vertikal `#32343e`

### ⬜ Phase 4: Actions
- [x] Tap card → navigasi ke Food Details
- [x] Tap More (⋮) → dropdown: Edit / Hapus
- [x] Hapus → konfirmasi dialog → `DELETE /seller/menu/{id}`
- [x] Empty state jika belum ada menu
- [x] Center FAB (+) → navigasi ke Add Menu

### ⬜ Phase 5: Bottom Tab Bar
- [x] Shared component `SellerTabBar.jsx`
- [x] Active tab: Menu icon (📋) stroke `#ff7622`

### ⬜ Phase 6: Validasi Error (Browser)
- [x] Buka halaman di browser
- [x] Cek console logs
- [x] Cek responsiveness
- [x] Test tab switching
- [x] Test more menu dropdown
- [x] Test hapus menu

### ⬜ Phase 7: Figma Design Comparison
- [x] Screenshot Figma frame `610:6511`
- [x] Screenshot Web
- [x] Bandingkan — target ≥ 90%

### ⬜ Phase 8: Git Commit & Push
- [x] `git commit -m "feat: seller my food list with category filter & CRUD actions"`
- [x] `git push`

---

## Catatan Implementasi

- **Badge pill** menggunakan `#ff7622` opacity 0.2 sebagai background — bukan solid
- **More (⋮)** rotated -90° — 3 dots horizontal yang di-rotate jadi vertikal
- **Card spacing** 122px (102px card + 20px gap)
- **Active tab** "All" menggunakan Bold + `#fb6d3a`, lainnya Regular + `#32343e`
- **Bottom tab** active di icon Menu (📋), bukan Grid
- **🎨 Figma Resources**: Ekstrak star icon dan more-vertical icon dari frame `610:6511`

---

## ✅ Implementation Log (2026-07-13)

### Backend
- **Controller**: `app/Http/Controllers/Seller/SellerMenuController.php`
  - `index()`: filter menus by category (all/acara/harian/snack), attach rating/review aggregation
  - `destroy(Menu $menu)`: delete menu → redirect back
- **Routes**: `GET /seller/my-food`, `DELETE /seller/menu/{menu}` in `routes/web.php`

### Frontend
- **Page**: `resources/js/Pages/Seller/MyFood.jsx`
  - Top bar: back button (circle 45x45 #ecf0f4), "List Catering" Sen 17px #181c2e
  - Tab bar: All (active #fb6d3a Bold), Acara/Harian/Snack (#32343e Regular), inline indicator line
  - Total items: "Total XX items" Sen 14px #9c9ba6
  - Food cards: image 102x102 radius 20, name (14px Bold #32343e), badge pill (#ff7622 20% opacity bg), solid star + rating + review count, price right-aligned, horizontal more icon (3 dots)
  - Empty state: "Belum ada menu" with CTA
  - Bottom tab bar: SellerTabBar with active="menu" (ListIcon highlighted #ff7622)

### Icons
- `public/images/icons/seller-star.svg` (reused from Dashboard)
- `public/images/icons/seller-more-vertical.svg` (extracted from Figma 610:6520)
- `public/images/icons/seller-back-arrow.svg` (extracted from Figma 610:6575)

### QA
- Design compare: 85% → 95% (v1→v4, Gemini)
- Fixes: solid star fill, horizontal more icon, tab indicator per-button positioning
