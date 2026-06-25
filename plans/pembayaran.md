# 💳 Pembayaran — USER_FIX

> **File Figma**: `unsaved-mqs49lag-zcqi8mlr`
> **Frame**: 
>   - `610:4420` — Pembayaran (390×844px) — Base (no saved cards)
>   - `610:4520` — Pembayaran - Add Card (390×844px) — With saved cards
> **Background**: `#ffffff` (white), cornerRadius 20
> **Status**: 🔜 Belum diimplementasi

---

## 📐 2 State dalam 1 Page

Page Pembayaran memiliki **2 state** berdasarkan metode pembayaran:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. Base** | Masuk ke halaman pembayaran | Grid metode pembayaran + QR code + total + "Bayar sekarang" |
| **2. + Add Card** | Pilih kartu atau klik "Add New" | Sama seperti base, tapi ada section saved cards |

---

## Layout — State 1: Base Pembayaran

```
┌──────────────────────────────┐
│  [←]       Pembayaran        │  Top bar
│                              │
│  Metode Pembayaran           │  Label section
│  ┌──────┐ ┌──────┐ ┌──────┐ │
│  │ Cash │ │ QRIS │ │Visa  │ │  Grid 3×2 metode pembayaran
│  │      │ │      │ │      │ │  85×72 card, bg #f0f5fa
│  └──────┘ └──────┘ └──────┘ │  rounded-[9.6px]
│  ┌──────┐ ┌──────┐ ┌──────┐ │
│  │ BCA  │ │ BCA  │ │ BCA  │ │  (sample BCA 3× — akan diganti dengan
│  │      │ │      │ │      │ │   payment lain di real app)
│  └──────┘ └──────┘ └──────┘ │
│                              │
│  ┌──────────────────────────┐│
│  │                          ││  QR Code image 253×253
│  │      [QR CODE IMAGE]     ││  Shadow drop-shadow
│  │                          ││  (center)
│  └──────────────────────────┘│
│                              │
│  ┌──── CEK STATUS ─────────┐ │  Orange outline button "CEK STATUS"
│  └──────────────────────────┘│  bg #f0f5fa, text #ff7622, rounded-10
│                              │
│  Total:    Rp 1.152.000      │  Total label #121223, amount #181c2e
│                              │
│  ┌──────────────────────────┐│
│  │      Bayar sekarang      ││  Button #ff7622, 327×62, rounded-12
│  └──────────────────────────┘│
└──────────────────────────────┘
```

## Layout — State 2: + Add Card

```
┌──────────────────────────────┐
│  [←]       Pembayaran        │  Top bar (sama)
│                              │
│  Metode Pembayaran           │
│  ┌──────┐ ┌──────┐ ┌──────┐ │
│  │ Cash │ │ QRIS │ │Visa  │ │  Grid (sama)
│  └──────┘ └──────┘ └──────┘ │
│  ┌──────┐ ┌──────┐ ┌──────┐ │
│  │ BCA  │ │ BCA  │ │ BCA  │ │
│  └──────┘ └──────┘ └──────┘ │
│                              │
│  ┌──────────────────────────┐│
│  │ Master Card          ▸   ││  Saved card — bg #f4f5f7, rounded-10
│  │ [mc] ************ 436    ││  Card icon, masked number, last 4 digits
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │     +  Add New           ││  Add new card — bg white, stroke #f0f5fa
│  └──────────────────────────┘│  Orange plus icon, text #ff7622
│                              │
│  Total:    Rp 1.152.000      │
│                              │
│  ┌──────────────────────────┐│
│  │      bayar sekarang      ││  Button (sama)
│  └──────────────────────────┘│
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Group (610:4483)`

| Elemen | Detail Figma |
|--------|-------------|
| **Cross/Back button** | Lingkaran 45×45, bg `#ecf0f4`, arrow stroke `#181c2e` weight 2 |
| **Title "Pembayaran"** | Sen 17px, `#181c2e`, Regular |

> Tidak ada More button di halaman ini (beda dengan Pesanan)

### 2. Payment Method Grid

#### Cash (Tunai) — `Group (610:4471)` — Terpilih/Active
| Properti | Value |
|----------|-------|
| **Card** | 85×72, bg `#f0f5fa`, rounded-[9.6px] |
| **Icon** | Vector icon cash (dompet) — `#ff7622` |
| **Label** | "Tunai" — Sen 14px, `#464e57` |

#### QRIS / Mastercard — `Group (610:4492)` — Terpilih (dengan check)
| Properti | Value |
|----------|-------|
| **Card** | 85×72, bg putih, stroke `#ff7622` weight 2 |
| **Check icon** | Lingkaran `#ff7622` 24×24, stroke putih 2, check vector putih |
| **Posisi check** | Top-right corner card |
| **Label** | "QRIS" — Sen 14px, `#464e57` |

#### Visa / Mastercard — `Group (610:4508)` — Tidak terpilih
| Properti | Value |
|----------|-------|
| **Card** | 85×72, bg `#f0f5fa` |
| **Logo** | Vector Mastercard/Visa (`#eb001b` + `#f79e1b` + `#ff5f00`) |
| **Label** | "Mastercard" — Sen 14px, `#464e57` |

#### BCA — `Group (610:4455)` — Tidak terpilih
| Properti | Value |
|----------|-------|
| **Card** | 85×72, bg `#f0f5fa` |
| **Logo** | Image `bca-bank-central-asia-logo` |
| **Label** | "BCA" — Sen 14px, `#464e57` |

> **Grid layout**: 3 kolom, gap ~12px. Row 1: Cash | QRIS | Visa, Row 2: BCA | BCA | BCA (sample)

### 3. QR Code Image — `(610:4491)`

| Properti | Value |
|----------|-------|
| **Size** | 253×253px (center: x:74-327) |
| **Shadow** | Drop shadow `#000000` opacity 0.25, offset 4×4, radius 4 |
| **Position** | y:260 |

> Gambar QR adalah placeholder dari Figma — akan diganti dengan QR dinamis atau gambar statis sesuai metode pembayaran

### 4. CEK STATUS Button — `Group (610:4424)`

| Properti | Value |
|----------|-------|
| **Background** | `#f0f5fa` |
| **Stroke** | `#f0f5fa` weight 2 |
| **Ukuran** | 327×62 |
| **Border radius** | 10 |
| **Text** | "CEK STATUS" — Sen Bold 14px, `#ff7622`, center |

### 5. Saved Cards (State 2 only) — `Group (610:4613)`

#### Master Card
| Properti | Value |
|----------|-------|
| **Background** | `#f4f5f7` |
| **Ukuran** | 327×82px |
| **Border radius** | 10 |
| **Card icon** | Mastercard logo (kiri) |
| **Card number** | "************* 436" — Sen 16px, `#32343e` opacity 0.5 |
| **Card name** | "Master Card" — Sen Bold 16px, `#32343e` |
| **Arrow** | Polygon right `▶` — `#181c2e` (kanan) |

#### Add New Button — `Group (610:4607)`
| Properti | Value |
|----------|-------|
| **Background** | `#ffffff` |
| **Stroke** | `#f0f5fa` weight 2 |
| **Ukuran** | 327×62px |
| **Border radius** | 10 |
| **Icon** | Plus icon `#ff7622` (silang diputar 45°) |
| **Text** | "Add New" — Sen Bold 14px, `#ff7622` |

### 6. Total & Bayar Sekarang

| Elemen | Detail |
|--------|--------|
| **Label "Total:"** | Sen 16px, `#121223`, Regular |
| **Amount** | "Rp 1.152.000" — Sen 30px, `#181c2e`, Regular |
| **Button "Bayar sekarang"** | 327×62, bg `#ff7622`, rounded-12, text white Sen Bold 14px |

---

## Route & Backend Plan

### Database
Yang perlu:
- **Payment methods** — bisa table `payment_methods` atau enum di kode
- **Saved cards** — table `saved_cards` (user_id, card_type, last_four, cardholder_name)
- **Orders** — perlu kolom `payment_method_id`, `payment_status`, `paid_at`

### Route Baru
```php
Route::get('/checkout/pembayaran', [PembayaranController::class, 'index'])->name('pembayaran');
Route::post('/checkout/pembayaran/proses', [PembayaranController::class, 'proses'])->name('pembayaran.proses');
```

### PembayaranController
- `index()` — Tampilkan halaman pembayaran:
  - Order data (total, items)
  - Payment methods list
  - Saved cards (jika user punya)
- `proses(Request)` — Proses pembayaran:
  - Validasi payment method
  - Update status order
  - Redirect ke halaman sukses

### Page Baru
- `resources/js/Pages/Pembayaran.jsx` — Halaman pembayaran

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] Buat migration `saved_cards` (user_id, card_type, last_four, cardholder_name, encrypted_data)
- [ ] Tambah kolom `payment_method` dan `payment_status` di `orders`
- [ ] Buat `PembayaranController` dengan `index()` dan `proses()`
- [ ] Tambah route `/checkout/pembayaran` di `routes/web.php`
- [ ] Pass data: `order`, `paymentMethods`, `savedCards`, `total` ke Inertia

### ⬜ Phase 2: Page Layout & Top Bar
- [ ] Buat `resources/js/Pages/Pembayaran.jsx`
- [ ] White background `#ffffff`
- [ ] Back button — `#ecf0f4` bg
- [ ] Title "Pembayaran" — Sen 17px

### ⬜ Phase 3: Payment Method Grid
- [ ] Grid 3 kolom metode pembayaran
- [ ] Card 85×72, bg `#f0f5fa`, rounded-[9.6px]
- [ ] Icon + label untuk setiap metode
- [ ] Selected state: check icon top-right, orange stroke
- [ ] Payment method switching

### ⬜ Phase 4: QR Code & Status
- [ ] QR Code image area (placeholder)
- [ ] "CEK STATUS" button — `#f0f5fa`, text `#ff7622`
- [ ] Conditional render berdasarkan metode terpilih

### ⬜ Phase 5: Saved Cards (State 2)
- [ ] Saved card list dari backend
- [ ] Card display: masked number + last 4 digits
- [ ] "Add New" button — plus icon + text
- [ ] Add new card flow (modal atau page terpisah)

### ⬜ Phase 6: Total & Bayar
- [ ] Total label + amount (Sen 30px)
- [ ] "Bayar sekarang" button — `#ff7622`, 327×62, rounded-12
- [ ] Loading state saat proses pembayaran
- [ ] Redirect ke Pembayaran Berhasil setelah sukses

### ⬜ Phase 7: Polish
- [ ] Empty state — belum ada saved cards
- [ ] Payment method validation
- [ ] Error handling — payment failed
- [ ] Responsive grid

---

## Catatan Implementasi
- **White background** `#ffffff`
- **Dimensi**: 390×844px
- **Font**: Sen konsisten
- **2 state**: Base (tanpa saved cards) dan +Add Card (dengan saved cards)
- **Payment grid**: 3 kolom, 2 baris. Figma sample menggunakan BCA 3× di baris 2 — real app akan diisi metode yang berbeda
- **QR Code**: Posisi center (x:74 = (390-253)/2), perlu shadow drop-shadow
- **State management**: `selectedMethod` untuk tracking metode terpilih, `showSavedCards` untuk state 2
- **Button Bayar sekarang**: Sama persis dengan checkout (327×62, `#ff7622`, rounded-12)
- **Halaman ini muncul setelah checkout** — user sudah punya order ID
