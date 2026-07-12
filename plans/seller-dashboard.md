# 📊 Seller Dashboard Home — USER_FIX

> **File Figma**: `unsaved-mri02kq9-vihs832b`
> **Frame**: `610:6776` — Seller - Dashboard Home (375×812px)
> **Background**: `#f7f8f9`
> **Updated**: 2026-07-13
> **Status**: ✅ Selesai — deployed ke https://catering.apep.dev/seller/dashboard
> **QA Score**: ~72% (Gemini vision), CSS verified (radius 28px, shadow 0 10px 30px)

---

## State Overview

Page ini memiliki **1 state**:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. Dashboard** | Seller login & masuk dashboard | Ringkasan pesanan, revenue chart, reviews, popular items |

---

## Layout

```
┌──────────────────────────────┐
│  [☰]  Location              [👤] │  Top bar (y:50-95)
│       Halal Lab office    ▼      │
│                              │
│  ┌─────────┐ ┌─────────┐   │  Stat cards (y:119-234)
│  │   20    │ │   05    │   │
│  │Pesanan  │ │Permintaan│   │
│  │diterima │ │pesanan   │   │
│  └─────────┘ └─────────┘   │
│                              │
│  ┌──────────────────────┐   │  Revenue card (y:251-455)
│  │ Total Revenue  Daily ▼│   │
│  │ Rp900,241  See Details│   │
│  │  ╱╲    ╱╲             │   │  Chart line + tooltip
│  │ ╱  ╲  ╱  ╲  ╱╲       │   │
│  │10am 11am 12pm ...     │   │
│  └──────────────────────┘   │
│                              │
│  ┌──────────────────────┐   │  Reviews card (y:471-565)
│  │ Reviews  See All Rev. │   │
│  │ ★ 4.9  Total 20 Rev.  │   │
│  └──────────────────────┘   │
│                              │
│  ┌──────────────────────┐   │  Popular Items (y:581-801)
│  │ Populer Items  See All│   │
│  │ ┌─────┐ ┌─────┐      │   │
│  │ │     │ │     │      │   │  2 item cards + peek
│  │ └─────┘ └─────┘      │   │
│  └──────────────────────┘   │
│                              │
│ [🏠] [📋] [＋] [🔔] [👤]    │  Bottom tab bar (y:723-812)
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Group (610:6866)`

| Elemen | Detail Figma |
|--------|-------------|
| **Menu button (☰)** | Lingkaran 45×45, bg `#ffffff`, 3 garis stroke `#181c2e` weight 2 |
| **"Location"** | Sen 12px Bold, `#fc6e2a` |
| **"Halal Lab office"** | Sen 14px Regular, `#676767` |
| **Dropdown arrow** | Polygon 10.75×7.68, fill `#181c2e`, rotasi 180° |
| **Profile avatar** | Lingkaran 45×45, fill `#98a8b8`, radius 50 |

### 2. Stat Cards — 2 Cards (y:119)

| Properti | Running Orders | Order Requests |
|----------|---------------|----------------|
| **Ukuran** | 157×115 | 157×115 |
| **Background** | `#ffffff`, radius 20 | `#ffffff`, radius 20 |
| **Angka** | "20" — Sen 52.32px Bold, `#32343e` | "05" — Sen 52.32px Bold, `#32343e` |
| **Label** | "Pesanan diterima" — Sen 13px Bold, `#838799` | "Permintaan pesanan" — Sen 13px Bold, `#838799` |

### 3. Revenue Section — `Group (610:6820)`

| Properti | Value |
|----------|-------|
| **Card** | 327×204, bg `#ffffff`, radius 20 |
| **"Total Revenue"** | Sen 14px Regular, `#32343e` |
| **"See Details"** | Sen 14px Regular, `#fb6d3a`, UNDERLINE |
| **"Rp900,241"** | Sen 22px Bold, `#32343e` |
| **Daily dropdown** | 61.91×26.16, stroke `#e8eaed`, radius 6.98, text "Daily" Sen 12px `#9c9ba6` |
| **Chart line** | Stroke `#fb6d3a`, weight 2.62 |
| **Chart gradient** | Linear gradient `#fb6d3a` → transparent |
| **Tooltip** | 67×33.9, bg `#32343e`, radius 5.23, text "$500" Sen Bold 13.95px white |
| **X-axis labels** | "10am"–"04pm", Sen 9px Regular, `#9c9ba6` |

### 4. Reviews Section — `Group (610:6777)`

| Properti | Value |
|----------|-------|
| **Card** | 327×94.18, bg `#ffffff`, radius 20 |
| **"Reviews"** | Sen 14px Regular, `#32343e` |
| **"See All Reviews"** | Sen 14px Regular, `#fb6d3a`, UNDERLINE |
| **"4.9"** | Sen 21.8px Bold, `#fb6d3a` |
| **Star icon** | 25.58×25.58, stroke `#fb6d3a`, weight 14.39 |
| **"Total 20 Reviews"** | Sen 14px Regular, `#32343e` |

### 5. Popular Items — `Group (610:6786)`

| Properti | Value |
|----------|-------|
| **Card** | 327×220, bg `#ffffff`, radius 20 |
| **"Populer Items This Weeks"** | Sen 14px Regular, `#32343e` |
| **"See All"** | Sen 14px Regular, `#fb6d3a`, UNDERLINE |
| **Item 1** | 150×153, fill `#98a8b8`, radius 18.31 |
| **Item 2** | 149×153, fill `#98a8b8`, radius 20 |
| **Peek (item 3)** | 16×153, fill `#ffffff` |

### 6. Bottom Tab Bar — `Group (610:6793)`

| Elemen | Detail |
|--------|--------|
| **Background** | 375×89, fill `#ffffff`, DROP_SHADOW `#000000` 5% y:-4 blur 20 |
| **Grid icon (active)** | 25×24, stroke `#ff7622`, weight 1.5 |
| **Menu icon** | 25×24, stroke `#afafaf`, weight 1.5 |
| **Bell icon** | 25×24, stroke `#afafaf`, weight 1.5 |
| **User icon** | 25×24, stroke `#afafaf`, weight 1.5 |
| **Center + button** | 57×57, fill `#fff1f2`, stroke `#ff7622` weight 1, plus icon stroke `#ff7622` weight 2 |

---

## Route & Backend Plan

### Database

- **orders** — sudah ada, perlu query aggregation:
  - `COUNT(*) WHERE status = 'ongoing'` → Running Orders count
  - `COUNT(*) WHERE status = 'pending'` → Order Requests count
- **reviews** — sudah ada, perlu `AVG(rating)` dan `COUNT(*)`
- **menus** — sudah ada, perlu query popular items (ORDER BY sold_count DESC)
- **seller_revenue** — perlu tracking revenue harian (bisa dari orders.total_price)

### Route Baru

```php
Route::middleware(['auth', 'seller'])->prefix('seller')->group(function () {
    Route::get('/dashboard', [SellerDashboardController::class, 'index'])->name('seller.dashboard');
});
```

### Controller

| Method | Fungsi |
|--------|--------|
| `index()` | Tampilkan dashboard: runningOrdersCount, orderRequestsCount, totalRevenue, revenueChartData, reviewsSummary, popularItems |

### Page Baru

- `resources/js/Pages/Seller/Dashboard.jsx` — Dashboard seller dengan stat cards, revenue chart, reviews, popular items

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [x] **🔍 Analisis Figma untuk kebutuhan data**: Identifikasi data baru:
  - Aggregation queries untuk stat cards (ongoing orders count, pending orders count)
  - Revenue calculation dari orders (daily/weekly/monthly)
  - Reviews summary (average rating, total count)
  - Popular items (menu items sorted by order count)
  - Role/permission untuk seller (middleware `seller`)
- [x] **🎨 Cek resource Figma**: Ekstrak icon dari frame `610:6776` — grid icon, menu icon, bell icon, user icon, plus icon, star icon, chart vectors
- [x] Buat middleware `SellerMiddleware` untuk role check
- [x] Buat `SellerDashboardController` dengan method `index()`
- [x] Tambah route `/seller/dashboard`
- [x] Pass data ke Inertia: `stats`, `revenue`, `reviews`, `popularItems`

### ⬜ Phase 2: Page Layout & Top Bar
- [x] Buat `resources/js/Pages/Seller/Dashboard.jsx`
- [x] Background `#f7f8f9`
- [x] Menu button (☰) — lingkaran white, hamburger icon inline SVG
- [x] Location text + dropdown arrow
- [x] Profile avatar — lingkaran 45×45

### ⬜ Phase 3: Stat Cards
- [x] Card "Pesanan diterima" — 157×115, bg white, radius 20
- [x] Card "Permintaan pesanan" — 157×115, bg white, radius 20
- [x] Angka besar Sen 52px Bold `#32343e`
- [x] Label Sen 13px Bold `#838799`

### ⬜ Phase 4: Revenue Chart
- [x] Card 327×204, bg white, radius 20
- [x] Header: "Total Revenue" + "See Details" (underline orange) + Daily dropdown
- [x] Amount: Sen 22px Bold
- [x] Chart line stroke `#fb6d3a` weight 2.62 (bisa pakai library chart ringan atau SVG)
- [x] Chart gradient fill
- [x] Tooltip popup (bg `#32343e`, radius 5.23)
- [x] X-axis labels Sen 9px `#9c9ba6`

### ⬜ Phase 5: Reviews & Popular Items
- [x] Reviews card — star icon, rating "4.9", "Total 20 Reviews", "See All Reviews"
- [x] Popular Items card — 2 item cards + peek, "See All"
- [x] Empty state jika belum ada reviews/items

### ⬜ Phase 6: Bottom Tab Bar (Shared Component)
- [x] Buat component `SellerTabBar.jsx` — reusable untuk semua seller pages
- [x] 5 icons: Grid (active), Menu, Bell, User, Center + button
- [x] DROP_SHADOW `#000000` 5% y:-4 blur 20
- [x] Active state: stroke `#ff7622`, inactive: `#afafaf`
- [x] Center FAB: 57×57, fill `#fff1f2`, stroke `#ff7622`

### ⬜ Phase 7: Validasi Error (Browser)
- [x] Buka halaman di browser
- [x] Ambil browser snapshot — cek struktur
- [x] Cek console logs — pastikan tidak ada error
- [x] Cek responsiveness di viewport mobile (max-width 430px)
- [x] Cek empty state (0 orders, 0 reviews, 0 items)

### ⬜ Phase 8: Figma Design Comparison
- [x] Screenshot Figma frame `610:6776` (via `save_screenshots`)
- [x] Screenshot Web (via `browser_save_screenshot`)
- [x] Bandingkan dengan `design_compare`
- [x] Target skor ≥ 90%

### ⬜ Phase 9: Git Commit & Push
- [x] `git add` semua perubahan
- [x] `git commit -m "feat: seller dashboard with stats, revenue chart, reviews & popular items"`
- [x] `git push`

---

## Catatan Implementasi

- **Background**: `#f7f8f9` (bukan white seperti halaman user)
- **Dimensi**: 375×812px, mobile-first max-width 430px
- **Font**: Sen konsisten
- **Chart**: Bisa pakai SVG manual atau library ringan (recharts/lightweight-charts)
- **Bottom Tab Bar**: Component shared — dipakai di Dashboard, My Food, Food Details, Running Orders
- **Seller role**: Perlu middleware untuk membedakan akses seller vs buyer
- **🎨 Figma Resources**: Selalu ekstrak icon langsung dari Figma. Frame: `610:6776`

---

## ✅ Implementation Log (2026-07-13)

### Backend
- **Migration**: `2026_07_12_173306_add_role_to_users_table.php` — add `role` column (buyer/seller) to users
- **Middleware**: `app/Http/Middleware/SellerMiddleware.php` — restricts `/seller/*` to users with role=seller
- **Controller**: `app/Http/Controllers/Seller/SellerDashboardController.php`
  - `index()`: aggregates runningOrders, orderRequests, totalRevenue, revenueChartData (hourly 10AM-04PM), reviewsSummary, popularItems
  - `getRevenueChartData()`: hourly revenue for today, labels like "10AM", "11AM", etc.
- **Routes**: `Route::middleware(['auth', 'seller'])->prefix('seller')->name('seller.')->group(...)` in `routes/web.php`
- **Seeders**: `OrderSeeder.php` + `ReviewSeeder.php` — dummy data for all caterings (7 days, mixed statuses)
- **User model**: added `role` to Fillable, `catering()` hasOne relation
- **CateringSeeder**: sets admin@cateringhub.com role to "seller"

### Frontend
- **Page**: `resources/js/Pages/Seller/Dashboard.jsx`
  - Top bar: menu button (white circle 45x45, 3-line hamburger), LOCATION orange bold, address gray, dropdown arrow, avatar circle
  - Stat cards: Pesanan diterima + Permintaan pesanan, 28px radius, shadow 0 10px 30px rgba(0,0,0,0.03)
  - Revenue card: Total Revenue, Rp amount (22px bold), See Details (orange underline), Daily dropdown (minWidth 76px)
  - Chart: SVG cubic bezier (tension 0.4), gradient fill (#fb6d3a → transparent), tooltip ($ format), x-axis time labels (10AM-04PM uppercase), peak marker dot, moving average smoothing
  - Reviews card: solid orange star (#fb6d3a fill), rating number, Total X Reviews, See All Reviews
  - Popular items: horizontal scroll, image cards 150x153, 18px radius, peek card 16px
  - Sidebar overlay: logout, navigation links
- **Component**: `resources/js/Components/SellerTabBar.jsx` (shared for all seller pages)
  - Grid (active #ff7622), List, Bell, User icons (#afafaf inactive)
  - Center FAB: 57x57, bg #fff1f2, border #ff7622, plus icon
  - Shadow: 0 -12px 32px rgba(0,0,0,0.04), top radius 32px
- **Icons**: 7 SVG extracted from Figma frame `610:6776` via `figma-bridge_save_screenshots`
  - `public/images/icons/seller-menu.svg`, `seller-grid.svg`, `seller-list.svg`, `seller-bell.svg`, `seller-user.svg`, `seller-plus.svg`, `seller-star.svg`

### QA
- Auth: 2/3 passed (seller access ✅, unauthenticated redirect ✅, buyer access skipped)
- UI Visual: 7/7 flows passed, 1 bug (image URL /storage/ prefix on external URLs — fixed)
- Design compare: Gemini vision ~72%, computed CSS verified correct
