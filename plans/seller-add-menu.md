# ➕ Seller Tambah Menu — USER_FIX

> **File Figma**: `unsaved-mri02kq9-vihs832b`
> **Frame**: `610:6444` — Seller - Add new Items (375×983px)
> **Background**: `#ffffff`
> **Updated**: 2026-07-13
> **Status**: 🔜 Belum diimplementasi

---

## State Overview

Page ini memiliki **2 state**:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. Form Kosong** | Tap + di bottom tab / dari My Food | Form tambah menu baru, semua field kosong |
| **2. Form Terisi** | User mengisi form | Form dengan data terisi, button SAVE aktif |

---

## Layout

```
┌──────────────────────────────┐
│  [←]    Tambah Menu    Reset │  Top bar (y:50-95)
│                              │
│  Nama Menu                   │  y:119
│  ┌──────────────────────┐   │
│  │ Mazalichiken Halim    │   │  Input, bg #fdfdfd, stroke #e8eaed
│  └──────────────────────┘   │  radius 10, height 50
│                              │
│  Upload photo/video          │  y:213
│  ┌─────┐ ┌─────┐ ┌─────┐   │
│  │█████│ │  ⊕  │ │  ⊕  │   │  3 slots, 111×101 each
│  │photo│ │ Add │ │ Add │   │  slot 1 filled, 2-3 dashed
│  └─────┘ └─────┘ └─────┘   │
│                              │
│  PRice                       │  y:366
│  ┌────────┬──────────┐      │
│  │Rp.xxxx │   Box    │      │  148×42, divider vertikal
│  └────────┴──────────┘      │
│                              │
│  Kategori                    │  y:470
│  ☑ Acara   ☐ Snack          │  Checkboxes
│  ☐ Harian                    │
│                              │
│  Isi menu                    │  y:582
│  ┌──────────────────────┐   │
│  │                      │   │  Textarea 327×103, radius 8
│  └──────────────────────┘   │
│                              │
│  TAMBAHAN (opsional)         │  y:740
│  ┌──────────────────────┐   │
│  │ Lorem ipsum...       │   │  Textarea 326×103, radius 8
│  └──────────────────────┘   │
│                              │
│  ┌──────────────────────┐   │
│  │        SAVE          │   │  Button 327×62, bg #ff7622
│  └──────────────────────┘   │  radius 10, text white 18px
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Group (610:6499)`

| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran 45×45, bg `#ecf0f4`, arrow stroke `#32343e` weight 2 |
| **"Tambah Menu"** | Sen 17px Regular, `#32343e` |
| **"Reset"** | Sen 14px Regular, `#fb6d3a`, right-aligned |

### 2. Input: Nama Menu — `Group (610:6495)`

| Properti | Value |
|----------|-------|
| **Label** | "Nama Menu" — Sen 13px Regular, `#32343e`, letterSpacing 2% |
| **Input** | 327×50, bg `#fdfdfd`, stroke `#e8eaed` 1px inside, radius 10 |
| **Placeholder** | "Mazalichiken Halim" — Sen 12px Regular, `#9c9ba6`, letterSpacing 2% |

### 3. Upload Photo/Video — `Group (610:6452)`

| Properti | Value |
|----------|-------|
| **Label** | "Upload photo/video" — Sen 13px Regular, `#32343e` |
| **Slot 1 (filled)** | 111×101, fill `#98a8b8`, radius 20 |
| **Slot 2-3 (empty)** | 111×101, bg `#fdfdfd`, stroke `#e8eaed` 1px **dashed** [4,4], radius 10 |
| **Upload icon circle** | 41.5×41.5, fill `#523bb1` opacity 10% |
| **Upload icon** | 22×18, stroke `#523bb1`, weight 1.2 |
| **"Add" text** | Sen 13px Regular, `#9c9ba6` |

### 4. Input: Price — `Group (610:6476)`

| Properti | Value |
|----------|-------|
| **Label** | "PRice" — Sen 13px Regular, `#32343e` |
| **Input** | 148×42, bg `#fdfdfd`, stroke `#e8eaed`, radius 10 |
| **Left: "Rp.xxxx"** | Sen 14px Regular, `#9c9ba6` |
| **Divider** | Vertikal line `#e8eaed`, weight 1 |
| **Right: "Box"** | Sen 14px Regular, `#9c9ba6` |
| **Menu icon** | 11×10, 3 garis stroke `#9c9ba6` weight 1.5 |

### 5. Checkboxes: Kategori — `Group (610:6483)`

| Properti | Value |
|----------|-------|
| **Label** | "Kategori" — Sen 13px Regular, `#32343e` |
| **Checkbox** | 18×18, radius 3 |
| **Checked (Acara)** | Stroke `#fb6d3a` 1px, checkmark stroke `#fb6d3a` weight 1.5 |
| **Unchecked** | Fill `#fdfdfd`, stroke `#e8eaed` 1px |
| **Labels** | "Acara", "Snack", "Harian" — Sen 13px Regular, `#9c9ba6` |

### 6. Textarea: Isi Menu — `Group (610:6449)`

| Properti | Value |
|----------|-------|
| **Label** | "Isi menu" — Sen 13px Regular, `#32343e` |
| **Textarea** | 327×103, bg `#fdfdfd`, stroke `#e8eaed`, radius 8 |

### 7. Textarea: Tambahan — `Group (610:6445)`

| Properti | Value |
|----------|-------|
| **Label** | "TAMBAHAN (opsional)" — Sen 13px Regular, `#32343e` |
| **Textarea** | 326×103, bg `#fdfdfd`, stroke `#e8eaed`, radius 8 |
| **Placeholder** | Lorem ipsum text, Sen 12px Regular, `#6b6e82` |

### 8. SAVE Button — `Group (610:6506)`

| Properti | Value |
|----------|-------|
| **Button** | 327×62, fill `#ff7622`, radius 10 |
| **"SAVE"** | Sen 18px Regular, `#ffffff`, center-aligned |

---

## Route & Backend Plan

### Database

- **menus** — sudah ada, perlu kolom baru:
  - `images` (JSON) — multiple photo paths
  - `price_per_unit` (integer) — harga per box
  - `unit` (string) — "Box", "Porsi", dll
  - `ingredients` (JSON) — daftar bahan
  - `extras` (text) — tambahan opsional
  - `category_id` (FK) — sudah ada relasi

### Route Baru

```php
Route::middleware(['auth', 'seller'])->prefix('seller')->group(function () {
    Route::get('/menu/create', [SellerMenuController::class, 'create'])->name('seller.menu.create');
    Route::post('/menu', [SellerMenuController::class, 'store'])->name('seller.menu.store');
});
```

### Controller

| Method | Fungsi |
|--------|--------|
| `create()` | Tampilkan form tambah menu |
| `store(Request)` | Validasi & simpan menu baru → redirect ke My Food |

### Page Baru

- `resources/js/Pages/Seller/AddMenu.jsx` — Form tambah menu baru

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma**: Kolom baru di `menus`: `images` (JSON), `price_per_unit`, `unit`, `ingredients`, `extras`
- [ ] **🎨 Cek resource Figma**: Ekstrak upload icon dari frame `610:6444`
- [ ] Migration: tambah kolom `images`, `price_per_unit`, `unit`, `extras` ke `menus`
- [ ] Update model `Menu` ($fillable, $casts)
- [ ] Buat `SellerMenuController` dengan `create()` dan `store()`
- [ ] Tambah route `/seller/menu/create` dan `POST /seller/menu`
- [ ] Validasi: nama (required), harga (required, numeric), kategori (required), foto (min 1)

### ⬜ Phase 2: Top Bar & Input Nama
- [ ] Buat `resources/js/Pages/Seller/AddMenu.jsx`
- [ ] Back button — `#ecf0f4`, arrow `#32343e`
- [ ] Title "Tambah Menu" — Sen 17px `#32343e`
- [ ] "Reset" link — Sen 14px `#fb6d3a` (clear form)
- [ ] Input "Nama Menu" — 327×50, bg `#fdfdfd`, stroke `#e8eaed`, radius 10

### ⬜ Phase 3: Upload Photo/Video
- [ ] 3 slot upload, 111×101 each
- [ ] Slot filled: tampilkan preview image, radius 20
- [ ] Slot empty: dashed border `#e8eaed`, upload icon `#523bb1`, text "Add"
- [ ] File input hidden, trigger via click
- [ ] Max 3 photos

### ⬜ Phase 4: Price & Category
- [ ] Price input: 148×42, split "Rp.xxxx" | "Box" dengan divider vertikal
- [ ] Category checkboxes: Acara, Snack, Harian
- [ ] Checked state: stroke `#fb6d3a`, checkmark `#fb6d3a`
- [ ] Unchecked state: stroke `#e8eaed`

### ⬜ Phase 5: Textareas & Save Button
- [ ] "Isi menu" textarea — 327×103, radius 8
- [ ] "TAMBAHAN (opsional)" textarea — 326×103, radius 8
- [ ] SAVE button — 327×62, bg `#ff7622`, radius 10, text "SAVE" white 18px
- [ ] Form submit via Inertia `POST /seller/menu`

### ⬜ Phase 6: Validasi Error (Browser)
- [ ] Buka halaman di browser
- [ ] Cek console logs
- [ ] Cek responsiveness (page height 983px — scrollable)
- [ ] Test upload photo
- [ ] Test form validation (empty fields)
- [ ] Test Reset button

### ⬜ Phase 7: Figma Design Comparison
- [ ] Screenshot Figma frame `610:6444`
- [ ] Screenshot Web
- [ ] Bandingkan — target ≥ 90%

### ⬜ Phase 8: Git Commit & Push
- [ ] `git commit -m "feat: seller add menu form with photo upload, categories & ingredients"`
- [ ] `git push`

---

## Catatan Implementasi

- **Page height** 983px — perlu scroll di viewport 812px
- **Dashed border** `[4,4]` pada empty photo slots
- **Upload icon** color `#523bb1` (purple) — berbeda dari palette utama
- **Checkbox** custom 18×18 radius 3 (bukan native checkbox)
- **Price** split jadi 2 bagian: nominal + unit (Box/Porsi)
- **Reset** button di top bar — clear semua field
- **🎨 Figma Resources**: Ekstrak upload icon dari frame `610:6444`
