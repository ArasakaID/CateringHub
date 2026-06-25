# 📜 Pesanan — History (USER_FIX)

> **File Figma**: `unsaved-mqs49lag-zcqi8mlr`
> **Frame**: `610:3978` — Pesanan - History (375×844px)
> **Background**: `#ffffff` (white), cornerRadius 20
> **Status**: 🔜 Belum diimplementasi

---

## 📐 1 Page, 2 Tab State

Page Pesanan memiliki **2 tab** yang bisa dipilih user:

| Tab | Status | Deskripsi |
|-----|--------|-----------|
| **Ongoing** | Inaktif (warna abu `#a5a7b9`) | Daftar pesanan berlangsung |
| **History** | Aktif (warna `#fb6d3a`/`#ff7622`) | Daftar riwayat pesanan selesai |

> **Catatan**: Halaman History (`610:3978`) dan Berlangsung (`610:4056`) adalah **2 frame terpisah** di Figma, bukan 1 page dengan toggle. Bisa diimplementasi sebagai 1 page dengan tab switching.

---

## Layout

```
┌──────────────────────────────┐
│  [←]        My Orders   [⋮] │  Top bar (y:50-95)
│                              │
│       Ongoing     History    │  Tab bar (y:119-152)
│       ─────────────────────  │  Indicator #ff7622 di History
│                              │
│  Harian              ✅      │  Food 01 (y:184-369)
│  ┌──────┐ Catering Wowo     │
│  │  ██  │ #162432           │  image 60×60, rounded-8
│  │  ██  │ Rp 504,000 | 29 Jan, 12:30 • 90 Items
│  └──────┘                   │
│  [──Rate──]  [──Re-Order──] │  Rate: outline #ff7622, Re-Order: filled #ff7622
│                              │
│  ─────────────────────────── │  Line separator #eef2f6
│                              │
│  Snack              ✅      │  Food 02 (y:369-537)
│  ┌──────┐ Catering Ibu Jum. │
│  │  ██  │ #162432           │
│  │  ██  │ Rp 2.184.000 | • 100 Items
│  └──────┘                   │
│  [──Rate──]  [──Re-Order──] │
│                              │
│  ─────────────────────────── │
│                              │
│  Drink           ❌ Canceled │  Food 03 (y:574-774)
│  ┌──────┐ Catering Simbok   │
│  │  ██  │ #240112           │  Canceled text #ff0000
│  │  ██  │ Rp 300,000 | 30 Jan, 12:30 • 55 Items
│  └──────┘                   │
│  [──Rate──]  [──Re-Order──] │
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Group (610:4044)`

| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran 45×45, bg `#ecf0f4`, arrow stroke `#181c2e` weight 2 |
| **Title "My Orders"** | Sen 17px, `#181c2e`, Regular |
| **More (⋮)** | Lingkaran 45×45, bg `#ecf0f4`, 3 titik stroke `#181c2e` weight 2 |

### 2. Tab Bar — `Group (610:4039)`

| Elemen | Detail |
|--------|--------|
| **"Ongoing"** | Sen 14px, `#a5a7b9`, Regular — posisi kiri |
| **"History"** | Sen 14px, `#fb6d3a`, Bold — posisi kanan |
| **Line 4** | Full width line `#ced7df` opacity 0.5, y:152 |
| **Line 5** | Active indicator `#ff7622` weight 2, width ~146px, y:152 |

### 3. Food Items — 3 Item

Setiap item memiliki struktur yang sama:

#### Food 01 — `Group (610:4019)` — Completed (Harian ✅)
| Properti | Value |
|----------|-------|
| **Category label** | "Harian" — Sen 14px, `#181c2e`, Regular |
| **Status badge** | "Completed" — Sen 14px, `#059c6a` (hijau), Bold |
| **Image** | 60×60, `#98a8b8` placeholder, `rounded-[8px]` |
| **Nama** | "Catering Wowo" — Sen 14px, `#181c2e`, Bold |
| **Order #** | "#162432" — Sen 14px, `#6b6e82`, underline, kanan |
| **Harga** | "Rp 504,000" — Sen 14px, `#181c2e`, Bold |
| **Separator** | Line vertikal `#caccda` |
| **Tanggal** | "29 Jan, 12:30" — Sen 12px, `#6b6e82` |
| **Items count** | "90 Items" — Sen 12px, `#6b6e82` |
| **Dot** | Ellipse 4×4, `#6b6e82` (pemisah tanggal & items) |
| **Button Rate** | 139×39, outline `#ff7622` stroke 1, text "Rate" — `#ff7622`, Sen Bold 12px, rounded-8 |
| **Button Re-Order** | 139×39, filled `#ff7622`, text "Re-Order" — white, Sen Bold 12px, rounded-8 |

#### Food 02 — `Group (735:253)` — Tidak ada status (No badge)

| Elemen | Detail |
|--------|--------|
| **Category** | "Snack" — Sen 14px |
| **Image** | 60×60, `#98a8b8` placeholder |
| **Nama** | "Catering Ibu Jumilah" — Sen 14px |
| **Order #** | "#162432" |
| **Harga** | "Rp 2.184.000" |
| **Items** | "100 Items" |
| **Button Rate** | Sama seperti Food 01 |
| **Button Track** | "Track Order" — filled #ff7622 (kiri) |
| **Button Cancel** | "Cancel" — outline #ff7622 (kanan) |

> **Note**: Food 02 memiliki button "Track Order" + "Cancel" bukan "Rate" + "Re-Order". Ini mungkin pesanan yang masih bisa dilacak/dibatalkan meski di tab History.

#### Food 03 — `Group (610:3979)` — Canceled (Drink ❌)

| Elemen | Detail |
|--------|--------|
| **Category** | "Drink" — Sen 14px |
| **Status badge** | "Canceled" — Sen 14px, `#ff0000` (merah), Bold |
| **Image** | 60×60, `#98a8b8` placeholder |
| **Nama** | "Catering Simbok Wiwit" — Sen 14px |
| **Order #** | "#240112" |
| **Harga** | "Rp 300,000" |
| **Items** | "55 Items" |
| **Button Rate** | Sama — Rate + Re-Order |

### 4. Status Badges

| Status | Warna Teks | Icon |
|--------|-----------|------|
| **Completed** | `#059c6a` (hijau) | ✅ |
| **Canceled** | `#ff0000` (merah) | ❌ |

---

## Route & Backend Plan

### Database
Yang perlu:
- **orders** — sudah ada tabelnya
- **order_items** — sudah ada (order_id, menu_id, quantity, price)
- `orders` perlu kolom `status` untuk filter: `ongoing`, `completed`, `cancelled`
- `orders` perlu kolom `catering_name` atau relasi ke `caterings`

### Route Baru
```php
Route::get('/pesanan', [OrderController::class, 'index'])->name('pesanan');
```

### OrderController
- `index()` — Tampilkan halaman pesanan dengan data:
  - List orders dari user login
  - Filter: ongoing (status != completed/cancelled) vs history (completed/cancelled)
  - Group by status
- `cancelOrder(Order $order)` — Batalkan pesanan
- `reorder(Order $order)` — Repeat order (add to cart)

### Page Baru
- `resources/js/Pages/Pesanan.jsx` — Halaman pesanan dengan tab Ongoing & History

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma untuk kebutuhan data**: Identifikasi data baru dari Figma yang belum ada di database:
  - Kolom `status` di tabel `orders` (belum ada — Figma menampilkan Completed/Canceled/Ongoing)
  - Kolom `catering_name` atau relasi ke `caterings` untuk ditampilkan di card
  - Kolom `items_count` atau hitung dari relasi `order_items`
  - Kolom `order_date` atau pakai `created_at`
  - Cek apakah ada field lain di Figma yang butuh kolom/tabel baru
- [ ] **🎨 Cek resource Figma**: Ekstrak icon/image/vector dari frame Figma jika belum ada di `public/images/` atau belum bisa dibuat sebagai inline SVG. Jangan buat resource sendiri — selalu ambil dari Figma. Frame: `610:3978` (History) + `610:4056` (Berlangsung)
- [ ] Tambah kolom `status` di tabel `orders` (default: 'ongoing')
- [ ] Tambah kolom `catering_name`, `items_count`, `order_date` di `orders` atau query via relasi
- [ ] Buat `OrderController` dengan `index()`, `cancelOrder()`, `reorder()`
- [ ] Tambah route `/pesanan` di `routes/web.php`
- [ ] Pass data: `ongoingOrders`, `historyOrders` ke Inertia

### ⬜ Phase 2: Page Layout & Top Bar
- [ ] Buat `resources/js/Pages/Pesanan.jsx`
- [ ] White background `#ffffff`
- [ ] Back button — lingkaran `#ecf0f4`, arrow `#181c2e` (inline SVG dari Figma)
- [ ] Title "My Orders" — Sen 17px center
- [ ] More button (⋮) — 3 dots, `#ecf0f4` bg (inline SVG dari Figma)

### ⬜ Phase 3: Tab Bar
- [ ] Tab "Ongoing" — `#a5a7b9`, Regular
- [ ] Tab "History" — `#fb6d3a`, Bold
- [ ] Line separator full width
- [ ] Active indicator line `#ff7622` weight 2
- [ ] Tab switching state management

### ⬜ Phase 4: Order Cards
- [ ] List orders dinamis dari backend
- [ ] Category label + Status badge (hijau/merah)
- [ ] Image placeholder 60×60 `rounded-[8px]`
- [ ] Nama catering — Bold 14px
- [ ] Order number — underline, `#6b6e82`, kanan
- [ ] Harga + separator + tanggal + items count
- [ ] Separator line antar items
- [ ] Button Rate — outline `#ff7622`
- [ ] Button Re-Order / Track Order — filled `#ff7622`

### ⬜ Phase 5: Integrasi & Polish
- [ ] Tab switching (Ongoing ↔ History)
- [ ] Cancel order action
- [ ] Re-order (add to cart + redirect ke checkout)
- [ ] Track order (link ke halaman Tracking)
- [ ] Rate order (link ke halaman Review)
- [ ] Empty state jika tidak ada pesanan

---

### ⬜ Phase 6: Validasi Error (Browser)
- [ ] Buka halaman Pesanan di browser (via `php artisan serve + Vite`)
- [ ] Ambil **browser snapshot** (DOM) — cek struktur halaman
- [ ] Cek **browser console logs** — pastikan tidak ada error/warning
- [ ] Tab switch: Ongoing ↔ History — cek apakah ada error saat switching
- [ ] Cek **responsiveness** di viewport mobile (max-width 430px)
- [ ] Cek empty state jika tidak ada orders

### ⬜ Phase 7: Figma Design Comparison
- [ ] Screenshot Figma frame (via `save_screenshots` Figma MCP):
  - Frame `610:3978` — Pesanan - History (375×844px)
  - Frame `610:4056` — Pesanan - Berlangsung (375×844px)
- [ ] Screenshot Web (via `browser_save_screenshot` Browser MCP) — tab History aktif
- [ ] Screenshot Web — tab Berlangsung aktif
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Target skor ≥ 90% — jika kurang, catat perbaikan

### ⬜ Phase 8: Git Commit & Push
- [ ] `git add` semua perubahan (routes, controller, migration, page)
- [ ] `git commit` dengan pesan deskriptif
- [ ] `git push` ke remote repository

---

## 🤖 Rekomendasi Sub-Agent

Gunakan sub-agent untuk mempercepat implementasi halaman ini:

| Langkah | Agent | Task |
|---------|-------|------|
| 1. Riset | `Explore` 🔍 | Riset tabel `orders` + `order_items` + Model `Order` — kolom, relasi, casts |
| 2. Riset | `Explore` 🔍 | Cari pattern komponen dari halaman existing (Checkout, Pembayaran) untuk referensi card & tab |
| 3. Ekstrak | `general-purpose` 🤖 | Ambil icon/vector dari Figma frame `610:3978` & `610:4056` |
| 4. Validasi | Browser MCP 🖥️ | Snapshot + console logs setelah implementasi |

> Detail lengkap strategi sub-agent lihat di [BASE_PLAN.md](BASE_PLAN.md#-rekomendasi-penggunaan-sub-agent)

---

## Catatan Implementasi
- **White background** `#ffffff` (berbeda dari checkout yang dark `#131927`)
- **Dimensi**: 375×844px, mobile-first max-width 430px
- **Font**: Sen konsisten
- **Tab bar**: History dan Ongoing adalah **2 page terpisah** di Figma — implementasi sebagai 1 page dengan tab switching lebih efisien
- **Order number** di Figma selalu diawali `#` (contoh: `#162432`, `#240112`)
- **Button variants**: 
  - Completed → Rate (outline) + Re-Order (filled)
  - Tanpa status → Track Order (filled) + Cancel (outline)
  - Canceled → Rate (outline) + Re-Order (filled)
- **Overflow**: Jika banyak order, perlu scroll. Figma hanya menampilkan 3 item sample
- **🎨 Figma Resources**: Selalu ekstrak icon/image/vector langsung dari Figma (`get_screenshot`/`save_screenshots` Figma MCP) jika resource belum ada di `public/images/` atau tidak bisa dibuat sebagai inline SVG. Jangan pernah membuat icon/vector sendiri — gunakan persis dari Figma. Lihat frame `610:3978` (History) untuk back arrow, more ⋮, status badge icon, dan komponen visual lainnya.
