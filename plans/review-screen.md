# Review Screen (Buyer) — USER_FIX

> **File Figma**: `unsaved-mrkp6a6k-mt6e0kqo`
> **Frame**:
>   - `610:2881` — Review Screen (375×812px) — Base (5 review cards)
>   - `610:3118` — Review Screen (375×812px) — Variant (layout alternatif)
> **Background**: `#ffffff`
> **Updated**: 2026-07-14
> **Status**: ✅ Selesai — ReviewScreen.jsx, ReviewController, route `/catering/{catering}/reviews`

---

## State Overview

Page ini memiliki **1 state**:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. Daftar Review** | User membuka halaman review | Daftar review dari buyer lain untuk catering tertentu, dengan avatar, nama, rating, tanggal, dan teks review |

---

## Layout

```
┌──────────────────────────────┐
│  [←]      Reviews            │  Top bar
│                              │
│  ┌──────────────────────────┐│
│  │  [👤] User Name          ││  Review Card 1
│  │      20/12/2020    [⋮]  ││
│  │  ★★★★★                    ││
│  │  "Great Food and Service" ││
│  │  This Food so tasty...   ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │  [👤] User Name     [⋮]  ││  Review Card 2
│  │      20/12/2020          ││
│  │  ★★★★★                    ││
│  │  "Awesome and Nice"      ││
│  │  This Food so tasty...   ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │  [👤] User Name     [⋮]  ││  Review Card 3
│  │  ...                     ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │  [👤] User Name     [⋮]  ││  Review Card 4
│  │  ...                     ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │  [👤] User Name     [⋮]  ││  Review Card 5
│  │  ...                     ││
│  └──────────────────────────┘│
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Group 3246` (`610:2882`) + `Top` (`610:3020`)

| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran 45×45, bg `#ecf0f4`, arrow stroke `#181c2e` weight 2 |
| **Title "Reviews"** | Sen Regular 17px, `#181c2e` |

### 2. Review Card — Template (`610:2884`)

| Elemen | Detail Figma |
|--------|-------------|
| **Card background** | `#f6f8fa`, corner radius 15, width 274×171 |
| **Avatar** | Lingkaran 43×43, bg `#98a8b8` |
| **Date** | Sen 12px, `#9c9ba6` — format "20/12/2020" |
| **Review title** | Sen Bold 14px, `#32343e` |
| **Star rating** | 5 bintang stroke, masing-masing ~13×13px, jarak ~14px |
| **Review text** | Sen Regular 12px, `#747783` — multi-line (max 3 baris) |
| **Three dots (⋮)** | 3 lingkaran 4×4, fill `#9c9ba6`, jarak 7px |

### 3. Variasi Card Heights

| Card | Tinggi | Isi teks |
|------|--------|----------|
| Card 1 | 171px | 3 baris review + title |
| Card 2 | 136px | 2 baris review + title |
| Card 3 | 115px | 1 baris review + title |
| Card 4 | 136px | 2 baris review + title |
| Card 5 | 136px | 2 baris review + title |

---

## Route & Backend Plan

### Database
- **`reviews`** — sudah ada tabelnya (`App\Models\Review`)
- Perlu memastikan kolom: `id`, `user_id`, `catering_id`, `order_id`, `rating`, `review`, `created_at`
- Relasi: `Review` belongsTo `User` dan `Catering`

### Route Baru

```php
Route::get('/catering/{catering}/reviews', [ReviewController::class, 'index'])->name('catering.reviews');
```

### Controller

| Method | Fungsi |
|--------|--------|
| `index(Catering $catering)` | Tampilkan semua review untuk catering tertentu, dengan pagination |

### Page Baru

- `resources/js/Pages/ReviewScreen.jsx` — Daftar review cards

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma untuk kebutuhan data**: Tabel `reviews` sudah ada. Pastikan relasi User + Catering sudah benar.
- [ ] **🎨 Cek resource Figma**: Ekstrak icon star untuk rating dari Figma jika perlu. Frame: `610:2881`
- [ ] Pastikan model `Review` sudah punya relasi `user()` dan `catering()`
- [ ] Buat `ReviewController` dengan method `index(Catering $catering)` — load reviews with user, pagination 10
- [ ] Tambah route GET `/catering/{catering}/reviews`
- [ ] Pass data ke Inertia: `reviews`, `catering`

### ⬜ Phase 2: Page Layout & Top Bar
- [ ] Buat `resources/js/Pages/ReviewScreen.jsx`
- [ ] Background `#ffffff`
- [ ] Back button — lingkaran `#ecf0f4` bg, arrow `#181c2e` (inline SVG dari Figma)
- [ ] Title "Reviews" — Sen Regular 17px, `#181c2e`

### ⬜ Phase 3: Review Cards
- [ ] Card background `#f6f8fa`, corner radius 15
- [ ] Avatar placeholder lingkaran 43×43, bg `#98a8b8`
- [ ] Tanggal — Sen 12px, `#9c9ba6`
- [ ] Review title — Sen Bold 14px, `#32343e`
- [ ] Star rating component — 5 stars (inline SVG)
- [ ] Review text — Sen Regular 12px, `#747783`
- [ ] Three dots (⋮) menu — 3 ellipses 4×4, fill `#9c9ba6`
- [ ] Multiple review cards (map dari data)

### ⬜ Phase 4: Integrasi & Polish
- [ ] Empty state — "Belum ada review" jika tidak ada data
- [ ] Loading state — skeleton cards saat loading
- [ ] Error handling — fallback avatar jika user tidak punya foto
- [ ] Link dari halaman Detail Produk → Review Screen

### ⬜ Phase 5: Validasi Error (Browser)
- [ ] Buka halaman di browser (via `php artisan serve + Vite`)
- [ ] Ambil **browser snapshot** (DOM) — cek struktur halaman
- [ ] Cek **browser console logs** — pastikan tidak ada error/warning
- [ ] Cek semua interaksi user (scroll, klik back)
- [ ] Cek **responsiveness** di viewport mobile (max-width 430px)
- [ ] Cek empty state jika tidak ada review

### ⬜ Phase 6: Figma Design Comparison

**Frame 1: Review Screen (`610:2881`)**
- [ ] Screenshot Figma frame `610:2881` (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/`

### ⬜ Phase 7: Git Commit & Push
- [ ] `git add` semua perubahan
- [ ] `git commit` dengan pesan: `feat: buyer review screen with review cards`
- [ ] `git push` ke remote repository

---

## Catatan Implementasi

- **Background**: `#ffffff`
- **Text wrapping**: Review text bisa 1-3 baris, gunakan `lineClamp` atau `maxLines`
- **Star rating**: Inline SVG 5 bintang, bisa jadi component reusable `StarRating.jsx`
- **Link dari Detail Produk**: Tambahkan tombol/navigasi ke `/catering/{catering}/reviews`
- **Warna spesifik**: `#f6f8fa` untuk card bg, `#747783` untuk review text, `#9c9ba6` untuk tanggal & three dots
