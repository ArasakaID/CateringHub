# 🛒 Checkout Produk — USER_FIX

> **File Figma**: `unsaved-mqs49lag-zcqi8mlr`
> **Frame**: `610:4325` — Checkout Produk dengan Popup (390×844px)
> **Variants**: Checkout Produk (base) + Checkout Produk + Jadwal Button
> **Background**: `#131927` (dark)
> **Updated**: 2026-06-24
> **Status**: 🔜 Belum diimplementasi

---

## 📐 3 State dalam 1 Page

Page Checkout Produk memiliki **3 state** yang di-trigger oleh aksi user:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. Base** | Masuk ke halaman checkout | List item + alamat + total + tombol "Pesan Sekarang" |
| **2. + Jadwal Button** | Klik tombol jadwal/waktu | Muncul opsi pemilihan jadwal pengiriman |
| **3. + Popup Konfirmasi** | Klik "Pesan Sekarang" | Overlay popup konfirmasi pesanan + button "Place Order" |

---

## Layout — State 1: Base Checkout

```
┌──────────────────────────────┐
│  [←]   Keranjang Belanja     │  Top bar (Back opacity 0.1, EDIT Items)
│                              │
│  ┌──────────────────────────┐│
│  │ [img] Nasi Uduk        ✔││  Food 01 — Rp21.000 [- 12 +]
│  │      EXTRA SAMBAL (1x)   ││  Qty selector
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │ [img] Nasi Kebuli      ✔││  Food 02 — Rp30.000 [- 30 +]
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │ [img] Nasi Kotak       ○││  Food 03 — Rp25.000 [- 12 +]
│  └──────────────────────────┘│  (unchecked/gray circle)
│                              │
│  ┌──────────────────────────┐│
│  │                          ││  White card rounded-t-[24px]
│  │  ALAMAT PENGIRIMAN  UBAH ││
│  │  ┌────────────────────┐  ││
│  │  │ Condong Catur,...  │  ││  Address field bg #f0f5fa
│  │  └────────────────────┘  ││
│  │                          ││
│  │  Total: Rp 1.152.000     ││
│  │  *harga sudah termasuk   ││
│  │  pajak               >   ││  breakdown link
│  │                          ││
│  │  ┌────────────────────┐  ││
│  │  │   Pesan Sekarang    │  ││  Button #ff7622, 341×67, radius 12
│  │  └────────────────────┘  ││
│  └──────────────────────────┘│
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Group (610:4374)`
| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran 45×45, putih opacity 0.1, arrow stroke putih weight 2 |
| **Title "Keranjang Belanja"** | Sen 17px, `#ffffff`, center |
| **"EDIT Items"** | Sen 14px, `#ff7622`, text-decoration underline, posisi kanan |

### 2. Food Items — 3 Item (y:119, 273, 427)

#### Food 01 — `Group (610:4326)` — Nasi Uduk
| Properti | Value |
|----------|-------|
| Ukuran | 327×117 |
| **Image** | 136×117, `border-radius: 25`, shadow `#f88222` 0 12px 30px, fill IMAGE dari DB |
| **Nama** | "Nasi Uduk" — Sen 18px, `#ffffff`, fill putih |
| **Varian** | "EXTRA SAMBAL (1x)" — Sen 12px, putih opacity 0.5 |
| **Harga** | "Rp 21.000" — Sen Bold 20px, `#ffffff` |
| **Qty selector** | Minus `◀` — angka "12" — Plus `▶` — Sen Bold 16px, putih |
| **Check icon** | Lingkaran `#059c6a` 27×27, icon check putih (untuk item dipilih) |

#### Food 02 — `Group (610:4342)` — Nasi Kebuli
| Elemen | Detail |
|--------|--------|
| Nama | "Nasi kebuli" — Sen 18px |
| Varian | "EXTRA SAMBAL (1x)" |
| Harga | "Rp 30.000" |
| Qty | 30 |
| Check | ✅ Hijau `#059c6a` |

#### Food 03 — `Group (610:4358)` — Nasi Kotak
| Elemen | Detail |
|--------|--------|
| Nama | "Nasi Kotak" — Sen 18px |
| Varian | "EXTRA SAMBAL (1x)" |
| Harga | "Rp 25.000" |
| Qty | 12 |
| Check | ○ Abu-abu `#999999` (tidak dipilih) |

### 3. Bottom Sheet Info — `Group (610:4396)`
White card `#ffffff`, `rounded-t-[24px]`, ukuran 391×336

#### 3a. Alamat Pengiriman
| Elemen | Detail |
|--------|--------|
| **Label "ALAMAT PENGIRIMAN"** | Sen 14px, `#a0a5ba` |
| **"UBAH" link** | Sen 14px, `#ff7622`, underline, posisi kanan |
| **Address field** | 341×67, bg `#f0f5fa`, `border-radius: 10` |
| **Address text** | "Condong Catur, Sleman Regency" — Sen 16px, `#32343e` opacity 0.5 |

#### 3b. Total & Breakdown
| Elemen | Detail |
|--------|--------|
| **Label "Total:"** | Sen 14px, `#121223` |
| **Nilai total** | "Rp 1.152.000" — Sen 24px, `#181c2e` |
| **"breakdown" link** | Sen 14px, `#ff7622`, dengan arrow `▶` di kanan |
| **Tax note** | "*harga sudah termasuk pajak" — Sen 10px, `#a0a5ba` |

#### 3c. Button Pesan Sekarang
| Properti | Value |
|----------|-------|
| Background | `#ff7622` |
| Ukuran | 341×67 (atau 327×62 konsisten dengan page lain) |
| Border radius | 12 |
| Text | "Pesan Sekarang" — Sen Bold 14px, `#ffffff` |
| Posisi | Bottom sheet, di bagian paling bawah |

---

## State 2: + Jadwal Button

> **Frame**: Belum diambil dari Figma (berada di sisi frame ini)

Pada state ini, ada **tombol/opsi jadwal** yang muncul — kemungkinan:

| Elemen | Deskripsi |
|--------|-----------|
| **Tombol Jadwal** | Pilihan waktu pengiriman (ex: "Hari ini", "Besok", "Jadwalkan") |
| **Trigger** | Mungkin sebagai pengganti atau tambahan sebelum tombol "Pesan Sekarang" |
| **Integrasi** | Klik jadwal → pilih tanggal → baru bisa klik "Pesan Sekarang" |

> **Integrasi dengan page**: Saat user memilih jadwal, state berubah dari Base → Jadwal Button aktif → memunculkan date picker/time slot.

---

## State 3: + Popup Konfirmasi — `Frame (610:4325)`

> **Saat user klik "Pesan Sekarang" → Popup overlay muncul di atas State 1**

| Perubahan | Detail |
|-----------|--------|
| **Background** | Tetap `#131927` (tidak berubah) |
| **Food items** | Tidak berubah — masih terlihat di belakang |
| **Bottom sheet** | Ada **dua varian Info** dalam satu frame: |
| | Info (610:4380) — "Place ORder", "breakdown" link, total Rp 2.184.000 ✅ |
| | Info (610:4396) — "Pesan Sekarang", total Rp 1.152.000 (state base) |
| **Popup overlay** | Di Figma: 2 Info group overlap — satu untuk base, satu untuk popup state |

Perbedaan popup vs base:
| Elemen | Base | Popup |
|--------|------|-------|
| Text button | "Pesan Sekarang" | "Place Order" (atau teks berbeda) |
| Total | Rp 1.152.000 | Rp 2.184.000 (mungkin termasuk ongkir) |
| breakdown link | Ada | Ada |

---

## Ringkasan Node

| Tipe | Jumlah |
|------|--------|
| 🖼️ FRAME | 1 (Checkout Produk) |
| 📦 GROUP | 10+ (Top, 3× Food, 2× Info, Checks, Qty selectors) |
| 📝 TEXT | 10+ (Title, 3× nama, 3× varian, 3× harga, alamat, total, breakdown, button) |
| 🟪 RECTANGLE/VECTOR | 5+ (Image, address field, button, card bg) |
| 🔷 ELLIPSE | 5+ (Back, 3× check circle, qty buttons) |
| **Total** | **~40+ node** |

---

## Route & Backend Plan

### Database
Yang perlu:
- **Cart/Order session** — belum ada di DB. Perlu:
  - Tabel `cart_items` (user_id, menu_id, quantity, options JSON, catering_id) — untuk menyimpan keranjang sementara
  - Atau pakai `orders` dengan `status = 'draft'`
- **Order_items** — sudah ada tabelnya
- **User addresses** — perlu kolom `address` di users atau tabel alamat terpisah

### Route Baru
```php
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
Route::post('/checkout/place-order', [CheckoutController::class, 'placeOrder'])->name('checkout.place');
```

### CheckoutController
- `index()` — Tampilkan halaman checkout dengan data:
  - Cart items dari session/DB
  - Total harga
  - Alamat user (dari user/login)
- `placeOrder(Request)` — Proses pemesanan:
  - Simpan order ke tabel `orders`
  - Simpan order_items
  - Kurangi stok? (jika ada)
  - Redirect ke halaman sukses/order detail

### Page Baru
- `resources/js/Pages/Checkout.jsx` — Halaman Checkout (1 page, 3 state)

---

## Milestone Implementasi

### Phase 1: Database & Backend
- [ ] **Cart system**: Buat mekanisme cart (session-based untuk guest, DB untuk user login)
- [ ] Tabel `cart_items` atau mekanisme cart sementara
- [ ] Buat `CheckoutController` dengan `index()` dan `placeOrder()`
- [ ] Tambah route `/checkout` dan `/checkout/place-order` di `routes/web.php`
- [ ] Pass data: `cartItems`, `total`, `userAddress`
- [ ] **Order flow**: Simpan order ke DB saat place order

### Phase 2: Page Layout & Top Bar
- [ ] Buat `resources/js/Pages/Checkout.jsx`
- [ ] Dark background `#131927` (sama seperti halaman auth)
- [ ] Back button — lingkaran putih opacity 0.1, arrow putih
- [ ] Title "Keranjang Belanja" — Sen 17px, putih
- [ ] "EDIT Items" link — `#ff7622`, underline, klik → kembali ke detail produk

### Phase 3: Food Items List
- [ ] 3 food item cards (dynamic dari cart items, bukan hardcode)
- [ ] Image 136×117, `rounded-[25px]`, shadow `#f88222`
- [ ] Nama item — Sen 18px, putih
- [ ] Varian/options — "EXTRA SAMBAL (1x)" — Sen 12px, putih opacity 0.5
- [ ] Harga — Sen Bold 20px, putih
- [ ] Qty selector: minus button | angka | plus button
- [ ] Check icon: hijau `#059c6a` (selected) / abu `#999999` (unselected)
- [ ] Toggle check — user bisa pilih/deselect item

### Phase 4: Bottom Sheet Info
- [ ] White card — `rounded-t-[24px]`
- [ ] "ALAMAT PENGIRIMAN" label + "UBAH" link
- [ ] Address field — bg `#f0f5fa`, `rounded-[10px]`, 341×67
- [ ] "Total:" label + total harga — Sen 24px
- [ ] "*harga sudah termasuk pajak" — Sen 10px, `#a0a5ba`
- [ ] "breakdown" link + arrow (toggle detail harga)
- [ ] breakdown detail: subtotal, ongkir, pajak (expandable)

### Phase 5: State 2 — Jadwal Button
- [ ] Opsi jadwal pengiriman (hari/tanggal)
- [ ] Date picker atau time slot selector
- [ ] State: visible saat user memilih jadwal
- [ ] Validasi: jadwal wajib diisi sebelum place order

### Phase 6: State 3 — Popup Konfirmasi
- [ ] Overlay saat klik "Pesan Sekarang"
- [ ] Popup konfirmasi detail pesanan
- [ ] Total akhir (termasuk ongkir)
- [ ] Button "Place Order" — `#ff7622`
- [ ] Tombol batal/tutup popup
- [ ] Animasi transisi (fade/scale)

### Phase 7: Integrasi & Polish
- [ ] Hitung total otomatis (qty × price)
- [ ] Update qty dari halaman checkout
- [ ] Pilih/deselect item dengan check
- [ ] Ubah alamat navigasi ke halaman alamat
- [ ] Loading state saat place order
- [ ] Sukses page / redirect setelah order
- [ ] Error handling (alamat kosong, cart kosong, dll)
- [ ] Tax calculation (PPN dll)

### Phase 8: Figma Design Comparison
- [ ] Screenshot Figma (via `save_screenshots` Figma MCP — frame `610:4325`)
- [ ] Screenshot Web (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Catat skor kesamaan — target minimal **90%**
- [ ] Perbaiki semua perbedaan Figma vs Web hingga ≥ 90%

### Phase 9: Git Commit & Push
- [ ] `git add` semua perubahan
- [ ] `git commit` dengan pesan deskriptif (contoh: "feat: checkout page dengan cart system dan place order")
- [ ] `git push` ke remote repository

---

## Catatan Implementasi
- **Dark background** `#131927` (sama seperti Login, Sign Up, Forgot Password)
- White card bottom sheet mulai dari y:508 dengan `rounded-t-[24px]`
- Digabung jadi **1 page** dengan 3 state berbeda (base / +jadwal / +popup)
- State management: useState untuk `showJadwal`, `showPopup`
- Item check hijau `#059c6a` — warna berbeda dari palette utama (bukan orange)
- Shadow di gambar food: `#f88222` (shadow oranye, berbeda dari card shadow biasa)
- Font: Sen (semua weight) konsisten
- Mobile-first max-width 430px
- Link ke halaman [Detail Produk](detail-produk.md) — dari "EDIT Items" kembali ke product
