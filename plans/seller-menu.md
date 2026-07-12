# 📋 Seller Menu (My Profile) — USER_FIX

> **File Figma**: `unsaved-mri02kq9-vihs832b`
> **Frame**: `610:6168` — Seller - Menu (375×812px)
> **Background**: `#ffffff`
> **Updated**: 2026-07-13
> **Status**: 🔜 Belum diimplementasi

---

## State Overview

Page ini memiliki **1 state**:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. My Profile** | Tap icon User di bottom tab bar | Halaman profil seller dengan balance, menu settings, dan logout |

---

## Layout

```
┌──────────────────────────────┐
│  ████████████████████████████│  Orange header (0-271px)
│  [←]      My Profile         │  Top bar (y:50-95)
│                              │
│       Available Balance      │  y:119
│       $500.00                │  y:139, Sen 40px Bold
│                              │
│       [──Withdraw──]         │  y:204, outline white
│  ████████████████████████████│
│                              │
│  ┌──────────────────────┐   │  Card 1 (y:296-437)
│  │ 👤 Personal Info    > │   │  bg #f6f6f6, radius 15
│  │ ⚙️ Settings         > │   │
│  └──────────────────────┘   │
│                              │
│  ┌──────────────────────┐   │  Card 2 (y:452-593)
│  │ 💰 Withdrawal Hist. > │   │  bg #f6f6f6, radius 15
│  │ 📋 Number of Orders 29K│   │
│  └──────────────────────┘   │
│                              │
│  ┌──────────────────────┐   │  Card 3 (y:608-686)
│  │ ⭐ User Reviews     > │   │  bg #f6f6f6, radius 15
│  └──────────────────────┘   │
│                              │
│  ┌──────────────────────┐   │  Card 4 (y:701-779)
│  │ 🚪 Log Out          > │   │  bg #f6f6f6, radius 15
│  └──────────────────────┘   │
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Orange Header — `Rectangle 1544 (610:6169)`

| Properti | Value |
|----------|-------|
| **Ukuran** | 375×271 |
| **Fill** | `#ff7622` |
| **Corner radius** | 25px |

### 2. Top Bar — `Group (610:6176)`

| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran 45×45, bg `#ffffff`, arrow stroke `#181c2e` weight 2 |
| **"My Profile"** | Sen 17px Regular, `#ffffff` |

### 3. Balance Section

| Elemen | Detail |
|--------|--------|
| **"Available Balance"** | Sen 16px Regular, `#ffffff`, x:114 y:119 |
| **"$500.00"** | Sen 40px Bold, `#ffffff`, x:114 y:139 |
| **"Withdraw" button** | 100×37, outline `#ffffff` stroke 1, radius 10, text Sen 14px Regular white |

### 4. Menu Cards

#### Card 1 — Personal Info & Settings `(610:6181)` — y:296, 327×141

| Row | Icon | Label | Icon Color |
|-----|------|-------|------------|
| Personal Info | User (head+body) 24×24 | Sen 15px Regular `#333333` | `#fb6f3d` |
| Settings | Gear 24×24 | Sen 15px Regular `#333333` | `#413dfb` |

- Background: `#f6f6f6`, radius 15
- Icon circle: 48×48, fill `#ffffff`
- Chevron right: 30×30, stroke `#747783` weight 1.5

#### Card 2 — Withdrawal History & Orders `(610:6240)` — y:452, 327×141

| Row | Icon | Label | Value | Icon Color |
|-----|------|-------|-------|------------|
| Withdrawal History | Withdrawal 24×24 | Sen 15px `#333333` | — | `#ff7622` (solid fill) |
| Number of Orders | Receipt 24×24 | Sen 15px `#333333` | "29K" Sen 17px Bold `#9c9ba6` | `#18cfe8` |

#### Card 3 — User Reviews `(610:6223)` — y:608, 327×78

| Row | Icon | Label | Icon Color |
|-----|------|-------|------------|
| User Reviews | Command 24×24 | Sen 15px `#333333` | `#2ae1e1` |

#### Card 4 — Log Out `(610:6205)` — y:701, 327×78

| Row | Icon | Label | Icon Color |
|-----|------|-------|------------|
| Log Out | Download/Logout 24×24 | Sen 15px `#333333` | `#d20f0f` (red) |

---

## Route & Backend Plan

### Database

- **users** — perlu kolom `balance` (decimal) untuk seller
- **withdrawals** — tabel baru untuk history penarikan dana

### Route Baru

```php
Route::middleware(['auth', 'seller'])->prefix('seller')->group(function () {
    Route::get('/profile', [SellerProfileController::class, 'index'])->name('seller.profile');
    Route::get('/withdrawals', [SellerProfileController::class, 'withdrawals'])->name('seller.withdrawals');
});
```

### Controller

| Method | Fungsi |
|--------|--------|
| `index()` | Tampilkan profil seller: balance, order count, menu items |
| `withdrawals()` | Tampilkan history penarikan |

### Page Baru

- `resources/js/Pages/Seller/Profile.jsx` — Halaman profil seller

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma**: Kolom `balance` di users, tabel `withdrawals`
- [ ] **🎨 Cek resource Figma**: Ekstrak semua icon dari frame `610:6168` — user, gear, withdrawal, receipt, command, logout icons
- [ ] Migration: tambah kolom `balance` ke `users`
- [ ] Migration: buat tabel `withdrawals` (id, user_id, amount, status, created_at)
- [ ] Buat `SellerProfileController`
- [ ] Tambah route `/seller/profile`
- [ ] Pass data: `balance`, `orderCount`, `user`

### ⬜ Phase 2: Orange Header & Balance
- [ ] Buat `resources/js/Pages/Seller/Profile.jsx`
- [ ] Orange header 375×271, fill `#ff7622`, radius 25
- [ ] Back button — lingkaran white, arrow `#181c2e`
- [ ] "My Profile" — Sen 17px white
- [ ] "Available Balance" — Sen 16px white
- [ ] Balance amount — Sen 40px Bold white
- [ ] Withdraw button — outline white, radius 10

### ⬜ Phase 3: Menu Cards
- [ ] Card 1: Personal Info + Settings (2 rows, 141px)
- [ ] Card 2: Withdrawal History + Number of Orders (2 rows, 141px)
- [ ] Card 3: User Reviews (1 row, 78px)
- [ ] Card 4: Log Out (1 row, 78px)
- [ ] Semua card: bg `#f6f6f6`, radius 15, icon circle 48×48 white
- [ ] Chevron right di setiap row (kecuali Number of Orders yang menampilkan value)

### ⬜ Phase 4: Actions & Navigation
- [ ] Personal Info → navigasi ke Edit Profile seller
- [ ] Settings → navigasi ke Settings page
- [ ] Withdrawal History → navigasi ke halaman withdrawals
- [ ] Number of Orders → navigasi ke Running Orders
- [ ] User Reviews → navigasi ke halaman reviews
- [ ] Log Out → konfirmasi dialog, lalu `POST /logout`

### ⬜ Phase 5: Validasi Error (Browser)
- [ ] Buka halaman di browser
- [ ] Cek console logs
- [ ] Cek responsiveness
- [ ] Cek semua navigasi berfungsi

### ⬜ Phase 6: Figma Design Comparison
- [ ] Screenshot Figma frame `610:6168`
- [ ] Screenshot Web
- [ ] Bandingkan — target ≥ 90%

### ⬜ Phase 7: Git Commit & Push
- [ ] `git commit -m "feat: seller profile page with balance, menu settings & logout"`
- [ ] `git push`

---

## Catatan Implementasi

- **Orange header** `#ff7622` full-width 271px tinggi, radius 25px top only
- **Balance** ditampilkan dari kolom `balance` di users
- **Menu cards** semua bg `#f6f6f6`, radius 15, spacing 15px antar card
- **Icon colors** berbeda per menu: orange, purple, cyan, teal, red
- **Log Out** icon merah `#d20f0f` — visual warning
- **🎨 Figma Resources**: Ekstrak icon dari frame `610:6168`
