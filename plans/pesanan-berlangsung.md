# 📦 Pesanan — Berlangsung (USER_FIX)

> **File Figma**: `unsaved-mqs49lag-zcqi8mlr`
> **Frame**: `610:4056` — Pesanan - Berlangsung (375×844px)
> **Background**: `#ffffff` (white), cornerRadius 20
> **Status**: 🔜 Belum diimplementasi

---

## 📐 1 Page, 2 Tab State

Page Pesanan memiliki **2 tab**:

| Tab | Status | Deskripsi |
|-----|--------|-----------|
| **Berlangsung** | Aktif (warna `#ff7622`) | Daftar pesanan yang sedang berlangsung |
| **Riwayat** | Inaktif (warna abu `#a5a7b9`) | Link ke halaman History |

> **Catatan**: Berlangsung (`610:4056`) dan History (`610:3978`) adalah **2 frame terpisah** di Figma. Bisa diimplementasi sebagai 1 page dengan tab switching yang sama.

---

## Layout

```
┌──────────────────────────────┐
│  [←]         Pesanan     [⋮] │  Top bar (y:50-95)
│                              │
│     Berlangsung    Riwayat   │  Tab bar (y:119-152)
│     ─────────────────────    │  Indicator #ff7622 di Berlangsung
│                              │
│  Snack                       │  Food 01 (y:184-349)
│  ┌──────┐ Catering Ibu Jum. │
│  │  ██  │ #162432           │  image 60×60, rounded-8
│  │  ██  │ Rp 2.184.000      │
│  └──────┘ | • 100 Items     │
│  [──Track Order──] [──Cancel──] │
│                              │
│  ─────────────────────────── │  Line separator #eef2f6
│                              │
│  Snack                       │  Food 02 (y:371-536)
│  ┌──────┐ Catering Ibu Jum. │
│  │  ██  │ #162432           │
│  │  ██  │ Rp 2.184.000      │
│  └──────┘ | • 100 Items     │
│  [──Track Order──] [──Cancel──] │
│                              │
│  ─────────────────────────── │
│                              │
│  Snack                       │  Food 03 (y:558-723)
│  ┌──────┐ Catering Ibu Jum. │
│  │  ██  │ #162432           │
│  │  ██  │ Rp 2.184.000      │
│  └──────┘ | • 100 Items     │
│  [──Track Order──] [──Cancel──] │
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Group (610:4120)`

| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran 45×45, bg `#ecf0f4`, arrow stroke `#181c2e` weight 2 |
| **Title "Pesanan"** | Sen 17px, `#181c2e`, Regular |
| **More (⋮)** | Lingkaran 45×45, bg `#ecf0f4`, 3 titik stroke `#181c2e` weight 2 |

### 2. Tab Bar — `Group (610:4114)`

| Elemen | Detail |
|--------|--------|
| **"Berlangsung"** | Sen 14px, `#ff7622`, Bold — posisi kiri |
| **"Riwayat"** | Sen 14px, `#a5a7b9`, Regular — posisi kanan |
| **Line 4** | Full width line `#ced7df` opacity 0.5, y:152 |
| **Line 5** | Active indicator `#ff7622` weight 2, width ~146px, y:152 (mulai x:24) |

### 3. Food Items — 3 Item (semua sama struktur)

Setiap item `GROUP` memiliki struktur:

#### Food 01 — `Group (610:4095)` — y:184

| Properti | Value |
|----------|-------|
| **Category label** | "Snack" — Sen 14px, `#181c2e`, Regular (di atas image/row pertama) |
| **Image** | 60×60, `#98a8b8` placeholder color, `rounded-[8px]` |
| **Nama** | "Catering Ibu Jumilah" — Sen 14px, `#181c2e`, Regular (400) |
| **Order #** | "#162432" — Sen 14px, `#6b6e82`, underline, right-aligned |
| **Harga** | "Rp 2.184.000" — Sen 14px, `#181c2e`, Bold |
| **Separator** | Line vertikal `#caccda` width 16px |
| **Items count** | "100 Items" — Sen 12px, `#6b6e82` |
| **Button Track Order** | 139×39, filled `#ff7622`, text "Track Order" — white, Sen Bold 12px, rounded-8 |
| **Button Cancel** | 139×39, outline `#ff7622` stroke 1, text "Cancel" — `#ff7622`, Sen Bold 12px, rounded-8 |

#### Food 02 — `Group (734:211)` — y:371

Sama persis dengan Food 01 (hanya posisi berbeda).

#### Food 03 — `Group (734:231)` — y:558

Sama persis dengan Food 01 (hanya posisi berbeda).

### 4. Layout Spacing

| Item | Value |
|------|-------|
| **Card left margin** | x:24 |
| **Card width** | 327px (full = 375 - 24 - 24) |
| **Category label y** | y:184 (first item) |
| **Image y** | y:233 (49px below category label) |
| **Line separator y** | y:217 (between category label and image) |
| **Button row y** | y:309 (76px below image bottom at y:233+60=293) |
| **Item spacing** | ~187px antar item (y:184 → y:371) |

---

## Route & Backend Plan

### Database
Sama seperti History plan:
- `orders` dengan kolom `status` (ongoing, completed, cancelled)
- `order_items` untuk detail item
- Relasi ke `caterings` untuk nama dan gambar

### Route Baru
```php
Route::get('/pesanan', [OrderController::class, 'index'])->name('pesanan');
Route::post('/pesanan/{order}/cancel', [OrderController::class, 'cancelOrder'])->name('pesanan.cancel');
Route::post('/pesanan/{order}/track', [OrderController::class, 'trackOrder'])->name('pesanan.track');
```

> **Catatan**: Route `/pesanan` dipakai bersama antara tab Berlangsung dan History — backend membedakan via query parameter `?tab=ongoing` atau `?tab=history`.

### OrderController
- `index()` — Tampilkan pesanan user:
  - `ongoingOrders`: status != 'completed' AND status != 'cancelled'
  - `historyOrders`: status = 'completed' OR status = 'cancelled'
  - `activeTab`: `ongoing` atau `history`
- `cancelOrder(Order $order)` — Update status jadi 'cancelled'
- `trackOrder(Order $order)` — Redirect ke halaman Tracking

### Page Baru
- `resources/js/Pages/Pesanan.jsx` — Satu page dengan tab `Berlangsung` | `Riwayat`
  > Bisa digabung dengan History dalam 1 file component dengan tab switching

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma untuk kebutuhan data**: Identifikasi data baru dari Figma yang belum ada di database:
  - Kolom `status` di tabel `orders` (belum ada — Figma menampilkan Ongoing/Completed/Canceled)
  - Kolom `catering_name` atau relasi ke `caterings` untuk ditampilkan di card
  - Kolom `items_count` atau hitung dari relasi `order_items`
  - Kolom `order_date` atau pakai `created_at`
  - Cek apakah ada field lain di Figma yang butuh kolom/tabel baru
- [ ] **🎨 Cek resource Figma**: Ekstrak icon/image/vector dari frame Figma jika belum ada di `public/images/` atau belum bisa dibuat sebagai inline SVG. Jangan buat resource sendiri — selalu ambil dari Figma. Frame: `610:4056` (Berlangsung) + `610:3978` (History)
- [ ] Siapkan kolom `status` di tabel `orders` (bareng dengan History)
- [ ] Buat `OrderController` (satu controller untuk Berlangsung + History)
- [ ] Tambah route `/pesanan` dan `/pesanan/{order}/cancel`
- [ ] Pass data `ongoingOrders` dan `activeTab` ke Inertia

### ⬜ Phase 2: Page Layout & Top Bar
- [ ] Siapkan `resources/js/Pages/Pesanan.jsx` (gabung dengan History)
- [ ] White background `#ffffff`
- [ ] Back button — `#ecf0f4` bg, `#181c2e` arrow (inline SVG dari Figma)
- [ ] Title "Pesanan" — Sen 17px
- [ ] More button (⋮) — inline SVG dari Figma

### ⬜ Phase 3: Tab Bar
- [ ] Tab "Berlangsung" — `#ff7622`, Bold (aktif)
- [ ] Tab "Riwayat" — `#a5a7b9`, Regular
- [ ] Active indicator line (x:24, width ~146px)
- [ ] Tab switching dengan Inertia atau local state

### ⬜ Phase 4: Order Cards
- [ ] List orders dari backend (status ongoing)
- [ ] Category label di atas setiap item
- [ ] Image 60×60, `rounded-[8px]`
- [ ] Nama catering + order number
- [ ] Harga + separator + items count
- [ ] Button Track Order — filled `#ff7622`
- [ ] Button Cancel — outline `#ff7622`

### ⬜ Phase 5: Actions & Polish
- [ ] Cancel order — konfirmasi dialog
- [ ] Track Order — navigasi ke halaman Tracking
- [ ] Empty state jika tidak ada ongoing order
- [ ] Refresh list setelah cancel

---

### ⬜ Phase 6: Validasi Error (Browser)
- [ ] Buka halaman Pesanan di browser (via `php artisan serve + Vite`)
- [ ] Ambil **browser snapshot** (DOM) — cek struktur halaman
- [ ] Cek **browser console logs** — pastikan tidak ada error/warning
- [ ] Tab switch: Berlangsung ↔ Riwayat — cek apakah ada error saat switching
- [ ] Cek **responsiveness** di viewport mobile (max-width 430px)
- [ ] Cek empty state jika tidak ada ongoing orders

### ⬜ Phase 7: Figma Design Comparison
- [ ] Screenshot Figma frame (via `save_screenshots` Figma MCP):
  - Frame `610:4056` — Pesanan - Berlangsung (375×844px)
  - Frame `610:3978` — Pesanan - History (375×844px)
- [ ] Screenshot Web (via `browser_save_screenshot` Browser MCP) — tab Berlangsung aktif
- [ ] Screenshot Web — tab History aktif
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
| 3. Ekstrak | `general-purpose` 🤖 | Ambil icon/vector dari Figma frame `610:4056` & `610:3978` |
| 4. Validasi | Browser MCP 🖥️ | Snapshot + console logs setelah implementasi |

> Detail lengkap strategi sub-agent lihat di [BASE_PLAN.md](BASE_PLAN.md#-rekomendasi-penggunaan-sub-agent)

---

## Catatan Implementasi
- **White background** `#ffffff`
- **Dimensi**: 375×844px
- **Font**: Sen konsisten
- **Hanya 1 variasi button**: Semua item di Berlangsung memiliki **Track Order** (filled orange) + **Cancel** (outline orange)
- **Tidak ada status badge**: Berbeda dengan History yang punya Completed/Canceled badge, Berlangsung tidak menampilkan status badge
- **Item seragam**: Semua 3 item sample di Figma identik (Snack, Catering Ibu Jumilah, Rp 2.184.000, 100 Items)
- **Overflow**: Scroll untuk list yang lebih panjang dari 3 item
- **Gabung dengan History**: Satu page, beda tab — implementasi sebagai component yang sama dengan tab filter
- **🎨 Figma Resources**: Selalu ekstrak icon/image/vector langsung dari Figma (`get_screenshot`/`save_screenshots` Figma MCP) jika resource belum ada di `public/images/` atau tidak bisa dibuat sebagai inline SVG. Jangan pernah membuat icon/vector sendiri — gunakan persis dari Figma. Lihat frame `610:4056` (Berlangsung) untuk back arrow, more ⋮, dan komponen visual lainnya.
