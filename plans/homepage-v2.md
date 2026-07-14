# Homepage Variant — USER_FIX

> **File Figma**: `unsaved-mrkp6a6k-mt6e0kqo`
> **Frame**: `610:7824` — Homepage (375×847px)
> **Background**: `#ffffff`
> **Updated**: 2026-07-14
> **Status**: 🔜 Belum diimplementasi — fitur baru yang belum ada di Home.jsx saat ini

---

## State Overview

Halaman ini memiliki **1 state**:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. Homepage** | User membuka app | Hero section dengan promo banner orange + kategori pills + daftar catering |

**Fitur baru yang belum ada di Home.jsx saat ini:**
1. Promo banner orange curved (`#fc6e2a`) dengan dekorasi gold leaf + "Kode vocer untukmu"
2. Location dropdown "DIANTAR KE → Pilih lokasimu"
3. Cart icon dengan badge count
4. Category pills horizontal (Semua/Harian/Snack/Acara) dengan icon gambar
5. "See All" links di setiap section
6. Catering card meta row (rating + delivery + schedule)

---

## Layout

```
┌──────────────────────────────┐
│  [≡]  DIANTAR KE       [🛒 3]│  Top bar
│       Pilih lokasimu  ▼      │
│                              │
│  Halo User, Selamat Datang!  │  Greeting
│                              │
│  ┌────────────────────────┐  │
│  │ 🔍 Search dishes...    │  │  Search bar
│  └────────────────────────┘  │
│                              │
│  ╔══════════════════════════╗│
│  ║  [Orange Promo Banner]   ║│  Promo — bg #fc6e2a
│  ║   KODE VOCER              ║│  curved shape R:40
│  ║   UNTUKMU                 ║│  text white ExtraBold 41px
│  ║                     [✕]  ║│  decorative gold leaves
│  ╚══════════════════════════╝│
│                              │
│  Semua kategori      See All │  Section title
│  [Semua][Harian][Snack][...] │  Category pills
│                              │
│  Catering Tersedia   See All │  Section title
│                              │
│  ┌────────────────────────┐  │
│  │  [Image 327×137]       │  │  Catering Card
│  │  Catering Ibu Jumilah  │  │
│  │  Acara - Catering...   │  │
│  │  ★4.7  🚚Antar  🕐1+hari│  │  Meta row
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │  ... More cards        │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — Location + Cart (`610:7917`)

| Elemen | Detail Figma |
|--------|-------------|
| **Menu button** | Lingkaran 45×45, bg `#ecf0f4`, hamburger icon |
| **"DIANTAR KE"** | Sen Bold 12px, `#fc6e2a` |
| **"Pilih lokasimu"** | Sen Regular 14px, `#676767` |
| **Dropdown arrow** | Polygon fill `#181c2e`, rotation 180 |
| **Cart button** | Lingkaran 45×45, bg `#ecf0f4` |
| **Cart badge** | Lingkaran merah (?) + text "3", stroke `#ff7622` |

### 2. Greeting — `610:7916`

| Properti | Value |
|----------|-------|
| **Text** | "Halo User, Selamat Datang!" |
| **Font** | Sen 16px, `#1e1d1d` |
| **Line height** | 26px |

### 3. Search Bar — `610:7910`

| Properti | Value |
|----------|-------|
| **Background** | `#f6f6f6`, corner radius 10 |
| **Ukuran** | 327×62 |
| **Icon** | Search magnifying glass, stroke weight 2 |
| **Placeholder** | "Search dishes, restaurants" — Sen 14px, `#676767` |

### 4. Promo Banner — `610:7944`

| Elemen | Detail Figma |
|--------|-------------|
| **Background shape** | `#fc6e2a`, corner radius 40 — curved bottom |
| **Decorative elements** | Gold leaf vectors, colors: `#ffda7d`, `#ebb329`, `#ffc22c`, `#fff8e5` — various rotations & opacities |
| **Promo text** | "Kode vocer untukmu" — Sen ExtraBold 41px, `#ffffff`, line height 56px, text align center |
| **Close button** | Lingkaran bg `#ffe194`, close/X icon stroke `#ef761a` |

### 5. Category Pills — `610:7886`

| Elemen | Detail Figma |
|--------|-------------|
| **Section title** | "Semua kategori" — Sen Regular 20px, `#32343e` |
| **"See All"** | Sen Regular 16px, `#333333` + right arrow |
| **Pill "Semua" (active)** | bg `#ffd27c`, corner radius 39, shadow, icon 44×44 circle |
| **Pill "Harian"** | bg `#ffffff`, corner radius 50, shadow `#96969a` 0.15 opacity |
| **Pill "Snack"** | bg `#ffffff`, same style |
| **Pill "Acara"** | bg `#ffffff`, same style |

### 6. Catering Card — Template (`610:7863`)

| Elemen | Detail Figma |
|--------|-------------|
| **Image** | 327×137, `#c4c4c4` placeholder, corner radius 10 |
| **Title** | Sen Regular 20px, `#181c2e` |
| **Subtitle** | Sen Regular 14px, `#a0a5ba` |
| **Rating** | Star icon stroke `#ff7622` + "4.7" Sen Bold 16px `#181c2e` |
| **Delivery** | Truck icon fill `#ff7622` + "Antar" / "Free" — Sen 14px `#181c2e` |
| **Schedule** | Clock icon + "1+ hari" / "Scheduled" — Sen 14px `#181c2e` |

---

## Route & Backend Plan

### Database
- Tidak perlu perubahan database — semua data sudah ada (categories, caterings)
- Perlu memastikan seeding data untuk promo banner (mungkin tabel `promos`)

### Route
- Tidak perlu route baru — reuse route `/home` yang sudah ada
- Update `HomeController` untuk pass data promo jika perlu

### Controller Update
| Method | Update |
|--------|--------|
| `HomeController@index` | Tambah data: `promo` (opsional), `categories` (6 → 4 sesuai Figma) |

### Page Update
- Update `resources/js/Pages/Home.jsx` — tambah komponen baru sesuai Figma frame `610:7824`

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma untuk kebutuhan data**: Data kategori sudah ada, data catering sudah ada. Mungkin perlu tabel `promos` jika ingin banner dinamis.
- [ ] **🎨 Cek resource Figma**: Ekstrak gold leaf decorative vectors, promo close icon, location dropdown arrow, cart icon, star icon, delivery truck icon, clock icon dari frame `610:7824`
- [ ] Update `HomeController` — pass categories + promo (jika ada)

### ⬜ Phase 2: Top Bar & Greeting
- [ ] Location dropdown — "DIANTAR KE" label + "Pilih lokasimu" + dropdown arrow
- [ ] Menu button (≡) — lingkaran `#ecf0f4`
- [ ] Cart button with badge — lingkaran + icon shopping bag + badge count
- [ ] Greeting "Halo User, Selamat Datang!" — Sen 16px `#1e1d1d`

### ⬜ Phase 3: Promo Banner
- [ ] Orange curved banner `#fc6e2a` — corner radius 40
- [ ] Gold leaf decorative vectors (inline SVG dari Figma)
- [ ] "Kode vocer untukmu" — ExtraBold 41px white, line height 56px
- [ ] Close button — lingkaran `#ffe194`, X icon `#ef761a`
- [ ] Animasi/smooth appearance

### ⬜ Phase 4: Category Pills
- [ ] Section title "Semua kategori" + "See All" link
- [ ] Horizontal scrollable pill list
- [ ] Active pill "Semua" — bg `#ffd27c`, icon + label
- [ ] Inactive pills — bg `#ffffff`, shadow, click → filter catering
- [ ] Icon images dari database (category.icon)

### ⬜ Phase 5: Catering Cards
- [ ] Section title "Catering Tersedia" + "See All" link
- [ ] Card image 327×137 — corner radius 10
- [ ] Title + subtitle sesuai data
- [ ] Meta row: rating star + score, delivery info, schedule info
- [ ] Ganti layout card yang existing dengan layout baru sesuai Figma

### ⬜ Phase 6: Integrasi & Polish
- [ ] Empty state — "Tidak ada catering tersedia"
- [ ] Loading state — skeleton cards
- [ ] Error handling — fallback image jika gambar catering rusak
- [ ] Link category pill → filter catering berdasarkan kategori
- [ ] Link "See All" → halaman search dengan filter
- [ ] Link cart → halaman checkout/keranjang

### ⬜ Phase 7: Validasi Error (Browser)
- [ ] Buka halaman di browser (via `php artisan serve + Vite`)
- [ ] Ambil **browser snapshot** (DOM) — cek struktur halaman
- [ ] Cek **browser console logs** — pastikan tidak ada error/warning
- [ ] Cek scroll category pills
- [ ] Cek klik category pill → filter
- [ ] Cek klik "See All" → navigasi
- [ ] Cek **responsiveness** di viewport mobile (max-width 430px)

### ⬜ Phase 8: Figma Design Comparison

**Frame 1: Homepage (`610:7824`)**
- [ ] Screenshot Figma frame `610:7824` (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/`

### ⬜ Phase 9: Git Commit & Push
- [ ] `git add` semua perubahan
- [ ] `git commit` dengan pesan: `feat: homepage v2 with promo banner, location dropdown, category pills, new card layout`
- [ ] `git push` ke remote repository

---

## Catatan Implementasi

- **Background**: `#ffffff`
- **Perbedaan dengan Home.jsx existing**: Halaman ini punya promo banner orange + location dropdown + cart badge + category pills berbeda + meta row di card. Beberapa bagian bisa reuse dari Home.jsx (search bar, daftar catering), tapi layout keseluruhan berbeda.
- **Bisa jadi halaman baru atau update**: Bisa buat halaman terpisah `HomeV2.jsx` atau update `Home.jsx` langsung. Jika update, hati-hati jangan sampai merusak layout yang sudah ada.
- **Warna spesifik**: `#fc6e2a` untuk promo banner, `#ffd27c` untuk active pill, `#ffe194` untuk close button circle, `#ef761a` untuk close X
- **Gold leaf vectors**: Ambil persis dari Figma (jangan dibuat ulang) — simpan sebagai inline SVG
- **Promo banner bisa di-close**: Gunakan state `showPromo` untuk toggle
