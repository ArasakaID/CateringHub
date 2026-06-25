# 💳 Pembayaran — USER_FIX

> **File Figma**: `unsaved-mqs49lag-zcqi8mlr`
> **Frame**:
>   - `610:4420` — Pembayaran (390×844px) — Base (no saved cards)
>   - `610:4520` — Pembayaran - Add Card (390×844px) — With saved cards
>   - `610:4624` — Pembayaran - Berhasil (390×844px) — Success page
> **Background**: `#ffffff` (white), cornerRadius 20
> **Status**: ✅ **Selesai — 3 state terimplementasi**

---

## 📐 3 State dalam 2 Page

| State | Trigger | Skor Gemini | Halaman |
|-------|---------|-------------|---------|
| **1. Base** | Masuk ke halaman pembayaran (default QRIS) | 9.8/10 | `Pembayaran.jsx` |
| **2. Add Card** | Pilih metode kartu (Mastercard/Visa) | 9.6/10 | `Pembayaran.jsx` |
| **3. Berhasil** | Pembayaran sukses | 9.6/10 | `PembayaranBerhasil.jsx` |

---

## Layout — State 1: Base Pembayaran

```
┌──────────────────────────────┐
│  [←]       Pembayaran        │  Top bar
│                              │
│  Metode Pembayaran           │  Label section
│  ┌──────┐ ┌──────┐ ┌──────┐ │
│  │ Tunai│ │ QRIS │ │Mstrcr│ │  Grid 3 kolom × 2 baris
│  │ 💰   │ │  QR  │ │  MC  │ │  85×72 card, bg #f0f5fa
│  └──────┘ └──────┘ └──────┘ │  rounded-[9.6px]
│  ┌──────┐ ┌──────┐ ┌──────┐ │  Gap 12px, centered
│  │ BCA  │ │Mandri│ │ BRI  │ │
│  └──────┘ └──────┘ └──────┘ │
│                              │
│  ┌──────────────────────────┐│
│  │                          ││  QR Code image 253×253
│  │      [QR CODE IMAGE]     ││  Shadow: 4px 4px 4px rgba(0,0,0,0.25)
│  │                          ││
│  └──────────────────────────┘│
│                              │
│  ┌──── CEK STATUS ─────────┐ │  Button bg #f0f5fa, text #ff7622
│  └──────────────────────────┘│  rounded-10, 327×62
│                              │
│  Total:    Rp 1.152.000      │  Total #121223, amount #181c2e
│                              │  items-baseline alignment
│  ┌──────────────────────────┐│
│  │      Bayar sekarang      ││  Button #ff7622, 327×62, rounded-12
│  └──────────────────────────┘│  text white, Sen Bold 14px
└──────────────────────────────┘
```

## Layout — State 2: + Add Card

```
┌──────────────────────────────┐
│  [←]       Pembayaran        │  Top bar (sama)
│                              │
│  Metode Pembayaran           │
│  ┌──────┐ ┌──────┐ ┌──────┐ │
│  │ Tunai│ │ QRIS │ │Mstrcr│ │  Grid (sama)
│  └──────┘ └──────┘ └──────┘ │
│  ┌──────┐ ┌──────┐ ┌──────┐ │
│  │ BCA  │ │Mandri│ │ BRI  │ │
│  └──────┘ └──────┘ └──────┘ │
│                              │
│  Kartu Tersimpan             │  Label #a0a5ba, 13px, uppercase
│                              │
│  ┌──────────────────────────┐│
│  │ Master Card          ▼   ││  Saved card — bg #f4f5f7, rounded-10
│  │ [mc] ************ 436    ││  height 82px, px-[20px]
│  └──────────────────────────┘│  Name 16px Bold, masked 16px opacity 0.5
│                              │  Arrow down #181c2e
│  ┌──────────────────────────┐│
│  │        Add New           ││  Add new card — bg white, border #f0f5fa
│  │         [+]              ││  h-[62px], flex-col centered
│  └──────────────────────────┘│  Text "Add New" #ff7622 14px Bold
│                              │  Plus icon #ff7622
│  Total:    Rp 1.152.000      │
│                              │
│  ┌──────────────────────────┐│
│  │      Bayar sekarang      ││  Button (sama)
│  └──────────────────────────┘│
└──────────────────────────────┘
```

## Layout — State 3: Berhasil

```
┌──────────────────────────────┐
│                              │
│                              │
│        [Illustrasi]         │  230×215px, object-fit contain
│       Confetti/Star          │  paddingTop: 180px
│                              │
│         Selamat!             │  24px Bold, #111a2c, lineHeight 32px
│                              │  mt-[36px]
│  Pembayaran selesai,         │
│  tinggal nunggu info         │  14px, #525c67, opacity 0.6
│  dari Catering!              │  maxWidth 195px, lineHeight 24px
│                              │  mt-[16px]
│                              │
│                              │
│                              │
│  ┌──────────────────────────┐│
│  │      LIHAT PESANAN       ││  Button 342×64px, rounded-12
│  └──────────────────────────┘│  bg #ff7622, text white 16px Bold
│                              │  uppercase, pb-[60px]
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

| Properti | Value |
|----------|-------|
| **Grid** | 3 kolom, `gridTemplateColumns: 'repeat(3, 85px)'`, gap 12px, justifyContent center |
| **Card** | 85×72px, rounded-[9.6px] |
| **Default bg** | `#f0f5fa` |
| **Selected bg** | `#ffffff` (putih) |
| **Selected border** | `2px solid #ff7622` |
| **Check icon pos** | Top-right, lingkaran 24×24 bg `#ff7622`, border putih 2px, posisi -7px/-7px |
| **Label** | Sen 14px, `#464e57` |

#### Icons per metode:
| Metode | Icon type | Detail |
|--------|-----------|--------|
| Tunai | `figma-cash-icon.png` | 28×28 |
| QRIS | `figma-qris-logo.png` | 52×20 |
| Mastercard | SVG inline | Circle merah + kuning + ellipse |
| BCA | SVG inline | Rectangle #0066ae + text BCA |
| Mandiri | SVG inline | Rectangle #004a8f + text MANDIRI |
| BRI | SVG inline | Rectangle #00529c + text BRI |

### 3. QR Code Image — `(610:4491)`

| Properti | Value |
|----------|-------|
| **Size** | 253×253px (center: x:74-327) |
| **Shadow** | `boxShadow: '4px 4px 4px rgba(0,0,0,0.25)'` |
| **Border radius** | none (0) |

### 4. CEK STATUS Button — `Group (610:4424)`

| Properti | Value |
|----------|-------|
| **Background** | `#f0f5fa` |
| **Ukuran** | 327×62px (max-width: 327px) |
| **Border radius** | 10px |
| **Text** | "CEK STATUS" — Sen Bold 14px, `#ff7622`, center |

### 5. Saved Cards (State 2 only) — `Group (610:4613)`

#### Master Card
| Properti | Value |
|----------|-------|
| **Background** | `#f4f5f7` |
| **Height** | 82px |
| **Border radius** | 10px |
| **Padding** | `px-[20px]` |
| **Card icon** | 28×18, SVG (Mastercard/Visa) |
| **Card number** | "*************" + last_four — Sen 16px, `#32343e` opacity 0.5 |
| **Card name** | `card.cardholder_name` — Sen Bold 16px, `#32343e` |
| **Arrow** | Chevron down ▼ — `#181c2e` |

#### Add New Button — `Group (610:4607)`
| Properti | Value |
|----------|-------|
| **Background** | `#ffffff` |
| **Border** | `2px solid #f0f5fa` |
| **Height** | 62px |
| **Border radius** | 10px |
| **Icon** | Plus icon `#ff7622` (silang diputar 45°) — 14×14 |
| **Text** | "Add New" — Sen Bold 14px, `#ff7622` |
| **Layout** | Flex column, text di atas, icon di bawah |

### 6. Total & Bayar Sekarang

| Elemen | Detail |
|--------|--------|
| **Label "Total:"** | Sen 16px, `#121223`, Regular, lineHeight 24px |
| **Amount** | "Rp ..." — Sen 30px, `#181c2e`, Regular, lineHeight 36px |
| **Alignment** | `items-baseline justify-between` |
| **Button "Bayar sekarang"** | 327×62, bg `#ff7622`, rounded-12, text white Sen Bold 14px uppercase |

### 7. Halaman Berhasil

| Elemen | Detail |
|--------|--------|
| **Ilustrasi** | `figma-success-illustration.png`, 230×215px, `objectFit: contain` |
| **"Selamat!"** | 24px Bold, `#111a2c`, lineHeight 32px, mt-[36px] |
| **Deskripsi** | 14px, `#525c67`, opacity 0.6, lineHeight 24px, maxWidth 195px, mt-[16px] |
| **Tombol** | 342×64px, rounded-12, bg `#ff7622`, text "LIHAT PESANAN" uppercase 16px Bold white, pb-[60px] |
| **Top padding** | 180px |
| **Auto-redirect** | 30 detik ke home |

---

## Route & Backend Plan

### Database
| Table | Status |
|-------|--------|
| `saved_cards` (user_id, card_type, last_four, cardholder_name) | ✅ Migration + Model selesai |
| `orders` — kolom `payment_method`, `payment_status`, `paid_at` | ✅ Migration selesai |

### Route
```php
Route::get('/checkout/pembayaran', [PembayaranController::class, 'index'])->name('pembayaran');
Route::post('/checkout/pembayaran/proses', [PembayaranController::class, 'proses'])->name('pembayaran.proses');
Route::get('/checkout/berhasil/{order}', [PembayaranController::class, 'sukses'])->name('pembayaran.sukses');
```
✅ Semua route terdaftar di `routes/web.php`

### PembayaranController
| Method | Fungsi | Status |
|--------|--------|--------|
| `index()` | Tampilkan payment page: order, total, paymentMethods, savedCards | ✅ |
| `proses(Request)` | Validasi + update payment_status → redirect sukses | ✅ |
| `sukses(Order)` | Tampilkan success page, cek auth + payment_status | ✅ |
| `methods()` | JSON list payment methods | ✅ |

### Page
| Page | File | Status |
|------|------|--------|
| Pembayaran | `resources/js/Pages/Pembayaran.jsx` | ✅ 338 baris |
| Pembayaran Berhasil | `resources/js/Pages/PembayaranBerhasil.jsx` | ✅ 65 baris |

---

## Milestone Implementasi

### ✅ Phase 1: Database & Backend
- [x] Buat migration `saved_cards` (user_id, card_type, last_four, cardholder_name)
- [x] Tambah kolom `payment_method` dan `payment_status` di `orders`
- [x] Buat `PembayaranController` dengan `index()`, `proses()`, `sukses()`
- [x] Tambah route `/checkout/pembayaran` dan `/checkout/berhasil/{order}` di `routes/web.php`
- [x] Pass data: `order`, `paymentMethods`, `savedCards`, `total` ke Inertia

### ✅ Phase 2: Page Layout & Top Bar
- [x] Buat `resources/js/Pages/Pembayaran.jsx`
- [x] White background `#ffffff`
- [x] Back button — `#ecf0f4` bg, 45×45
- [x] Title "Pembayaran" — Sen 17px, `#181c2e`

### ✅ Phase 3: Payment Method Grid
- [x] Grid 3 kolom metode pembayaran (CSS grid, `repeat(3, 85px)`)
- [x] Card 85×72, bg `#f0f5fa`, rounded-[9.6px]
- [x] Icon + label untuk setiap metode (6 metode: Tunai, QRIS, Mastercard, BCA, Mandiri, BRI)
- [x] Selected state: check icon top-right (-7px/-7px), orange stroke 2px
- [x] Payment method switching via state

### ✅ Phase 4: QR Code & Status
- [x] QR Code image area 253×253
- [x] Drop shadow 4px 4px 4px rgba(0,0,0,0.25)
- [x] "CEK STATUS" button — `#f0f5fa`, text `#ff7622`, rounded-10
- [x] Conditional render: QRIS → QR + CEK STATUS; Cash → info bayar ke kasir; Bank → info transfer

### ✅ Phase 5: Saved Cards (State 2)
- [x] Saved card list dari backend
- [x] Card display: masked number + last 4 digits, 2-row layout
- [x] "Add New" button — vertical layout (text above, plus icon below)
- [x] Empty state: "Belum ada kartu tersimpan"
- [x] Conditional render hanya untuk metode Mastercard/Visa

### ✅ Phase 6: Total & Bayar
- [x] Total label + amount (Sen 30px, items-baseline)
- [x] "Bayar sekarang" button — `#ff7622`, 327×62, rounded-12
- [x] Loading state ("Memproses...") saat proses pembayaran
- [x] Redirect ke Pembayaran Berhasil setelah sukses

### ✅ Phase 7: Halaman Berhasil
- [x] Ilustrasi sukses 230×215px, `objectFit: contain`
- [x] "Selamat!" title — 24px Bold, #111a2c
- [x] Deskripsi — 14px, #525c67, opacity 0.6, maxWidth 195px
- [x] Tombol "LIHAT PESANAN" — uppercase, 342×64px, rounded-12, #ff7622
- [x] Auto-redirect 30 detik ke home
- [x] Layout paddingTop 180px, pb-[60px]

### ✅ Phase 8: Validasi Visual (Gemini AI)
- [x] State Base — **9.8/10** ✅
- [x] State Add Card — **9.6/10** ✅
- [x] State Berhasil — **9.6/10** ✅

---

## Catatan Implementasi
- **White background** `#ffffff`
- **Dimensi**: 390×844px
- **Font**: Sen konsisten (Tailwind config + inline fallback)
- **3 state**: Base (QRIS default), Add Card (Mastercard/Visa), Berhasil (success)
- **Payment grid**: 3 kolom × 2 baris, fixed width cards
- **State management**: `selectedMethod` untuk tracking metode, `showSavedCards` untuk state 2
- **"No. Pesanan"** tidak ada di Figma — dihapus dari versi final untuk match Figma
- **Teks tombol "Lihat pesanan"** — Figma original sentence case, tapi visual rendering uppercase — final pakai CSS `uppercase`
- **Immutable Figma data > Gemini interpretation** — untuk detail seperti casing "Total:" dan "Lihat pesanan", Figma node data lebih authoritatif
- **Perbandingan visual menggunakan Gemini AI** (bukan ChatGPT), skor minimal 9.5/10 untuk lolos
