# 🧭 Sidebar Menu & Profile — USER_FIX

> **File Figma**: `unsaved-mqv4r6br-r7p2zye9`
> **Frame 1**: `610:7705` — Sidebar Menu (375×996px)
> **Frame 2**: `610:7654` — Sidebar - Informasi Pribadi (375×812px)
> **Frame 3**: `610:4798` — Sidebar - Edit Profile (375×846px)
> **Background**: `#ffffff`
> **Updated**: 2026-06-27
> **Status**: ✅ Selesai — Phase 1-5 complete. Build sukses. Validasi browser & Figma comparison belum dilakukan (browser MCP tidak terhubung).

---

## State Overview

Sidebar ini memiliki **3 state/page** yang membentuk flow profile user:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. Sidebar Menu** | Klik tombol hamburger/profile icon di halaman manapun | Overlay menu dari kanan — profile card + menu navigasi + logout |
| **2. Informasi Pribadi** | Klik "Informasi Pribadi" di menu | Lihat data diri (read-only): nama, email, no telepon, alamat |
| **3. Edit Profile** | Klik "EDIT" di Informasi Pribadi / tombol edit profile | Form edit: nama lengkap, email, no telepon, deskripsi/bio, foto profile |

---

## Layout

### Frame 1: Sidebar Menu (375×996px)

```
┌──────────────────────────────┐
│ [←]   Profile           [⋮] │  Top bar — bg #ecf0f4 circle 45×45
│                              │
│  ┌────────────────────────┐  │
│  │ 👤                     │  │  Profile card (24,119 — 286×100)
│  │ Vishal Khadok          │  │  Nama: Sen Bold 20px #32343e
│  │ Pecinta menu rumahan   │  │  Bio: Sen 14px #a0a5ba
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │  Group 1 (24,251 — 327×136) bg #f6f8fa r-16
│  │ 🔶 Informasi Pribadi   │  │  Icon person orange #fb6f3d, chevron →
│  │ 📍 Alamat Pengiriman   │  │  Icon map purple #413dfb, chevron →
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │  Group 2 (24,407 — 327×248) bg #f6f8fa r-16
│  │ 🛒 Keranjang Belanja   │  │  Icon cart blue #369bff, chevron →
│  │ ❤️ Menu Favorit        │  │  Icon heart purple #b33dfb, chevron →
│  │ 🔔 Notivikasi          │  │  Icon bell yellow #ffaa2a, chevron →
│  │ 💳 Metode Pembayaran   │  │  Icon card blue #369bff, chevron →
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │  Group 3 (24,675 — 327×192) bg #f6f8fa r-16
│  │ ❓ Tanya Jawab (FAQ)   │  │  Icon question orange #fb6d3a, chevron →
│  │ 🧑‍🍳 Buka Catering      │  │  Icon chef cyan #2ae1e1, chevron →
│  │ ⚙️ Pengaturan          │  │  Icon gear purple #413dfb, chevron →
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │  Logout (24,887 — 327×80) bg #f6f8fa r-16
│  │ 🔴 Log Out             │  │  Icon logout red #fb4a59, chevron →
│  └────────────────────────┘  │
└──────────────────────────────┘
```

### Frame 2: Sidebar - Informasi Pribadi (375×812px)

```
┌──────────────────────────────┐
│ [←]   Informasi Pribadi EDIT │  Top bar + Edit link orange #ff7622 underline
│                              │
│  ┌────────────────────────┐  │
│  │ 👤                     │  │  Profile pic 100×100, rounded-full
│  │ Vishal Khadok          │  │  Sen Bold 20px #181c2e
│  │ Pecinta menu rumahan   │  │  Sen 14px #a0a5ba
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │  Card bg #f6f8fa r-16 (24,251 — 327×351)
│  │ 👤 nama                │  │  Label #32343e 14px
│  │   Vishal Khadok        │  │  Field #6b6e82 14px
│  │                        │  │
│  │ ✉️ Email               │  │  Email icon #413dfb
│  │   hello@halallab.co    │  │
│  │                        │  │
│  │ 📞 NOmor telepon       │  │  Call icon #369bff
│  │   408-841-0926         │  │
│  │                        │  │
│  │ 📍 alamat saat ini     │  │  Map icon #413dfb
│  │   408-841-0926         │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

### Frame 3: Sidebar - Edit Profile (375×846px)

```
┌──────────────────────────────┐
│ [←]   Edit Profile           │  Top bar — no more/⋮ button
│                              │
│       ┌──────────┐           │  Profile pic 130×130, centered (x:123)
│       │  👤      │           │  Edit icon overlay (x:212,y:212) 41×41
│       │   ✏️     │           │  Orange circle #ff7622 + white pencil
│       └──────────┘           │
│                              │
│  nama lengkap                │  Label #32343e 14px
│  ┌────────────────────────┐  │  Input bg #f0f5fa r-10, 327×56
│  │ Vishal Khadok          │  │  Text #6b6e82 14px
│  └────────────────────────┘  │
│                              │
│  Email                       │
│  ┌────────────────────────┐  │
│  │ hello@halallab.co      │  │
│  └────────────────────────┘  │
│                              │
│  Nomor telepon               │
│  ┌────────────────────────┐  │
│  │ 408-841-0926           │  │
│  └────────────────────────┘  │
│                              │
│  Deskripsi                   │
│  ┌────────────────────────┐  │  Textarea 327×103, bg #f0f5fa r-8
│  │ Pecinta menu rumahan   │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │  Button Save (24,754 — 327×62)
│  │         Save           │  │  Bg #ff7622 r-12, text white Bold 16px
│  └────────────────────────┘  │
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Group Top`

Semua frame punya pola top bar yang sama:

| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran 45×45, bg `#ecf0f4`, arrow stroke `#181c2e` weight 2 |
| **Title** | Sen 17px, `#181c2e`, Regular (400) |
| **More (⋮)** | *(hanya di Sidebar Menu)* Lingkaran 45×45, bg `#ecf0f4`, 3 titik stroke `#181c2e` weight 2 |
| **EDIT link** | *(hanya di Informasi Pribadi)* Text "EDIT" Sen 14px, `#ff7622`, underline — posisi kanan |

### 2. Profile Card — `Group Profile`

| Properti | Value |
|----------|-------|
| **Ukuran** | 100×100px (Sidebar Menu & Info Pribadi) / 130×130px (Edit Profile) |
| **Shape** | Lingkaran penuh (cornerRadius: 170 via RECTANGLE/VECTOR) |
| **Image** | Placeholder dari Figma (imageHash: `a0f96c9b...`) |
| **Nama** | Sen Bold 20px, `#32343e` (Menu) / `#181c2e` (Info & Edit) |
| **Bio** | Sen 14px, `#a0a5ba`, lineHeight 24px |

**Edit icon overlay** (hanya di Edit Profile):
| Elemen | Value |
|--------|-------|
| **Circle bg** | 41×41px, `#ff7622` |
| **Pencil icon** | White stroke, weight ~1.3, dari Figma vector |

### 3. Menu Groups (Sidebar Menu)

**Group 1 — Informasi & Alamat** (`610:7786`):

| Item | Icon Color | Text |
|------|-----------|------|
| Informasi Pribadi | `#fb6f3d` (orange) | Sen 16px Regular, `#32343e` |
| Alamat Pengiriman | `#413dfb` (purple) | Sen 16px Regular, `#32343e` |

**Group 2 — Belanja** (`610:7749`):

| Item | Icon Color | Text |
|------|-----------|------|
| Keranjang Belanja | `#369bff` (blue) | Sen 16px Regular, `#32343e` |
| Menu Favorit | `#b33dfb` (purple) | Sen 16px Regular, `#32343e` |
| Notivikasi | `#ffaa2a` (yellow) | Sen 16px Regular, `#32343e` |
| Metode Pembayaran | `#369bff` (blue) | Sen 16px Regular, `#32343e` |

**Group 3 — Lainnya** (`610:7719`):

| Item | Icon Color | Text |
|------|-----------|------|
| Tanya Jawab (FAQ) | `#fb6d3a` (orange) | Sen 16px Regular, `#32343e` |
| Buka Catering | `#2ae1e1` (cyan) | Sen 16px Regular, `#32343e` |
| Pengaturan | `#413dfb` (purple) | Sen 16px Regular, `#32343e` |

Setiap item: tinggi 40px, icon bulat 40×40 bg `#ffffff`, chevron kanan stroke `#747783` weight 1.5.

**Logout** (`610:7706`):

| Elemen | Value |
|--------|-------|
| **Background** | Rectangle 327×80, bg `#f6f8fa`, radius 16 |
| **Icon** | Lingkaran 40×40 bg `#ffffff`, icon logout stroke `#fb4a59` |
| **Text** | "Log Out" Sen 15px Regular, `#32343e` |
| **Chevron** | Sama seperti menu items |

### 4. Form Fields (Edit Profile)

Setiap field memiliki pola sama:

| Properti | Value |
|----------|-------|
| **Label** | Sen 14px Regular, `#32343e` |
| **Input bg** | Rectangle 327×56px, bg `#f0f5fa`, radius 10 |
| **Input text** | Sen 14px Regular, `#6b6e82`, padding kiri 20px (44 - 24) |
| **Spacing** | Label y:280/385/490, Input y:305/410/515 |

Field khusus **Bio/Deskripsi**:
| Properti | Value |
|----------|-------|
| **Input bg** | Rectangle 327×103px, bg `#f0f5fa`, radius 8 |
| **Spacing** | Label y:595, Input y:619 |

### 5. Save Button

| Properti | Value |
|----------|-------|
| **Ukuran** | 327×62px |
| **Background** | `#ff7622` |
| **Border radius** | 12px |
| **Text** | "Save" — Sen Bold 16px, `#ffffff`, centered |
| **Position** | y:754 |

### 6. Informasi Pribadi Fields (Read-only)

Dalam card bg `#f6f8fa` radius 16 (327×351px):

| Field | Icon | Label | Value |
|-------|------|-------|-------|
| Nama | 👤 person #fb6f3d | `nama` | `Vishal Khadok` |
| Email | ✉️ #413dfb | `Email` | `hello@halallab.co` |
| No telepon | 📞 #369bff | `NOmor telepon` | `408-841-0926` |
| Alamat | 📍 #413dfb | `alamat saat ini` | `408-841-0926` |

Setiap baris: icon 40×40 bg putih, label #32343e 14px, field #6b6e82 14px.

---

## Route & Backend Plan

### Database

| Table | Kolom baru | Keterangan |
|-------|-----------|------------|
| `users` | `phone` (string, nullable) | Nomor telepon — sudah ada dari migration sebelumnya |
| `users` | `bio` (text, nullable) | Deskripsi/bio — ✅ migration `2026_06_27_000001` |
| `users` | `avatar` (string, nullable) | Path foto profile — ✅ migration `2026_06_27_000001` |

### Route Baru

```php
Route::middleware('auth')->group(function () {
    Route::get('/profile/info', [ProfileController::class, 'info'])->name('profile.info');
    Route::get('/profile/edit-profile', [ProfileController::class, 'editProfile'])->name('profile.edit-profile');
    Route::post('/profile/update', [ProfileController::class, 'updateProfile'])->name('profile.update-info');
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.update-avatar');
});
```
✅ Semua route terdaftar di `routes/web.php`

### Controller

✅ `ProfileController` — method `info()`, `editProfile()`, `updateProfile()`, `updateAvatar()` semua sudah ada.

### Page

| Page | File | Status |
|------|------|--------|
| Sidebar Menu | `resources/js/Components/SidebarMenu.jsx` | ✅ 278 baris, inline SVGs |
| Informasi Pribadi | `resources/js/Pages/Profile/InformasiPribadi.jsx` | ✅ 134 baris |
| Edit Profile | `resources/js/Pages/Profile/EditProfile.jsx` | ✅ 203 baris |

---

## Milestone Implementasi

### ✅ Phase 1: Database & Backend
- [x] **🔍 Analisis Figma untuk kebutuhan data**: Kolom `phone`, `bio`, `avatar` di tabel `users`
- [x] **🎨 Cek resource Figma**: Semua icon diimplementasikan sebagai inline SVG langsung di komponen
- [x] Buat migration `add_bio_and_avatar_to_users_table` (kolom: `bio` text nullable, `avatar` string nullable)
- [x] Update `User` model: tambah `$fillable` (phone, bio, avatar) & casts
- [x] Update `ProfileController`: tambah method `info()`, `editProfile()`, `updateProfile()`
- [x] Tambah route di `routes/web.php`: `profile.info`, `profile.edit-profile`, `profile.update-info`, `profile.update-avatar`

### ✅ Phase 2: Sidebar Menu Component (Overlay)
- [x] Buat `resources/js/Components/SidebarMenu.jsx` — component overlay
- [x] Background: component fixed dengan backdrop semi-transparan
- [x] Sidebar panel: posisi kanan, 375px width, white bg, slide-in animation (CSS translate + opacity transition)
- [x] Back button — lingkaran 45×45 bg `#ecf0f4`, arrow stroke `#181c2e` (inline SVG)
- [x] Title "Profile" — Sen 17px, `#181c2e`
- [x] More (⋮) button — circle 45×45 bg `#ecf0f4`, 3 titik stroke `#181c2e`
- [x] Profile card — foto lingkaran 100×100, nama Sen Bold 20px `#32343e`, bio Sen 14px `#a0a5ba`
- [x] Group 1 (Informasi & Alamat) — card bg `#f6f8fa` r-16, item dengan icon + chevron
- [x] Group 2 (Belanja) — card bg `#f6f8fa` r-16
- [x] Group 3 (Lainnya) — card bg `#f6f8fa` r-16
- [x] Logout section — card bg `#f6f8fa` r-16, icon merah `#fb4a59`
- [x] Integrasikan ke `Home.jsx` — toggle via `showSidebar` state

### ✅ Phase 3: Informasi Pribadi Page
- [x] Buat `resources/js/Pages/Profile/InformasiPribadi.jsx`
- [x] Back button — lingkaran `#ecf0f4` bg, arrow `#181c2e`
- [x] Title "Informasi Pribadi" — Sen 17px, `#181c2e`
- [x] EDIT link — Sen 14px, `#ff7622`, underline — navigasi ke Edit Profile
- [x] Profile card — foto 100×100, nama Sen Bold 20px `#181c2e`, bio 14px `#a0a5ba`
- [x] Card info — bg `#f6f8fa` r-16, 4 baris (nama, email, telepon, alamat)

### ✅ Phase 4: Edit Profile Page
- [x] Buat `resources/js/Pages/Profile/EditProfile.jsx`
- [x] Back button — lingkaran `#ecf0f4` bg, arrow `#181c2e`
- [x] Title "Edit Profile" — Sen 17px, `#181c2e`
- [x] Foto profile 130×130, centered, dengan edit icon overlay `#ff7622`
- [x] Field "nama lengkap" — input bg `#f0f5fa` r-10
- [x] Field "Email" — input bg `#f0f5fa` r-10
- [x] Field "Nomor telepon" — input bg `#f0f5fa` r-10
- [x] Field "Deskripsi" — textarea bg `#f0f5fa` r-8
- [x] Button "Save" — bg `#ff7622` r-12, text white Bold 16px
- [x] Form submit → POST ke `profile.update-info`
- [x] Avatar upload — klik edit icon → file picker → upload via form

### ✅ Phase 5: Integrasi & Polish
- [x] Navigation: "Informasi Pribadi" di Sidebar Menu → route `profile.info`
- [x] Navigation: "EDIT" di Informasi Pribadi → route `profile.edit-profile`
- [x] Navigation: "Alamat Pengiriman" → route `location.index`
- [x] Navigation: "Keranjang Belanja" → `route('checkout')`
- [ ] Navigation: "Menu Favorit" → route favorites (belum ada halamannya)
- [ ] Navigation: "Notivikasi" → route notifications (belum ada halamannya)
- [ ] Navigation: "Metode Pembayaran" → route payment methods (belum ada)
- [ ] Navigation: "FAQ" → route faq (belum ada halamannya)
- [ ] Navigation: "Buka Catering" → route open catering (belum ada)
- [ ] Navigation: "Pengaturan" → route settings (belum ada)
- [x] Navigation: "Log Out" → POST logout
- [ ] Loading state — spinner/skeleton saat data loading
- [x] Error handling — validasi form di EditProfile, fallback avatar placeholder
- [x] Slide animation untuk sidebar overlay (CSS `transition-transform duration-300`)

### ⬜ Phase 6: Validasi Error (Browser)
- [ ] Buka halaman di browser (via `php artisan serve + Vite`)
- [ ] Ambil **browser snapshot** (DOM) — cek struktur setiap halaman
- [ ] Cek **browser console logs** — pastikan tidak ada error/warning
- [ ] Cek semua interaksi user (click menu items, back button, form input, save)
- [ ] Cek **responsiveness** di viewport mobile (max-width 430px)
- [ ] Cek empty state jika user tidak punya data profile
- [ ] Cek error/loading state

### ⬜ Phase 7: Figma Design Comparison (Per-Frame Sequential)

**Frame 1: Sidebar Menu (`610:7705`)**
- [ ] Screenshot Figma frame `610:7705` — Sidebar Menu (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/` → lanjut Frame 2

**Frame 2: Sidebar - Informasi Pribadi (`610:7654`)**
- [ ] Screenshot Figma frame `610:7654` — Informasi Pribadi
- [ ] Screenshot Web state yang sama
- [ ] Bandingkan dengan `design_compare`
- [ ] Jika skor < **90%** — perbaiki, ulang
- [ ] Jika skor ≥ **90%** — simpan screenshot final → lanjut Frame 3

**Frame 3: Sidebar - Edit Profile (`610:4798`)**
- [ ] Screenshot Figma frame `610:4798` — Edit Profile
- [ ] Screenshot Web state yang sama
- [ ] Bandingkan dengan `design_compare`
- [ ] Jika skor < **90%** — perbaiki, ulang
- [ ] Jika skor ≥ **90%** — simpan screenshot final

### ⬜ Phase 8: Git Commit & Push
- [ ] `git add` semua perubahan
- [ ] `git commit` dengan pesan: `feat: implement sidebar menu, informasi pribadi, and edit profile pages`
- [ ] `git push` ke remote repository

---

## Catatan Implementasi

- **Background**: `#ffffff` untuk semua frame (global: `#e8e8e8` di body, 430px white container)
- **Dimensi**: 375×996 / 375×812 / 375×846px, mobile-first max-width 430px
- **Font**: Sen konsisten (sudah di Tailwind config + inline fallback)
- **Sidebar Menu** adalah **overlay component** yang di-render di halaman induk (Home), BUKAN page terpisah — sliding dari kanan dengan backdrop
- **Informasi Pribadi** dan **Edit Profile** adalah **halaman Inertia terpisah** (bisa diakses langsung via URL)
- **Link ke halaman lain**:
  - Informasi Pribadi → `route('profile.info')`
  - Edit Profile → `route('profile.edit-profile')`
  - Alamat Pengiriman → `route('location.index')`
  - Menu Favorit → perlu route & page sendiri (belum ada)
  - Metode Pembayaran → perlu route & page sendiri (belum ada)
  - FAQ → perlu halaman sendiri
  - Pengaturan → perlu halaman sendiri
- **Warna spesifik**:
  - Card bg: `#f6f8fa` untuk menu groups & info card
  - Input bg: `#f0f5fa` untuk form fields
  - Item text: `#32343e` untuk menu label
  - Field text: `#6b6e82` untuk input values
  - Icon bulat: 40×40 `#ffffff` dengan stroke icon
- **Build status**: `npx vite build` ✅ sukses tanpa error
- **Slide animation**: Sidebar menggunakan `translate-x-full` ↔ `translate-x-0` dengan `transition-transform duration-300 ease-in-out`
- **Storage**: `php artisan storage:link` ✅ sudah ada untuk upload avatar
