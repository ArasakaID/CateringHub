# Formulir Pendaftaran (Seller Registration — 3 Step) — USER_FIX

> **File Figma**: `unsaved-mrkp6a6k-mt6e0kqo`
> **Frame**:
>   - `610:6032` — formulir pendaftaran (375×812px) — Step 1: Form Usaha Catering
>   - `610:6078` — formulir pendaftaran (375×812px) — Step 2: Verifikasi Data
>   - `610:6123` — formulir pendaftaran (375×812px) — Step 3: Proses Verifikasi
> **Background**: `#ffffff`
> **Multi-step**: Ya — 3 step dengan step indicator (1 ●─●─● 3)
> **Updated**: 2026-07-14
> **Status**: ✅ Selesai — RegisterCatering.jsx (3-step), CateringRegistrationController, migration, routes

---

## State Overview

Page ini memiliki **3 step** dalam 1 flow:

| Step | Nama | Trigger | Deskripsi |
|------|------|---------|-----------|
| **1** | Form Usaha Catering | Klik "Daftar" dari halaman mana pun | Input: nama toko, slogan (opsional), deskripsi (opsional), upload logo |
| **2** | Verifikasi Data | Klik "Save" step 1 | Input: nama pemilik, NIK, No HP, Alamat |
| **3** | Proses Verifikasi | Klik "Save" step 2 | Konfirmasi pendaftaran — logo + teks "Tunggu proses Verifikasi dari pihak CateringHub" |

---

## Layout

### Step 1: Form Usaha Catering (`610:6032`)

```
┌──────────────────────────────┐
│  [←]  Form Usaha Catering    │  Top bar
│  ●────●────●                 │  Step indicator ① aktif
│                              │
│  nama Toko catering          │  Label
│  ┌────────────────────────┐  │
│  │  Cat'ring              │  │  Input field (bg #f0f5fa)
│  └────────────────────────┘  │
│                              │
│  Slogan catering (opsional)  │  Label
│  ┌────────────────────────┐  │
│  │  Cat'rings             │  │  Input field
│  └────────────────────────┘  │
│                              │
│  Deskripsi (opsional)        │  Label
│  ┌────────────────────────┐  │
│  │  Deskripsikan usaha    │  │  Textarea (bg #f0f5fa)
│  │  cateringmu....        │  │
│  └────────────────────────┘  │
│                              │
│  Upload logo foto            │  Label
│  [📁]  Besar file maksimum   │  Upload box 64×64
│        10 megabytes (10Mb)   │
│                              │
│  ┌────────────────────────┐  │
│  │         Save           │  │  Button (bg #ff7622)
│  └────────────────────────┘  │
└──────────────────────────────┘
```

### Step 2: Verifikasi Data (`610:6078`)

```
┌──────────────────────────────┐
│  [←]  Verifikasi Data        │  Top bar
│  ●────●────●                 │  Step indicator ② aktif
│                              │
│  nama pemilik                │  Label (readonly)
│  ┌────────────────────────┐  │
│  │  Ihsan                 │  │  Isi (bg #f0f5fa)
│  └────────────────────────┘  │
│                              │
│  NIK                         │  Label (readonly)
│  ┌────────────────────────┐  │
│  │  20004411....          │  │  Isi
│  └────────────────────────┘  │
│                              │
│  No HP                       │  Label (readonly)
│  ┌────────────────────────┐  │
│  │  086573xxxx            │  │  Isi
│  └────────────────────────┘  │
│                              │
│  Alamat                      │  Label
│  ┌────────────────────────┐  │
│  │  Alamat usaha          │  │  Textarea
│  │  cateringmu....        │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │         Save           │  │  Button (bg #ff7622)
│  └────────────────────────┘  │
└──────────────────────────────┘
```

### Step 3: Proses Verifikasi (`610:6123`)

```
┌──────────────────────────────┐
│  [←]  Proses Verifikasi      │  Top bar
│  ●────●────●                 │  Step indicator ③ aktif
│                              │
│                              │
│                              │
│         [Logo]               │  Logo CateringHub 184×77
│                              │
│  Tunggu proses Verifikasi    │  Teks konfirmasi
│  dari pihak CateringHub      │  Sen Regular 14px
│  selama 1hari......          │  #a0a5ba
│                              │
│                              │
│                              │
│                              │
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Step Indicator — `Group 3405` + `Group 3410`

| Elemen | Detail Figma |
|--------|-------------|
| **Bullet ①②③** | Lingkaran 22×22, fill aktif `#ff7622`, text putih "1"/"2"/"3" — Sen 12px |
| **Connector lines** | Line 1px, inactive `#cccccc`, lebar 74px |
| **Divider** | Line 1px, `#f0f4f9` — full width di atas step indicator |

### 2. Top Bar

| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran 45×45, bg `#ecf0f4`, arrow stroke `#181c2e` weight 2 |
| **Title** | Sen Regular 17px, `#181c2e` — berubah per step |

### 3. Input Fields — `Name` group pattern

| Properti | Value |
|----------|-------|
| **Ukuran** | 327×56 |
| **Background** | `#f0f5fa` |
| **Border radius** | 10px |
| **Label** | Sen Regular 13-14px, `#32343e` |
| **Placeholder/value** | Sen Regular 14px, `#6b6e82` |

### 4. Textarea — `Bio` group

| Properti | Value |
|----------|-------|
| **Ukuran** | 327×103 |
| **Background** | `#f0f5fa` |
| **Border radius** | 8px |
| **Placeholder** | Sen Regular 14px, `#a0a5ba` |

### 5. Upload Logo — `Group 8268`

| Properti | Value |
|----------|-------|
| **Upload box** | 64×64, bg `#f0f5fa`, corner radius 20 |
| **Icon** | Upload/import icon (2 vectors), stroke `#131927` weight 1.5 |
| **Info text** | "Besar file maksimum 10 megabytes (10Mb)" — Sen 14px, `#a0a5ba` |

### 6. Save Button

| Properti | Value |
|----------|-------|
| **Ukuran** | 327×62 |
| **Background** | `#ff7622` |
| **Border radius** | 12px |
| **Text "Save"** | Sen Bold 16px, `#ffffff`, centered |

---

## Route & Backend Plan

### Database

| Table | Kolom baru | Keterangan |
|-------|-----------|------------|
| `caterings` | `owner_name`, `owner_nik`, `owner_phone`, `owner_address` | Data pemilik dari step 2 |
| `caterings` | `slogan`, `description` | Mungkin sudah ada — cek dulu |
| `caterings` | `registration_status` | `pending` / `verified` / `rejected` — status registrasi |

Atau buat tabel baru untuk registrasi sementara:

| Table | Kolom baru | Keterangan |
|-------|-----------|------------|
| `catering_registrations` | semua field step 1 + step 2 | Data sementara sebelum diverifikasi admin |

### Route Baru

```php
Route::get('/register/catering', [CateringRegistrationController::class, 'create'])->name('register.catering');
Route::post('/register/catering/step1', [CateringRegistrationController::class, 'storeStep1'])->name('register.catering.step1');
Route::post('/register/catering/step2', [CateringRegistrationController::class, 'storeStep2'])->name('register.catering.step2');
Route::post('/register/catering/submit', [CateringRegistrationController::class, 'submit'])->name('register.catering.submit');
```

### Controller

| Method | Fungsi |
|--------|--------|
| `create()` | Tampilkan form step 1 |
| `storeStep1(Request)` | Simpan data step 1 ke session → redirect ke step 2 |
| `storeStep2(Request)` | Simpan data step 2 ke session → redirect ke step 3 |
| `submit()` | Simpan semua data ke DB → buat catering baru (status pending) |

### Page Baru

- `resources/js/Pages/RegisterCatering.jsx` — Single page dengan 3 step UI (state-based, bukan multi-route)

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma untuk kebutuhan data**: Identifikasi field yang belum ada di tabel `caterings`. Slogan, description, owner fields mungkin perlu migration.
- [ ] **🎨 Cek resource Figma**: Ekstrak logo CateringHub dari frame `610:6148` atau `610:7982`. Ekstrak upload icon dari frame `610:6073`.
- [ ] Buat migration `add_registration_fields_to_caterings_table` jika perlu kolom baru
- [ ] Atau buat tabel `catering_registrations` untuk data sementara
- [ ] Buat `CateringRegistrationController` dengan 4 method
- [ ] Tambah routes di `routes/web.php`

### ⬜ Phase 2: Page Layout & Top Bar
- [ ] Buat `resources/js/Pages/RegisterCatering.jsx` — 1 page, 3 step UI
- [ ] Background `#ffffff`
- [ ] Back button — lingkaran `#ecf0f4` bg, arrow `#181c2e`
- [ ] Title dinamis per step
- [ ] Step indicator: 3 bullets dengan connector lines

### ⬜ Phase 3: Step 1 — Form Usaha Catering
- [ ] Input "nama Toko catering" — text field 327×56
- [ ] Input "Slogan catering (opsional)" — text field
- [ ] Textarea "Deskripsi (opsional)" — 327×103, bg `#f0f5fa`, corner radius 8
- [ ] Upload logo — box 64×64, upload icon, info text 10Mb max
- [ ] Save button — 327×62, `#ff7622`, "Save"

### ⬜ Phase 4: Step 2 — Verifikasi Data
- [ ] Input "nama pemilik" — readonly (dari user login)
- [ ] Input "NIK" — readonly/dari user
- [ ] Input "No HP" — readonly/dari user
- [ ] Textarea "Alamat" — editable
- [ ] Save button

### ⬜ Phase 5: Step 3 — Proses Verifikasi
- [ ] Logo CateringHub di tengah
- [ ] Teks "Tunggu proses Verifikasi dari pihak CateringHub selama 1hari......"
- [ ] Otomatis redirect ke halaman sukses/dashboard setelah beberapa detik

### ⬜ Phase 6: Integrasi & Polish
- [ ] Validasi form per step (required fields)
- [ ] Step navigation — back ke step sebelumnya
- [ ] Image upload untuk logo (storage + preview)
- [ ] Loading state saat submit
- [ ] Error handling — validasi server-side

### ⬜ Phase 7: Validasi Error (Browser)
- [ ] Buka halaman di browser (via `php artisan serve + Vite`)
- [ ] Ambil **browser snapshot** (DOM) — cek struktur halaman
- [ ] Cek **browser console logs** — pastikan tidak ada error/warning
- [ ] Cek step navigation (next/back)
- [ ] Cek form validation
- [ ] Cek **responsiveness** di viewport mobile (max-width 430px)
- [ ] Cek upload logo berfungsi

### ⬜ Phase 8: Figma Design Comparison

**Frame 1: formulir pendaftaran Step 1 (`610:6032`)**
- [ ] Screenshot Figma frame `610:6032` (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — perbaiki, ulang

**Frame 2: formulir pendaftaran Step 2 (`610:6078`)**
- [ ] Screenshot Figma frame `610:6078`
- [ ] Screenshot Web state yang sama
- [ ] Bandingkan & iterasi hingga ≥ 90%

**Frame 3: formulir pendaftaran Step 3 (`610:6123`)**
- [ ] Screenshot Figma frame `610:6123`
- [ ] Screenshot Web state yang sama
- [ ] Bandingkan & iterasi hingga ≥ 90%

### ⬜ Phase 9: Git Commit & Push
- [ ] `git add` semua perubahan
- [ ] `git commit` dengan pesan: `feat: 3-step seller registration form`
- [ ] `git push` ke remote repository

---

## Catatan Implementasi

- **Background**: `#ffffff`
- **Single page, 3 step**: Gunakan state `step` (1|2|3) untuk toggle UI, bukan routing terpisah
- **Step indicator**: 3 bullets horizontal — active `#ff7622`, inactive `#cccccc`, connector lines di antaranya
- **Upload logo**: Simpan ke `storage/app/public/` seperti pattern Add Menu
- **Data flow**: Simpan data step 1 di state component → kirim semua di submit final
- **Warna spesifik**: `#f0f5fa` untuk input bg, `#6b6e82` untuk placeholder, `#a0a5ba` untuk hint text
- **Logo CateringHub**: Gunakan logo yang sama dengan splash page
- **Dari mana user akses halaman ini?**: Mungkin dari sidebar/profile atau dari halaman login → perlu link navigasi
