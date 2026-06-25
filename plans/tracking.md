# 🗺️ Tracking & Delivery — USER_FIX

> **File Figma**: `unsaved-mqt9vr0i-b3u8pp3t`
> **Frames**:
>   - `610:7468` — Tracking Order_01 (375×812px) — Map with route + timeline bottom card + courier contact
>   - `610:7278` — Tracking Order_02 (375×812px) — Map with ETA + courier details (card positioned higher)
>   - `610:7245` — Delivery Man Call Screen (375×812px) — Dark bg, blur overlay, bottom sheet with profile, "Berdering.......", red end-call
>   - `610:7169` — Delivery Man Message Screen (375×812px) — Chat UI with 5 messages, input bar
> **Background**: `#ffffff` (frames 1, 2, 4), `#121223` (frame 3)
> **Updated**: 2026-06-26
> **Status**: ✅ Selesai (Phase 1-11 complete)

---

## State Overview

Halaman Tracking memiliki **4 state** utama:

| State | Trigger | Deskripsi |
|-------|---------|-----------|
| **1. Tracking Order_01** | Klik "Lacak" dari Pesanan → status = confirmed/preparing | Map + route line + bottom card timeline (4 langkah) + courier contact |
| **2. Tracking Order_02** | Status berlanjut ke picked_up/arriving_soon | Map + ETA "20 min" + courier info + contact (Call/Chat) |
| **3. Call Screen** | Klik Call icon dari Tracking | Dark overlay + bottom sheet profile courier + "Berdering......." + red end-call button |
| **4. Message Screen** | Klik Chat icon dari Tracking | Chat UI riwayat pesan + input bar |

---

## Layout

### State 1: Tracking Order_01 (`610:7468`)

```
┌──────────────────────────────┐
│  [←]     Track Order         │  Top bar — back #212029, title Sen 17px
│                              │
│  ┌──────────────────────────┐│
│  │      MAP BACKGROUND      ││  Road network #d0d9e1, full bg
│  │           🟡             ││  Origin: white circle #ffb800
│  │         ╲                ││  Route line: gradient #ffa800→#f45e3d, 6px
│  │          ╲               ││
│  │           🔴             ││  Destination: red #f14237 pin
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│  Bottom Card — rounded-t-[24px], shadow
│  │ ═══════════               ││  Drag handle #d8e3ed 70×7 rounded-80
│  │                          ││
│  │ 🖼️  Uttora Coffee House   ││  Restaurant: image 63×63 + name + items
│  │     Ordered at 06 Sept    ││  #181c2e 18px / #a0a5ba 14px
│  │     2x Burger  4x Sanwitch││  #646982 13px
│  │                          ││
│  │      20 min              ││  ETA — ExtraBold 30px #181c2e
│  │  Estimated delivery time  ││  #a0a5ba 14px
│  │                          ││
│  │  ● Order received     ✓  ││  Step 1 — orange circle + checkmark (#ff7622)
│  │  ● Food preparing     ◌  ││  Step 2 — orange circle + loader icon
│  │  ○ Picked up          ✓  ││  Step 3 — gray circle + white check
│  │  ○ Arriving soon      ✓  ││  Step 4 — gray circle + white check
│  │                          ││
│  │  👤 Robert F.  📞  💬   ││  Courier: 54×54 photo, name, Call, Chat
│  │     Courier              ││
│  └──────────────────────────┘│
└──────────────────────────────┘
```

### State 2: Tracking Order_02 (`610:7278`)

```
┌──────────────────────────────┐
│  [←]     Track Order         │  Top bar
│                              │
│  ┌──────────────────────────┐│
│  │      MAP BACKGROUND      ││  Same road network
│  │         🟡               ││  Origin: 3-ring pulse (10% / 60% yellow)
│  │         ╲                ││  Route line gradien #ffa800→#f45e3d
│  │          ╲               ││
│  │           🔴             ││  Destination: red pin
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│  Bottom Card (y:240 — lebih tinggi)
│  │ ═══════════               ││  Drag handle
│  │                          ││
│  │ 🖼️  Uttora Coffee House   ││  Restaurant info
│  │     Ordered at 06 Sept    ││
│  │     2x Burger  4x Sanwitch││
│  │                          ││
│  │      20 min              ││  ETA — ExtraBold 30px #181c2e
│  │  Estimated delivery time  ││
│  │                          ││
│  │  ● Order received     ✓  ││  Timeline sama
│  │  ● Food preparing     ◌  ││
│  │  ○ Picked up          ✓  ││
│  │  ○ Arriving soon      ✓  ││
│  │                          ││
│  │  👤 Robert F.  📞  💬   ││  Courier contact (sama)
│  └──────────────────────────┘│
└──────────────────────────────┘
```

### State 3: Delivery Man Call Screen (`610:7245`)

```
┌──────────────────────────────┐
│                              │
│                              │
│                              │
│       (BLUR OVERLAY)         │  #273f55 at 67% opacity, layer blur
│         #121223 bg           │
│                              │
│                              │
│                              │
│  ┌──────────────────────────┐│  Bottom Sheet — white, rounded-t-[24px]
│  │                          ││
│  │       ⭕ (105×105)       ││  Profile photo — circle, image fill
│  │    Amanda Ketring        ││  Sen Bold 20px #181c2e
│  │    Berdering.......      ││  Sen 16px #979797
│  │                          ││
│  │    🔊       🔴       🔇 ││  Speaker(48×48) | EndCall(60×60) | Mute(48×48)
│  │                          ││  #ecf0f4 | #ff3434 | #ecf0f4
│  │                          ││
│  │  ┌────────────────────┐  ││
│  │  │    Konfirmasi       │  ││  Button #ff7622 327×62 rounded-12
│  │  └────────────────────┘  ││  Sen Bold 16px white
│  └──────────────────────────┘│
└──────────────────────────────┘
```

### State 4: Delivery Man Message Screen (`610:7169`)

```
┌──────────────────────────────┐
│  [✕]   Amanda Katering       │  Top bar — Close #ecf0f4, title Sen 17px
│                              │
│  ┌──────────────────────────┐│
│  │   ┌──────────┐  🕐8:10  ││  Chat 1 (user): orange #fc6e2a bubble
│  │   │Pesanan   │  ✓✓ orange││  double-check orange
│  │   │saya aman?│           ││
│  │   └──────────┘           ││
│  │                          ││
│  │  🕐8:11 ┌──────────────┐││  Chat 2 (courier): gray #f0f5fa bubble
│  │         │Aman, sudah   │││  Courier avatar 40×40 circle
│  │         │diantar       │││
│  │         │ketujuan      │││
│  │         └──────────────┘││
│  │                          ││
│  │   ┌──────────────────┐  ││  Chat 3 (user): orange bubble
│  │   │Posisi sudah di   │ ✓✓││  double-check orange
│  │   │mana ya ?         │   ││
│  │   └──────────────────┘   ││
│  │                          ││
│  │  🕐8:12 ┌──────────────┐││  Chat 4 (courier): gray bubble
│  │         │Sebentar lagi │││
│  │         │di tunggu ya..│││
│  │         └──────────────┘││
│  │                          ││
│  │   ┌────────────┐  🕐8:12││  Chat 5 (user): orange bubble
│  │   │Tolong cepat│  ✓✓ gr││  double-check gray
│  │   └────────────┘        ││
│  │                          ││
│  │  ┌──────────────────────┐││  Input bar #f0f5fa rounded-12
│  │  │Ketikan pesan   😊 📤│││  Placeholder Sen 16px #a0a5ba
│  │  └──────────────────────┘││  Smile icon + Send button
│  └──────────────────────────┘│
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Top Bar (Tracking) — `Group (610:7648)` / `(610:7462)`

| Elemen | Detail Figma |
|--------|-------------|
| **Back button** | Lingkaran 45×45, bg `#212029`, arrow stroke `#ffffff` weight 2 |
| **Title "Track Order"** | Sen 17px, `#181c2e`, lineHeight 22px |

### 2. Top Bar (Chat Screen) — `(610:7169)`

| Elemen | Detail Figma |
|--------|-------------|
| **Close button** | Lingkaran 45×45, bg `#ecf0f4`, icon X `#181c2e` |
| **Title "Amanda Katering"** | Sen 17px, `#181c2e` |
| **Note:** | Tidak ada More/Cart button |

### 3. Map Background — `Group (610:7469)`

| Properti | Value |
|----------|-------|
| **Posisi** | Full screen (extends beyond frame) |
| **Road/Path fill** | `#d0d9e1` — semua path vector solid |
| **Route line** | Vector stroke gradient `#ffa800→#f45e3d`, weight 6px, rounded-12 |
| **Origin pin** | Ellipse 17×17, fill putih, stroke `#ffb800` weight 4 *(Tracking_01)* |
| **Origin pin (02)** | 3-ring pulse: outer 84×84 #ffc224 10%, middle 62×62 #ffc224 60%, inner 17×17 white #ffb800 |
| **Destination pin** | Ellipse 62×62, fill `#f14237` (merah) dengan pin icon putih di tengah |

> Map adalah static image/vector, bukan interactive map engine (Google Maps). Implementasi sebagai SVG background atau gambar statis.

### 4. Bottom Card — `Rectangle 1570` (`610:7573`)

| Properti | Value |
|----------|-------|
| **Ukuran** | 375×572px |
| **Background** | `#ffffff` |
| **Border radius** | TopLeft/TopRight: 24px, Bottom: 0px |
| **Shadow** | Drop shadow `#3a7799` opacity 0.15, offset (0,-2), radius 40 |
| **Drag handle** | Rectangle 70×7, bg `#d8e3ed`, rounded-80, center x:152, y:661/246 |

### 5. Restaurant Info Section — `Group (610:7629)` / `(610:7451)`

| Elemen | Detail |
|--------|--------|
| **Restaurant image** | Rectangle 63×63, rounded-10, image fill |
| **Restaurant name** | "Uttora Coffee House" — Sen 18px, `#181c2e` |
| **Order time** | "Orderd at 06 Sept, 10:00pm" — Sen 14px, `#a0a5ba` |
| **Item 1** | "2x Burger" — Sen 13px, `#646982` |
| **Item 2** | "4x Sanwitch" — Sen 13px, `#646982` |

> Data source: `order.items` + `order.catering`

### 6. Timeline / ETA Section — `Group (610:7591)` / `(610:7413)`

| Properti | Value |
|----------|-------|
| **ETA number** | "20 min" — Sen ExtraBold 30px, `#181c2e` |
| **ETA label** | "Estimated delivery time" — Sen 14px, `#a0a5ba` |
| **Step icons** | Lingkaran 16-17px, timeline dengan garis vertikal |

**4 Steps Timeline:**

| Step | Circle | Icon | Label | Warna |
|------|--------|------|-------|-------|
| 1 | 17px orange `#ff7622` | Checkmark putih | "Your order has been received" | `#ff7622` (active) |
| 2 | 16px orange `#ff7622` | Loader (spinner) icon putih | "The restaurant is preparing your food" | `#a0a5ba` |
| 3 | 16px gray `#bfbcba` | Checkmark putih | "Your order has been picked up for delivery" | `#a0a5ba` |
| 4 | 16px gray `#bfbcba` | Checkmark putih | "Order arriving soon!" | `#a0a5ba` |

| **Connecting lines** | Garis vertikal 1px, step1→2: `#ff7622`, step2→3: `#a0a5ba`, step3→4: `#a0a5ba` |

### 7. Courier Contact Section — `Group (610:7574)` / `(610:7396)`

| Elemen | Detail |
|--------|--------|
| **Profile photo** | Ellipse 54×54, fill `#c4c4c4` + IMAGE fill |
| **Name** | "Robert F." — Sen Bold 20px, `#181c2e` |
| **Role** | "Courier" — Sen 14px, `#a0a5ba`, lineHeight 24px |
| **Call icon** | Lingkaran 45×45, bg `#ff7622` + phone-call icon putih 18×18 |
| **Call glow** | Ellipse 39×26, bg `#ff7622` opacity 0.6, layer blur 30px |
| **Chat icon** | Lingkaran 45×45, bg putih, stroke `#ff7622` weight 1, chat vector `#ff7622` 22×22 |

### 8. Call Screen Bottom Sheet — `(610:7245)`

| Properti | Value |
|----------|-------|
| **Background** | `#121223` (full screen) |
| **Blur overlay** | Rectangle 375×812, `#273f55` opacity 0.67, layer blur (10px) |
| **Bottom sheet bg** | `#ffffff`, 375×572, rounded-t-[24px] |

| Elemen | Detail |
|--------|--------|
| **Profile photo** | Ellipse 105×105, fill `#c4c4c4` + IMAGE |
| **Name** | "Amanda Ketring" — Sen Bold 20px, `#181c2e` |
| **Status** | "Berdering......." — Sen 16px, `#979797` |
| **End call button** | Lingkaran 60×60, bg `#ff3434`, phone-off icon putih 24×24 |
| **Speaker button** | Lingkaran 48×48, bg `#ecf0f4`, speaker icon `#181c2e` |
| **Mute button** | Lingkaran 48×48, bg `#ecf0f4`, mic-off icon `#181c2e` |
| **Konfirmasi button** | Rectangle 327×62, bg `#ff7622`, rounded-12, text "Konfirmasi" Sen Bold 16px white |

### 9. Chat Screen — `(610:7169)`

#### 9a. Chat Messages

| # | Pengirim | Pesan | Waktu | Bubble Style |
|---|----------|-------|-------|-------------|
| 1 | User | "Pesanan saya aman ?" | 8:10 pm | Orange `#fc6e2a`, right-aligned, double-check orange |
| 2 | Courier | "Aman, sudah diantar ketujuan" | 8:11 pm | Gray `#f0f5fa`, left-aligned, avatar 40×40 circle |
| 3 | User | "Posisi sudah di mana ya ?" | 8:11 pm | Orange `#fc6e2a`, right-aligned, double-check orange |
| 4 | Courier | "Sebentar lagi di tunggu ya..." | 8:12 pm | Gray `#f0f5fa`, left-aligned |
| 5 | User | "Tolong cepat" | 8:12 pm | Orange `#fc6e2a`, right-aligned, double-check gray |

| Properti Bubble | Value |
|-----------------|-------|
| **User bubble** | bg `#fc6e2a`, text putih, border-radius ~16px (topRight lebih kecil) |
| **Courier bubble** | bg `#f0f5fa`, text `#181c2e`, border-radius ~16px (topLeft lebih kecil) |
| **Avatar** | Ellipse 40×40, fill `#c4c4c4` + IMAGE (hanya di chat courier) |
| **Timestamp** | Sen 11px, `#a0a5ba` |
| **Double-check** | Icon centang ganda: orange untuk read, gray untuk delivered |
| **Margin** | Chat bubbles max-width ~256px |

#### 9b. Input Bar

| Properti | Value |
|----------|-------|
| **Background** | Rectangle 327×55, bg `#f0f5fa`, rounded-[12px] |
| **Placeholder** | "Ketikan pesan" — Sen 16px, `#a0a5ba` |
| **Smile icon** | Vector/emoji icon di kiri input |
| **Send button** | Lingkaran putih 40×40 dengan arrow icon `#ff7622` |

### 10. Drag Handle — `(610:7639)` / `(610:7461)`

| Properti | Value |
|----------|-------|
| **Rectangle** | 70×7px |
| **Background** | `#d8e3ed` |
| **Border radius** | 80px |
| **Posisi** | Center top of bottom card |

---

## Route & Backend Plan

### Database

#### Tabel Baru

**1. `couriers`**

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | bigIncrements | |
| `name` | string(100) | Nama kurir |
| `phone` | string(20) | Nomor telepon |
| `photo` | string(255) | nullable — foto profil |
| `vehicle_type` | string(50) | nullable — jenis kendaraan |
| `is_active` | boolean | default true |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

**2. `order_courier` (pivot)**

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | bigIncrements | |
| `order_id` | foreignId → orders | |
| `courier_id` | foreignId → couriers | |
| `assigned_at` | timestamp | nullable |
| `status` | string(50) | default 'assigned' — assigned, picking, delivering, delivered |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

**3. `order_tracking_log`**

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | bigIncrements | |
| `order_id` | foreignId → orders | |
| `status` | string(50) | tracking status code |
| `label` | string(200) | Human-readable label |
| `description` | text | nullable — deskripsi tambahan |
| `is_completed` | boolean | default false |
| `completed_at` | timestamp | nullable |
| `created_at` | timestamp | |

**4. `chat_messages`**

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | bigIncrements | |
| `order_id` | foreignId → orders | |
| `sender_type` | enum('user','courier') | Pengirim pesan |
| `message` | text | Isi pesan |
| `is_read` | boolean | default false |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

#### Update Tabel Existing

**orders** — tambah tracking status di kolom `status` (via seeder/konfigurasi):
- Current: `pending`, `confirmed`, `preparing`, `delivered`, `cancelled`
- Add: `picked_up`, `arriving_soon`

Atau buat `order_statuses` terpisah untuk fleksibilitas timeline.

### Route Baru

```php
// Tracking (auth required)
Route::middleware('auth')->group(function () {
    Route::get('/pesanan/{order}/tracking', [TrackingController::class, 'show'])->name('tracking.show');
    Route::post('/pesanan/{order}/call', [TrackingController::class, 'initiateCall'])->name('tracking.call');
    Route::get('/pesanan/{order}/chat', [TrackingController::class, 'chat'])->name('tracking.chat');
    Route::post('/pesanan/{order}/chat/send', [TrackingController::class, 'sendMessage'])->name('tracking.chat.send');
});
```

### Controller

**TrackingController** (baru):

| Method | Fungsi |
|--------|--------|
| `show(Order $order)` | Tampilkan halaman tracking — data order, courier, tracking log, ETA |
| `initiateCall(Order $order)` | Simulasi inisiasi panggilan (redirect ke halaman call screen) |
| `chat(Order $order)` | Tampilkan halaman chat — riwayat pesan |
| `sendMessage(Request, Order $order)` | Kirim pesan baru dari user |

### Page Baru

| Page | Deskripsi |
|------|-----------|
| `resources/js/Pages/Tracking.jsx` | State 1 & 2 — Map + bottom card + timeline + courier contact |
| `resources/js/Pages/CallScreen.jsx` | State 3 — Dark bg, blur overlay, bottom sheet call |
| `resources/js/Pages/MessageScreen.jsx` | State 4 — Chat UI dengan riwayat pesan |

### Update Halaman Existing

| Halaman | Perubahan |
|---------|-----------|
| `Pesanan.jsx` | Ganti `handleTrackOrder` placeholder → navigasi ke `route('tracking.show', order.id)` |

---

## Milestone Implementasi

### ✅ Phase 1: Database & Backend
- [x] **🔍 Analisis Figma untuk kebutuhan data**:
  - Tabel baru: `couriers`, `order_courier`, `order_tracking_log`, `chat_messages`
  - Update status `orders` — tambah `picked_up`, `arriving_soon`
  - Model baru: `Courier`, `OrderCourier`, `OrderTrackingLog`, `ChatMessage`
  - Relasi: Order → hasMany tracking logs, hasMany messages; Courier → belongsToMany orders
- [ ] **🎨 Cek resource Figma**: Ekstrak icon/vector dari Figma jika belum ada:
  - Frame `610:7468` + `610:7278` — route line gradient (bisa inline SVG)
  - Frame `610:7245` — phone-off icon, speaker icon, mic-off icon (vector dari Figma)
  - Frame `610:7169` — smile/emoji icon, send arrow, double-check icon, loader spinner icon
- [ ] Buat migration `create_couriers_table`
- [ ] Buat migration `create_order_courier_table`
- [ ] Buat migration `create_order_tracking_logs_table`
- [ ] Buat migration `create_chat_messages_table`
- [ ] Buat Model `Courier` ($fillable, relasi)
- [ ] Buat Model `OrderCourier` ($fillable, relasi)
- [ ] Buat Model `OrderTrackingLog` ($fillable, $casts)
- [ ] Buat Model `ChatMessage` ($fillable, $casts)
- [ ] Update `Order` model — relasi `trackingLogs()`, `chatMessages()`, `courier()`
- [ ] Buat `TrackingController` dengan method `show()`, `initiateCall()`, `chat()`, `sendMessage()`
- [ ] Tambah route di `routes/web.php`
- [ ] Buat seeder `CourierSeeder` — 2-3 data kurir dummy
- [ ] Buat seeder `OrderTrackingLogSeeder` — sample tracking logs untuk order tertentu
- [ ] Buat seeder `ChatMessageSeeder` — sample chat messages
- [ ] Pass data ke Inertia (order, courier, trackingLogs, messages, eta)

### ✅ Phase 2: Tracking Page Layout & Top Bar
- [ ] Buat `resources/js/Pages/Tracking.jsx`
- [ ] Background color `#ffffff`
- [ ] Back button — lingkaran `#212029` bg, arrow putih (inline SVG dari Figma)
- [ ] Title "Track Order" — Sen 17px, `#181c2e`

### ✅ Phase 3: Map & Route Background
- [ ] Render map area dengan background `#d0d9e1` (road network sebagai SVG)
- [ ] Route line — gradient `#ffa800→#f45e3d`, 6px stroke, rounded-12
- [ ] Origin pin — white circle + `#ffb800` border *(Tracking_01)*
- [ ] Origin 3-ring pulse — outer 84×84 (10%), middle 62×62 (60%), inner 17×17 *(Tracking_02)*
- [ ] Destination pin — red `#f14237` ellipse 62×62 + pin icon putih
- [ ] Map area bisa diklik/digeser (touch/click event — bonus)

### ✅ Phase 4: Bottom Card — Restaurant Info & Timeline
- [ ] Bottom card — bg `#ffffff`, rounded-t-[24px], shadow drop-shadow
- [ ] Drag handle — 70×7, `#d8e3ed`, rounded-80
- [ ] Restaurant image — 63×63, rounded-10, fallback image
- [ ] Restaurant name — Sen 18px, `#181c2e` (dari `order.catering.name`)
- [ ] Order time — Sen 14px, `#a0a5ba` (dari `order.created_at`)
- [ ] Order items list — "Nx Menu" format, Sen 13px, `#646982`
- [ ] ETA number "20 min" — Sen ExtraBold 30px, `#181c2e`
- [ ] ETA label — Sen 14px, `#a0a5ba`
- [ ] Timeline 4 steps — circles + connecting lines + labels
- [ ] Step 1: orange circle + checkmark, "Your order has been received" (orange)
- [ ] Step 2: orange circle + loader icon, "The restaurant is preparing your food"
- [ ] Step 3: gray circle + checkmark, "Your order has been picked up for delivery"
- [ ] Step 4: gray circle + checkmark, "Order arriving soon!"
- [ ] Dynamic timeline — completed steps = orange, remaining = gray

### ✅ Phase 5: Courier Contact Section
- [ ] Courier profile photo — 54×54 circle, fallback `#c4c4c4`
- [ ] Courier name — Sen Bold 20px, `#181c2e`
- [ ] Role "Courier" — Sen 14px, `#a0a5ba`
- [ ] Call icon — orange circle 45×45 + phone icon putih + blur glow
- [ ] Chat icon — white circle 45×45 + orange border + chat vector
- [ ] Click Call → navigasi ke `CallScreen`
- [ ] Click Chat → navigasi ke `MessageScreen`

### ✅ Phase 6: Call Screen Page
- [ ] Buat `resources/js/Pages/CallScreen.jsx`
- [ ] Full screen dark bg `#121223`
- [ ] Blur overlay rectangle — `#273f55` opacity 0.67, layer blur simulation
- [ ] Bottom sheet — white, rounded-t-[24px]
- [ ] Profile photo — 105×105 circle, image fill
- [ ] Name "Amanda Ketring" — Sen Bold 20px, `#181c2e`
- [ ] Status "Berdering......." — Sen 16px, `#979797`
- [ ] End call button — red circle 60×60 `#ff3434`, phone-off icon putih 24×24
- [ ] Speaker button — 48×48 circle `#ecf0f4`, speaker icon `#181c2e`
- [ ] Mute button — 48×48 circle `#ecf0f4`, mic-off icon `#181c2e`
- [ ] "Konfirmasi" button — 327×62, `#ff7622`, rounded-12, Sen Bold 16px white
- [ ] End call click → kembali ke Tracking page

### ✅ Phase 7: Message Screen Page
- [ ] Buat `resources/js/Pages/MessageScreen.jsx`
- [ ] Top bar: Close button (`#ecf0f4` circle, X icon) + title "Amanda Katering"
- [ ] Chat message bubble (user) — orange `#fc6e2a`, right-aligned, text putih
- [ ] Chat message bubble (courier) — gray `#f0f5fa`, left-aligned, text `#181c2e`
- [ ] Courier avatar — 40×40 circle, hanya untuk pesan courier
- [ ] Timestamp — Sen 11px, `#a0a5ba`
- [ ] Double-check icon — orange untuk read, gray untuk delivered
- [ ] Render riwayat chat dari `chat_messages` table
- [ ] Input bar — bg `#f0f5fa`, 327×55, rounded-12
- [ ] Placeholder "Ketikan pesan" — Sen 16px, `#a0a5ba`
- [ ] Smile/emoji icon — vector dari Figma
- [ ] Send button — white circle 40×40 + orange arrow
- [ ] Send message — POST ke `tracking.chat.send`, refresh chat
- [ ] Empty state — "Belum ada pesan" jika belum ada chat

### ✅ Phase 8: Integrasi & Polish
- [x] Update `Pesanan.jsx` — handleTrackOrder navigasi ke Tracking
- [x] Empty state tracking — jika order tidak punya tracking data
- [x] Loading state — Skeleton loading saat fetch data tracking
- [x] Error handling — jika order tidak ditemukan/403
- [x] Animasi transisi antar state (*jika perlu*)
- [ ] Refresh otomatis tracking log (polling setiap 30 detik — *bonus*)

### ⬜ Phase 9: Validasi Error (Browser)
- [ ] Buka halaman di browser (via `php artisan serve + Vite`)
- [ ] Ambil **browser snapshot** (DOM) — cek struktur halaman
- [ ] Cek **browser console logs** — pastikan tidak ada error/warning
- [ ] Cek semua interaksi user (click Call, Chat, send message, end call)
- [ ] Cek **responsiveness** di viewport mobile (max-width 430px)
- [ ] Cek empty state jika tidak ada data tracking
- [ ] Cek error/loading state

### ⬜ Phase 10: Figma Design Comparison (Per-Frame Sequential)

**Frame 1: Tracking Order_01 (`610:7468`)**
- [ ] Screenshot Figma frame `610:7468` — Tracking Order_01 (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/` → lanjut Frame 2

**Frame 2: Tracking Order_02 (`610:7278`)**
- [ ] Screenshot Figma frame `610:7278` — Tracking Order_02 (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/` → lanjut Frame 3

**Frame 3: Delivery Man Call Screen (`610:7245`)**
- [ ] Screenshot Figma frame `610:7245` — Delivery Man Call Screen (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/` → lanjut Frame 4

**Frame 4: Delivery Man Message Screen (`610:7169`)**
- [ ] Screenshot Figma frame `610:7169` — Delivery Man Message Screen (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web state yang sama (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Jika skor < **90%** — catat perbaikan, perbaiki kode, ulang screenshot & compare
- [ ] Jika skor ≥ **90%** — simpan screenshot final ke `/screenshots/` → selesai

### ⬜ Phase 11: Git Commit & Push
- [ ] `git add` semua perubahan
- [ ] `git commit` dengan pesan deskriptif (format: `feat: tracking & delivery pages with map, timeline, call, and chat UI`)
- [ ] `git push` ke remote repository

---

## Catatan Implementasi

- **Background Tracking**: `#ffffff` (frame Tracking 01/02 + Message); `#121223` (Call Screen)
- **Dimensi**: 375×812px, mobile-first max-width 430px
- **Font**: Sen konsisten (Tailwind config + inline fallback)
- **Map**: Implementasi sebagai SVG statis (road network shapes #d0d9e1 + route line gradient), bukan Google Maps interaktif — fokus pada visual design sesuai Figma
- **Bottom Card**: Posisi berbeda antara Tracking_01 (y:655) dan Tracking_02 (y:240) — beda state, bukan beda halaman. Implementasi sebagai scrollable bottom sheet atau fixed card.
- **Call Screen**: UI statis — tombol end-call kembali ke tracking, speaker/mute sebagai visual toggle (tidak perlu actual call functionality)
- **Chat Screen**: Riwayat dari DB (`chat_messages`), kirim pesan via POST request, Auto-scroll ke pesan terbaru
- **Timeline**: Dinamis berdasarkan data dari `order_tracking_log` — completed steps get orange treatment
- **🎨 Figma Resources**: Ekstrak icon langsung dari Figma:
  - Route line gradient (buat inline SVG dengan gradient)
  - Phone-off icon, speaker icon, mic-off icon (dari Call Screen)
  - Smile icon, send arrow, double-check icon, loader spinner (dari Chat Screen)
  - Pin/location icons (dari tracking map)
- **Link antar halaman**:
  - Tracking → Call Screen: klik icon Call
  - Tracking → Message Screen: klik icon Chat
  - Call Screen → Tracking: klik End Call
  - Message Screen → Tracking: klik Close
  - Pesanan → Tracking: klik "Lacak" button
- **Warna spesifik**: `#212029` untuk back button bg, `#ff3434` untuk end-call, `#fc6e2a` untuk chat bubble user, `#f0f5fa` untuk chat bubble courier
