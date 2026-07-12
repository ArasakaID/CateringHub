# 📦 Seller Running Orders — USER_FIX

> **File Figma**: `unsaved-mri02kq9-vihs832b`
> **Frame**: `610:6604` — Seller - Running Orders (375×812px)
> **Background**: `#f7f8f9`
> **Updated**: 2026-07-13
> **Status**: 🔜 Belum diimplementasi

---

## State Overview

Page ini memiliki **2 state**:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. Dashboard View** | Page load | Sama seperti Dashboard Home — stat cards, revenue, reviews, popular items |
| **2. Order List Overlay** | Tap Running Orders card / tap Bell | Bottom sheet overlay dengan daftar pesanan berjalan |

---

## Layout

### State 1: Dashboard View (sama dengan Dashboard Home)

```
┌──────────────────────────────┐
│  [☰]  Location              [👤] │
│       Halal Lab office    ▼      │
│  ┌─────────┐ ┌─────────┐   │
│  │   20    │ │   05    │   │
│  │Running  │ │Order    │   │
│  │Orders   │ │Request  │   │
│  └─────────┘ └─────────┘   │
│  ┌──────────────────────┐   │
│  │ Total Revenue $2,241  │   │
│  │  (chart)              │   │
│  └──────────────────────┘   │
│  ┌──────────────────────┐   │
│  │ Reviews  ★ 4.9        │   │
│  └──────────────────────┘   │
│  ┌──────────────────────┐   │
│  │ Populer Items         │   │
│  └──────────────────────┘   │
│ [🏠] [📋] [＋] [🔔] [👤]    │
└──────────────────────────────┘
```

### State 2: Order List Overlay

```
┌──────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  Dark overlay #273f55
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░┌──────────────────────┐░░░│
│░░│      ──── (handle)   │░░░│  Drag handle 60×6, #c1c8d2
│░░│ 20 Running Orders    │░░░│  Sen 17px #181c2e
│░░│                      │░░░│
│░░│ ┌──────┐ Chicken...  │░░░│  Food 1 (y:258)
│░░│ │██████│ #Breakfast  │░░░│  Image #ff7622 (first item)
│░░│ │      │ #32053      │░░░│  [Done] [Cancel]
│░░│ └──────┘    $60      │░░░│
│░░│                      │░░░│
│░░│ ┌──────┐ Chicken B.  │░░░│  Food 2 (y:381)
│░░│ │      │ #Breakfast  │░░░│
│░░│ │      │ #15253      │░░░│
│░░│ └──────┘    $30      │░░░│
│░░│                      │░░░│
│░░│ ┌──────┐ Vegetarian  │░░░│  Food 3 (y:504)
│░░│ │      │ ...         │░░░│
│░░│ └──────┘    $35      │░░░│
│░░│                      │░░░│
│░░│ ┌──────┐ Turkey B.   │░░░│  Food 4 (y:627)
│░░│ │      │ ...         │░░░│
│░░│ └──────┘    $45      │░░░│
│░░│                      │░░░│
│░░│ ┌──────┐ Veggie B.   │░░░│  Food 5 (y:750)
│░░│ │      │ ...         │░░░│
│░░│ └──────┘    $55      │░░░│
│░░└──────────────────────┘░░░│
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Dashboard View

Sama persis dengan Dashboard Home (`610:6776`) — lihat plan `seller-dashboard.md`. Perbedaan minor:
- Stat card labels: "Running Orders" dan "Order Request" (bukan "Pesanan diterima" / "Permintaan pesanan")
- Revenue amount: "$2,241" (bukan "Rp900,241")

### 2. Order List Overlay — `Group (610:6707)`

| Properti | Value |
|----------|-------|
| **Background overlay** | 375×812, fill `#273f55` |
| **Sheet** | 375×659, fill `#ffffff`, radius 25, y:172 |
| **Drag handle** | 60×6, fill `#c1c8d2`, radius 25, centered x:157 y:188 |
| **"20 Running Orders"** | Sen 17px Regular, `#181c2e`, x:24 y:212 |

### 3. Order Cards — 5 Items (masing-masing 327×103)

| Properti | Value |
|----------|-------|
| **Image** | 102×102, radius 20 |
| **Tag** | "#Breakfast" — Sen 14px Regular, `#ed7a63` |
| **Food name** | Sen 14px Bold, `#32343e` |
| **Order ID** | Sen 14px Regular, `#9c9ba6` (e.g. "#32053") |
| **Price** | Sen 18px Regular, `#32343e` |
| **Done button** | 61×36, fill `#ff7622`, radius 9, text "Done" Sen 14px `#ffffff` |
| **Cancel button** | 70×36, outline (no fill), radius 9, text "Cancel" Sen 14px `#ff3326` |

**Food items:**

| # | Name | ID | Price | Image |
|---|------|----|-------|-------|
| 1 | Chicken Thai Biriyani | #32053 | $60 | `#ff7622` |
| 2 | Chicken Bhuna | #15253 | $30 | `#98a8b8` |
| 3 | Vegetarian Poutine | #21200 | $35 | `#98a8b8` |
| 4 | Turkey Bacon Strips | #53241 | $45 | `#98a8b8` |
| 5 | Veggie Burrito. | #58464 | $55 | `#98a8b8` |

---

## Route & Backend Plan

### Database

- **orders** — sudah ada, query `status = 'ongoing'` milik seller
- **order_items** — detail item per order
- **menus** — relasi untuk nama menu dan gambar

### Route Baru

```php
Route::middleware(['auth', 'seller'])->prefix('seller')->group(function () {
    Route::get('/running-orders', [SellerOrderController::class, 'index'])->name('seller.running-orders');
    Route::post('/orders/{order}/done', [SellerOrderController::class, 'markDone'])->name('seller.orders.done');
    Route::post('/orders/{order}/cancel', [SellerOrderController::class, 'cancel'])->name('seller.orders.cancel');
});
```

### Controller

| Method | Fungsi |
|--------|--------|
| `index()` | Tampilkan running orders (overlay) + dashboard data |
| `markDone(Order $order)` | Update status order jadi 'completed' |
| `cancel(Order $order)` | Update status order jadi 'cancelled' |

### Page Baru

- `resources/js/Pages/Seller/RunningOrders.jsx` — Dashboard + order list overlay

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma**: Order data untuk seller — filter orders milik seller, status ongoing
- [ ] **🎨 Cek resource Figma**: Ekstrak icon dan visual dari frame `610:6604`
- [ ] Buat `SellerOrderController`
- [ ] Tambah route `/seller/running-orders`, `POST /seller/orders/{id}/done`, `POST /seller/orders/{id}/cancel`
- [ ] Query: orders milik seller dengan status ongoing, eager load orderItems + menus
- [ ] Pass data: `dashboardStats`, `runningOrders`

### ⬜ Phase 2: Dashboard View
- [ ] Buat `resources/js/Pages/Seller/RunningOrders.jsx`
- [ ] Reuse dashboard layout (stat cards, revenue, reviews, popular items)
- [ ] Background `#f7f8f9`
- [ ] Bottom Tab Bar (shared component)

### ⬜ Phase 3: Order List Overlay
- [ ] Dark overlay `#273f55` — toggle dengan state
- [ ] Bottom sheet 375×659, bg white, radius 25
- [ ] Drag handle 60×6, `#c1c8d2`, radius 25
- [ ] Header "X Running Orders" — Sen 17px `#181c2e`
- [ ] Swipe-to-close gesture (optional)

### ⬜ Phase 4: Order Cards
- [ ] List rendering dari `runningOrders`
- [ ] Image 102×102, radius 20
- [ ] Tag "#Breakfast" — Sen 14px `#ed7a63`
- [ ] Food name — Sen 14px Bold `#32343e`
- [ ] Order ID — Sen 14px `#9c9ba6`
- [ ] Price — Sen 18px `#32343e`
- [ ] Done button — 61×36, fill `#ff7622`, radius 9, text white
- [ ] Cancel button — 70×36, outline, radius 9, text `#ff3326`

### ⬜ Phase 5: Actions
- [ ] Done → konfirmasi → `POST /seller/orders/{id}/done` → refresh list
- [ ] Cancel → konfirmasi dialog → `POST /seller/orders/{id}/cancel` → refresh list
- [ ] Close overlay → tap outside / swipe down
- [ ] Empty state jika tidak ada running orders

### ⬜ Phase 6: Validasi Error (Browser)
- [ ] Buka halaman di browser
- [ ] Cek console logs
- [ ] Cek responsiveness
- [ ] Test overlay open/close
- [ ] Test Done & Cancel actions
- [ ] Cek scroll di dalam overlay (5+ orders)

### ⬜ Phase 7: Figma Design Comparison
- [ ] Screenshot Figma frame `610:6604` (state overlay terbuka)
- [ ] Screenshot Web (overlay terbuka)
- [ ] Bandingkan — target ≥ 90%

### ⬜ Phase 8: Git Commit & Push
- [ ] `git commit -m "feat: seller running orders with bottom sheet overlay & order actions"`
- [ ] `git push`

---

## Catatan Implementasi

- **Overlay** menggunakan dark background `#273f55` di belakang bottom sheet
- **Bottom sheet** bisa diimplementasi sebagai modal/slide-up panel
- **Drag handle** visual indicator bahwa sheet bisa di-drag
- **First item** image color `#ff7622` (highlight), sisanya `#98a8b8` (placeholder)
- **Done button** hijau/orange — menandakan order selesai
- **Cancel button** text merah `#ff3326` — visual warning
- **Order ID** ditampilkan dengan prefix "#"
- **🎨 Figma Resources**: Ekstrak visual dari frame `610:6604`
