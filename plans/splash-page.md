# Splash Page — USER_FIX

> **File Figma**: `unsaved-mrkp6a6k-mt6e0kqo`
> **Frame**: `610:7982` — Splash Page_01 (375×812px)
> **Background**: `#ffffff`
> **Updated**: 2026-07-14
> **Status**: ✅ Selesai — Splash.jsx, SplashController, route `/` → splash → redirect ke `/home`

---

## State Overview

Page ini memiliki **1 state**:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. Splash** | Aplikasi dibuka | Logo CateringHub di tengah, background putih, auto-redirect ke Home setelah 2-3 detik |

---

## Layout

```
┌──────────────────────────────┐
│                              │
│                              │
│                              │
│                              │
│          [Logo]              │  c-hub-logo — 184×77px
│                              │
│                              │
│                              │
│                              │
│                              │
│                              │
│                              │
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Logo — `c-hub-logo 4` (`610:7983`)

| Properti | Value |
|----------|-------|
| **Ukuran** | 184×77 |
| **Posisi** | x:96, y:367 (centered) |
| **Tipe** | IMAGE — rect dengan image fill (sama dengan logo di `formulir-pendaftaran` step 3) |
| **Scale mode** | FILL |

---

## Route & Backend Plan

### Database
- Tidak perlu perubahan database

### Route Baru

```php
Route::get('/', [SplashController::class, 'index'])->name('splash');
```

Atau modifikasi route `/` yang sudah ada untuk redirect ke splash.

### Controller

| Method | Fungsi |
|--------|--------|
| `index()` | Tampilkan halaman splash → redirect ke `/home` setelah delay via JS |

### Page Baru

- `resources/js/Pages/Splash.jsx` — Logo di tengah, auto-redirect ke `/home` setelah 2-3 detik via `setTimeout` + `router.visit`

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma untuk kebutuhan data**: Splash page sederhana — hanya logo, tidak perlu data backend
- [ ] **🎨 Cek resource Figma**: Ekstrak logo CateringHub dari frame `610:7982` (image hash `992a5755296c0249152cce7e6d990758e4aef0c1`) atau dari frame `610:6148` (formulir-pendaftaran step 3) — simpan ke `public/images/logo.png`
- [ ] Buat `SplashController` dengan method `index()`
- [ ] Tambah route GET `/` di `routes/web.php` (override existing)

### ⬜ Phase 2: Page Layout
- [ ] Buat `resources/js/Pages/Splash.jsx`
- [ ] Background `#ffffff`
- [ ] Logo CateringHub di tengah layar (184×77px)
- [ ] Auto-redirect ke `/home` setelah 2-3 detik via `setTimeout` + `router.visit`

### ⬜ Phase 3: Validasi Error (Browser)
- [ ] Buka halaman di browser (via `php artisan serve + Vite`)
- [ ] Ambil **browser snapshot** (DOM) — cek struktur halaman
- [ ] Cek **browser console logs** — pastikan tidak ada error/warning
- [ ] Cek auto-redirect bekerja setelah 2-3 detik

### ⬜ Phase 4: Figma Design Comparison
**Frame 1: Splash Page_01 (`610:7982`)**
- [ ] Screenshot Figma frame `610:7982` (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/`

### ⬜ Phase 5: Git Commit & Push
- [ ] `git add` semua perubahan
- [ ] `git commit` dengan pesan: `feat: splash page with auto-redirect`
- [ ] `git push` ke remote repository

---

## Catatan Implementasi

- **Background**: `#ffffff` (sama dengan logo area)
- **Tidak ada route yang berubah** — cukup ubah route `/` yang sudah ada
- **Logo**: Ekstrak dari Figma frame `610:7982` — gunakan `save_screenshots` dengan node ID logo atau crop dari screenshot
- **Auto-redirect**: Gunakan `useEffect` + `setTimeout` + Inertia `router.visit('/home')`, timeout ~2500ms
- **Warna spesifik**: Tidak ada warna spesifik selain putih (`#ffffff`)
