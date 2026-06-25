# 🏗️ BASE PLAN — Template untuk Semua Plan Baru

Gunakan template ini sebagai **kerangka standar** setiap kali membuat plan baru. Sesuaikan isi per-section dengan kebutuhan spesifik fitur, tapi pertahankan struktur phase-nya agar konsisten dengan plan-plan sebelumnya.

---

## Struktur File Plan

Setiap file plan harus memiliki **5 bagian besar**:

```
1. HEADER — Info Figma & Status
2. STATE OVERVIEW — Deskripsi state/page
3. LAYOUT — ASCII diagram per state
4. DETAIL KOMPONEN — Tabel komponen per group
5. ROUTE & BACKEND PLAN — DB, routes, controller, page
6. MILESTONE IMPLEMENTASI — Checklist phases
7. CATATAN IMPLEMENTASI — Notes & warnings
```

---

## Template Lengkap

```markdown
# [icon] [Judul Fitur] — USER_FIX

> **File Figma**: `unsaved-mqs49lag-zcqi8mlr`
> **Frame**: `<frame_id>` — <nama_frame> (<width>x<height>px)
> **Variant**: <variant_frame_id> — <nama_variant> (jika ada)
> **Background**: `<color>`
> **Updated**: <tanggal>
> **Status**: 🔜 Belum diimplementasi

---

## State Overview

Page ini memiliki **<N> state**:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. [Base]** | <trigger> | <deskripsi> |
| **2. [State 2]** | <trigger> | <deskripsi> |

---

## Layout

### State 1: [Nama State]

```
┌──────────────────────────────┐
│  [←]       Title         [⋮] │  Top bar
│                              │
│    (isi layout ASCII)        │
│                              │
└──────────────────────────────┘
```

### State 2: [Nama State] *(jika ada)*

```
┌──────────────────────────────┐
│    (isi layout ASCII)        │
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Group (<node_id>)`

| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran 45×45, bg `<color>`, arrow stroke `<color>` weight <N> |
| **Title** | Sen <size>px, `<color>`, <weight> |
| **More (⋮)** | Lingkaran 45×45, bg `<color>`, 3 titik stroke `<color>` weight <N> *(jika ada)* |

### 2. [Nama Komponen/Section]

| Properti | Value |
|----------|-------|
| **Ukuran** | <width>x<height> |
| **Background** | `<color>` |
| **Border radius** | <N>px |
| **Font** | Sen <weight> <size>px, `<color>` |

*(Ulang tabel per komponen utama — maksimal ~10 tabel, untuk detail kecil cukup mention di teks)*

---

## Route & Backend Plan

### Database

| Table | Kolom baru | Keterangan |
|-------|-----------|------------|
| `<table>` | `<kolom>` | `<type>` — `<deskripsi>` |

Atau bullet list:

- **<table>** — sudah ada tabelnya
- **<table>** — perlu kolom baru: `<kolom1>`, `<kolom2>`

### Route Baru

```php
Route::get('/path', [Controller::class, 'method'])->name('route.name');
Route::post('/path/{id}/action', [Controller::class, 'action'])->name('route.action');
```

### Controller

| Method | Fungsi |
|--------|--------|
| `index()` | Tampilkan halaman dengan data <data> |
| `action(Request)` | Proses <action> → redirect |

### Page Baru

- `resources/js/Pages/<NamaPage>.jsx` — <deskripsi>

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma untuk kebutuhan data**: Karena project ini berbasis Figma design, tidak semua fitur & database tersedia secara default. Identifikasi data baru yang muncul di Figma:
  - Tabel baru yang belum ada di database (`database/migrations/`)
  - Kolom baru di tabel existing (contoh: `status` di `orders`, `options` di `menus`)
  - Relasi baru antar tabel
  - Model baru / update fillable & casts
- [ ] **🎨 Cek resource Figma**: Ekstrak icon/image/vector dari frame Figma jika belum ada di `public/images/` atau belum bisa dibuat sebagai inline SVG. Jangan buat resource sendiri — selalu ambil dari Figma. Frame: `<frame_id>` + `<frame_id_2>`
- [ ] Buat migration <nama_table> (kolom: <kolom>)
- [ ] Update model <Model> ($fillable, $casts, relasi)
- [ ] Buat <Controller> dengan method <method>()
- [ ] Tambah route di `routes/web.php`
- [ ] Pass data ke Inertia ( <data1>, <data2> )

### ⬜ Phase 2: Page Layout & Top Bar
- [ ] Buat `resources/js/Pages/<NamaPage>.jsx`
- [ ] Background color `<color>`
- [ ] Back button — lingkaran `<color>` bg, arrow `<color>` (inline SVG dari Figma)
- [ ] Title "<title>" — Sen <size>px, `<color>`
- [ ] More button (⋮) — inline SVG dari Figma *(jika ada)*

### ⬜ Phase 3: [Komponen Spesifik 1]
- [ ] <task 1>
- [ ] <task 2>

### ⬜ Phase 4: [Komponen Spesifik 2]
- [ ] <task 1>
- [ ] <task 2>

### ⬜ Phase 5: [Komponen Spesifik 3 / Integrasi]
- [ ] <task 1>
- [ ] <task 2>
- [ ] Empty state — tampilan jika tidak ada data
- [ ] Loading state — indikasi saat proses
- [ ] Error handling — validasi input, fallback image, 404
- [ ] Animasi transisi *(jika perlu)*

### ⬜ Phase 6: Validasi Error (Browser)
- [ ] Buka halaman di browser (via `php artisan serve + Vite`)
- [ ] Ambil **browser snapshot** (DOM) — cek struktur halaman
- [ ] Cek **browser console logs** — pastikan tidak ada error/warning
- [ ] Cek semua interaksi user (click, input, toggle, submit)
- [ ] Cek **responsiveness** di viewport mobile (max-width 430px)
- [ ] Cek empty state jika tidak ada data
- [ ] Cek error/loading state

### ⬜ Phase 7: Figma Design Comparison (Per-Frame Sequential)

Validasi dilakukan **satu per satu per frame** secara berurutan. Setiap frame diselesaikan dulu (screenshot Figma → screenshot Web → compare → iterasi jika < 90%) sebelum lanjut ke frame berikutnya.

Ulangi blok di bawah untuk setiap frame yang ada di plan:

**Frame 1: <nama_frame> (`<frame_id>`)**
- [ ] Screenshot Figma frame `<frame_id>` — <nama_frame> (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/` → lanjut Frame 2

**Frame 2: <nama_frame> (`<frame_id>`)**
- [ ] Screenshot Figma frame <frame_id> — <nama_frame> (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/` → lanjut Frame 3

### ⬜ Phase 8: Git Commit & Push
- [ ] `git add` semua perubahan
- [ ] `git commit` dengan pesan deskriptif (format: `feat: <deskripsi>`)
- [ ] `git push` ke remote repository

---

## Catatan Implementasi

- **Background**: `<color>` (tulis jika berbeda dari background global)
- **Dimensi**: <width>x<height>px, mobile-first max-width 430px
- **Font**: Sen konsisten (Tailwind config + inline fallback)
- **Link ke halaman lain**:
  - `<nama page>` — `<action>` → `<route>`
- **Warna spesifik**: `<color>` untuk <elemen>, `<color>` untuk <elemen>
- **🎨 Figma Resources**: Selalu ekstrak icon/image/vector langsung dari Figma (`get_screenshot`/`save_screenshots` Figma MCP) jika resource belum ada di `public/images/` atau tidak bisa dibuat sebagai inline SVG. Jangan pernah membuat icon/vector sendiri — gunakan persis dari Figma.
```

---

## Panduan Penggunaan

### ✅ Phase yang WAJIB ada di setiap plan:

| Phase | Wajib? | Keterangan |
|-------|:------:|------------|
| Phase 1: Database & Backend | ✅ Ya | Tambah task 🎨 cek resource Figma di paling atas |
| Phase 2: Page Layout & Top Bar | ✅ Ya | Back button + Title, inline SVG dari Figma |
| Phase 3-5: [Komponen Spesifik] | ✅ Ya | Sesuaikan dengan jumlah komponen unik |
| Phase N+1: Validasi Error (Browser) | ✅ Ya | Snapshot, console log, responsiveness |
| Phase N+2: Figma Design Comparison | ✅ Ya | Screenshot + Gemini compare, target ≥90% |
| Phase N+3: Git Commit & Push | ✅ Ya | Add → commit → push |

### 🔁 Phase opsional:

| Phase | Kapan Dipakai | Contoh |
|-------|--------------|--------|
| **Integrasi & Polish** | Jika komponen punya interaksi kompleks | State management, loading, animasi |
| **Actions & Polish** | Jika ada aksi user (cancel, reorder, dll) | Konfirmasi dialog, refresh list |

### 📐 Pola Layout ASCII

Gunakan karakter ini untuk diagram layout:
```
[←]           Back button
[⋮]           More button
[──Button──]  Tombol aksi
<text>        Label/tulisan
#rrggbb       Placeholder warna
```

### 📏 Standar Dimensi

| Elemen | Standar |
|--------|---------|
| **Back button** | Lingkaran 45×45 |
| **More button** | Lingkaran 45×45 |
| **Button utama** | 327×62px / 341×67px, rounded-12 |
| **Button sekunder** | 139×39px, rounded-8 |
| **Food image** | 60×60px / 136×117px, rounded-8 / rounded-[25px] |
| **Side margin** | x:24 (327px width dalam 375px viewport) |
| **Card width** | 327px (full = 375 - 24 - 24) |

### 🎨 Warna Standar

| Warna | Penggunaan |
|-------|-----------|
| `#ff7622` | Primary orange — button, active tab, badge |
| `#fc6e2a` | Primary orange alternatif |
| `#181c2e` | Dark text, icons |
| `#a0a5ba` | Subtitle, hint text |
| `#6b6e82` | Secondary text, order number |
| `#ecf0f4` | Button bg, lingkaran back/more |
| `#f0f5fa` | Card bg, input bg |
| `#eef2f6` | Separator line |
| `#ffffff` | White bg |
| `#131927` | Dark bg (checkout, login) |
| `#121223` | Dark bg (forgot password, verification) |
| `#059c6a` | Hijau — completed/success |
| `#ff0000` | Merah — canceled/error |

### 📝 Format Pesan Commit

```
feat: <nama fitur> — <deskripsi singkat>
```

Contoh dari plan sebelumnya:
- `feat: detail produk page with menu options, qty counter, and add-to-cart`
- `feat: Implement Checkout page with cart system & Figma-validated UI`
- `feat: Implement Pembayaran page (QRIS, Add Card, Berhasil)`

### 🎯 Target Skor Design Comparison

- **Minimal**: ≥ 90%
- **Ideal**: ≥ 95%
- Jika skor di bawah target, catat elemen yang kurang, perbaiki, dan bandingkan ulang.

---

## 🤖 Rekomendasi Penggunaan Sub-Agent

Sub-agent (AI分身) bisa dipakai untuk **memparalelkan kerjaan** dan mempercepat development. Agent jalan sendiri, hasilnya dikembalikan setelah selesai — saya tetap bisa kerja di task lain sambil menunggu.

### 🔀 Kapan Pakai Sub-Agent

| Momen | Agent Type | Task | Jalan Bersamaan Dengan |
|-------|-----------|------|------------------------|
| **Mulai implementasi** | `Explore` 🔍 | Riset struktur DB, tabel, kolom, relasi yang sudah ada | Saya analisis Figma & siapkan Page skeleton |
| **Cari referensi** | `Explore` 🔍 | Cari pattern komponen dari halaman existing (Checkout, Pembayaran, dll) | Saya buat Controller & routing |
| **Ekstrak resource** | `general-purpose` 🤖 | Ambil screenshot Figma, ekstrak icon/vector, simpan ke `public/images/` | Saya buat migration & model |
| **Validasi error** | Browser MCP 🖥️ | Buka app, ambil snapshot, cek console logs | Saya review kode |
| **Design compare** | `general-purpose` 🤖 | Screenshot web + bandingkan dgn Figma via Gemini | Saya siapkan commit |
| **Bug fixing** | `Explore` 🔍 | Cari semua file yang menyentuh komponen bermasalah | Saya diagnosa root cause |

### ⚡ Workflow Paralel Optimal

Untuk implementasi fitur baru (contoh: Halaman Pesanan), urutan paling efisien:

```
Langkah 1: [Saya] + [Explore Agent] — PARALEL
  ├─ Saya: Analisis Figma, detail komponen, rencana database
  └─ Explore: Riset tabel existing + Model + pattern halaman serupa

Langkah 2: [general-purpose Agent] — BACKGROUND (isolated)
  └─ Ekstrak semua icon/resource dari Figma → simpan ke public/images/

Langkah 3: [Saya] — IMPLEMENTASI INTI
  └─ Migration, Controller, Page component, integrasi

Langkah 4: [Saya] + [Browser/Agent] — PARALEL VALIDASI
  ├─ Saya: Design comparison via Gemini
  └─ Agent/Browser: Snapshot, console logs, responsiveness
```

### 🛡️ Worktree Isolation

Untuk 2 fitur berbeda tanpa takut conflict file:

```
Agent A (isolation: worktree) → Implementasi Fitur 1
Agent B (isolation: worktree) → Implementasi Fitur 2
```

Mereka kerja di salinan kode terpisah. Yang selesai duluan, di-merge duluan.

### 📌 Catatan

- Sub-agent hanya untuk **task yang jelas dan terisolasi** — bukan untuk desain/arsitektur yang perlu konteks penuh
- Selalu prefer **Explore** agent untuk riset/baca kode (read-only, lebih cepat)
- **general-purpose** agent untuk task multi-step seperti ekstrak resource Figma
- Lihat [Agent types lengkap di sini](../CLAUDE.md#agent-types) *(jika ada)*

---

*Template ini dibuat dari pola 4 plan yang sudah selesai: Detail Produk, Checkout Produk, Pembayaran, dan Pembayaran Berhasil.*
