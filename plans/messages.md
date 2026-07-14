# Messages (Buyer Chat) — USER_FIX

> **File Figma**: `unsaved-mrkp6a6k-mt6e0kqo`
> **Frame**:
>   - `610:3026` — Massages (375×812px) — Base (5 chat threads, bottom tab)
>   - `610:3263` — Massages (375×812px) — Variant layout
> **Background**: `#ffffff`
> **Updated**: 2026-07-14
> **Status**: 🔜 Belum diimplementasi

---

## State Overview

Page ini memiliki **1 state** dengan **2 tab**:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. Messages tab** | Tab "Messages" aktif | Daftar chat threads dengan avatar, nama, preview pesan, waktu, badge unread |
| **2. Notifications tab** | Tab "Notifications" aktif | Daftar notifikasi (layout berbeda — future scope) |

---

## Layout

```
┌──────────────────────────────┐
│  [←]      Messages           │  Top bar
│                              │
│  Notifications | Messages(3) │  Tab bar
│  ─────────────────────────── │
│                              │
│  ┌──────────────────────────┐│
│  │ [👤] Royal Parvej  19:37 ││  Chat Thread 1
│  │      Sounds awesome!  (1)││
│  ├──────────────────────────┤│
│  │ [👤] Cameron Will. 19:37 ││  Chat Thread 2
│  │      Ok, Just hurry... (2)││
│  ├──────────────────────────┤│
│  │ [👤] Ralph Edwards 19:37 ││  Chat Thread 3
│  │      Thanks dude.        ││
│  ├──────────────────────────┤│
│  │ [👤] Cody Fisher   19:37 ││  Chat Thread 4
│  │      How is going...?    ││
│  ├──────────────────────────┤│
│  │ [👤] Eleanor Pena  19:37 ││  Chat Thread 5
│  │      Thanks for the...   ││
│  └──────────────────────────┘│
│                              │
│  [grid] [menu]  [+ add]  🔔 │  Bottom Tab Bar
│                 [bell] [user]│
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar — `Top` (`610:3077`)

| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran 45×45, bg `#ecf0f4`, arrow stroke `#181c2e` weight 2 |
| **Title "Messages"** | Sen Regular 17px, `#181c2e` |

### 2. Tab Bar — `Group 3212` (`610:3071`)

| Elemen | Detail Figma |
|--------|-------------|
| **Tab "Notifications"** | Sen Regular 14px, `#a5a7b9` — posisi x:53 |
| **Tab "Messages (3)"** | Sen Bold 14px, `#ff7622` — posisi x:234 |
| **Active underline** | Line 2px, `#ff7622` — lebar 146px di bawah Messages tab |
| **Inactive underline** | Line 1px, `#ced7df` opacity 0.5 — full width |

### 3. Chat Thread — Template (`610:3027`)

| Elemen | Detail Figma |
|--------|-------------|
| **Avatar** | Lingkaran 32×32, bg `#98a8b8` |
| **Online indicator** | Lingkaran 8×8, fill `#1ad52b`, stroke `#ffffff` weight 1.5 — di pojok kanan bawah avatar |
| **User name** | Sen Regular 16px, `#32343e` — line height 24px |
| **Message preview** | Sen Regular 12px, `#373738` / `#afafaf` (read) — line height 20px |
| **Time** | Sen Regular 9px, `#373738` / `#afafaf` (read) |
| **Unread badge** | Lingkaran 22×22, fill `#ff7622`, text putih "1" atau "2" — Sen 12px |
| **Divider** | Line 1px, `#f0f4f9` — antar chat threads |

### 4. Bottom Tab Bar — `Tab` (`610:3091`)

| Elemen | Detail Figma |
|--------|-------------|
| **Background** | `#ffffff`, shadow top offset -4, blur 20, opacity 0.05 |
| **Grid icon** | 25×24 — 4 kotak, stroke `#afafaf` weight 1.5 |
| **Menu icon** | 25×24 — 3 garis, stroke `#afafaf` weight 1.5 |
| **Add button** | Lingkaran 57×57, stroke `#ff7622`, bg `#fff1f2` — icon plus stroke `#ff7622` weight 2 |
| **Bell icon** | 25×24 — stroke `#ff7622` (active) |
| **User icon** | 25×24 — stroke `#afafaf` |

---

## Route & Backend Plan

### Database
- **`messages`** — tabel baru jika ingin menyimpan chat history
- Atau gunakan tabel **`orders`** — setiap order punya thread chat antara buyer dan seller

| Table | Kolom baru | Keterangan |
|-------|-----------|------------|
| `messages` | `id`, `order_id`, `sender_id`, `receiver_id`, `message`, `created_at` | Tabel chat messages |

### Route Baru

```php
Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
Route::get('/messages/{order}/chat', [MessageController::class, 'show'])->name('messages.show');
Route::post('/messages/{order}/send', [MessageController::class, 'send'])->name('messages.send');
```

### Controller

| Method | Fungsi |
|--------|--------|
| `index()` | Tampilkan semua chat threads — group by order, latest message per order |
| `show(Order $order)` | Tampilkan detail chat untuk order tertentu |
| `send(Request, Order $order)` | Kirim pesan baru dalam order |

### Page Baru

- `resources/js/Pages/Messages.jsx` — Daftar chat threads
- `resources/js/Pages/MessagesChat.jsx` — Detail chat (mirip MessageScreen.jsx yang sudah ada)

---

## Milestone Implementasi

### ⬜ Phase 1: Database & Backend
- [ ] **🔍 Analisis Figma untuk kebutuhan data**: Perlu tabel `messages` untuk chat. Atau reuse dari tracking chat yang sudah ada.
- [ ] **🎨 Cek resource Figma**: Ekstrak icon grid/menu/bell/user/add dari frame `610:3026` jika belum ada di kode.
- [ ] Buat migration `create_messages_table` (kolom: id, order_id, sender_id, receiver_id, message, created_at)
- [ ] Update model `Order` dengan relasi `messages()`
- [ ] Buat `MessageController` dengan method `index()` — ambil semua order milik user, group by order, latest message
- [ ] Tambah routes di `routes/web.php`
- [ ] Pass data ke Inertia: `threads` (array of {order, user, last_message, unread_count})

### ⬜ Phase 2: Page Layout & Top Bar
- [ ] Buat `resources/js/Pages/Messages.jsx`
- [ ] Background `#ffffff`
- [ ] Back button — lingkaran `#ecf0f4` bg, arrow `#181c2e`
- [ ] Title "Messages" — Sen Regular 17px, `#181c2e`

### ⬜ Phase 3: Tab Bar
- [ ] Tab "Notifications" — Sen Regular 14px, `#a5a7b9`
- [ ] Tab "Messages (3)" — Sen Bold 14px, `#ff7622`, dengan badge count dinamis
- [ ] Active underline — line 2px `#ff7622`, lebar proporsional
- [ ] Inactive underline — line 1px `#ced7df`

### ⬜ Phase 4: Chat Thread List
- [ ] Avatar placeholder lingkaran 32×32, bg `#98a8b8`
- [ ] Online indicator — lingkaran 8×8, fill `#1ad52b`, stroke white
- [ ] User name — Sen Regular 16px, `#32343e`
- [ ] Message preview — Sen Regular 12px, `#373738` / `#afafaf` (sudah dibaca)
- [ ] Time — Sen Regular 9px, format "19:37"
- [ ] Unread badge — lingkaran 22×22, fill `#ff7622`
- [ ] Divider antar threads — line 1px `#f0f4f9`
- [ ] Click thread → buka halaman chat detail

### ⬜ Phase 5: Bottom Tab Bar
- [ ] Implement bottom tab sesuai Figma (grid, menu, add, bell, user)
- [ ] Bell icon active (stroke `#ff7622`)
- [ ] Add button dengan lingkaran dan icon plus

### ⬜ Phase 6: Validasi Error (Browser)
- [ ] Buka halaman di browser (via `php artisan serve + Vite`)
- [ ] Ambil **browser snapshot** (DOM) — cek struktur halaman
- [ ] Cek **browser console logs** — pastikan tidak ada error/warning
- [ ] Cek tab switching (Notifications ↔ Messages)
- [ ] Cek klik thread → navigasi ke chat detail
- [ ] Cek **responsiveness** di viewport mobile (max-width 430px)
- [ ] Cek empty state jika tidak ada chat

### ⬜ Phase 7: Figma Design Comparison

**Frame 1: Massages (`610:3026`)**
- [ ] Screenshot Figma frame `610:3026` (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/`

### ⬜ Phase 8: Git Commit & Push
- [ ] `git add` semua perubahan
- [ ] `git commit` dengan pesan: `feat: buyer messages page with chat threads`
- [ ] `git push` ke remote repository

---

## Catatan Implementasi

- **Background**: `#ffffff`
- **Perbedaan dengan MessageScreen yang sudah ada**: MessageScreen (`Delivery Man Message Screen`) adalah chat UI untuk tracking delivery. Halaman Messages ini adalah daftar semua chat thread buyer, bukan detail chat.
- **Bottom tab**: Mirip dengan bottom tab yang sudah ada di homepage, tapi dengan tambahan add button (+)
- **Unread count**: Tampilkan di tab title "Messages (3)" — update dinamis
- **Warna spesifik**: `#1ad52b` untuk online indicator, `#373738` untuk unread text, `#afafaf` untuk read text
