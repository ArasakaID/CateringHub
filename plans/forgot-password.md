# 🔑 Forgot Password — USER_FIX

> **File Figma**: `unsaved-mqru7f39-ihrrysge`
> **Frame**: `610:6960` — Forgot Password (375×812px)
> **Background**: `#121223` (dark), cornerRadius 20
> **Updated**: 2026-06-24
> **Status**: ✅ Sudah diimplementasi — `Auth/ForgotPassword.jsx`

---

## Layout (Dari Atas ke Bawah)

```
┌──────────────────────────────┐
│         [← Back]             │  Back button (lingkaran putih 45×45)
│                              │
│         [BG Asset]           │  Decorative ellipses & dashed lines
│                              │
│      Forgot Password         │  Title — Sen Bold 30px, #ffffff
│                              │
│   Kami mengirimkan email     │  Subtitle — Sen Regular 13px, #a4a4a4
│   untuk reset password.      │
│                              │
│  ┌─ Email ─────────────────┐ │
│  │ [✉]  Email field        │ │  Sen 13px label, field bg #f0f5fa
│  └─────────────────────────┘ │
│                              │
│  ┌─────────────────────────┐ │
│  │       Send Code         │ │  Button #ff7622, 327×62, radius 12
│  └─────────────────────────┘ │  Text putih "Send Code" Sen Bold 14px
│                              │
│  ┌─ Alphabet Keyboard ──────┐│
│  │  [QWERTYUIOP]            ││  Overlay keyboard #d1d5db + blur
│  │  [ASDFGHJKL]             ││
│  │  [⌫ ZXCVBNM ↵]           ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │   (White BG card)        ││  Rectangle putih 375×579
│  └──────────────────────────┘│
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Back Button — `Group (610:7100)` (sama pola di semua auth frame)
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:50 |
| Lingkaran | 45×45, fill `#ffffff`, opasitas 1 |
| Icon back | Vector stroke, warna `#5e616f`, weight 2 |

### 2. BG Asset — `Group (610:7097)`
| Properti | Value |
|----------|-------|
| Posisi | x:-83, y:-94 |
| Ukuran | 552×449 |
| **Ellipse 1005** | 177×177, stroke putih dashed `[4,4]` weight 94, opacity 5% |
| **Vector 142** | Garis oranye `#ff7622` dashed `[8,8]` weight 3, opacity 20% |

### 3. Title "Forgot Password" — `Text (610:7096)`
| Properti | Value |
|----------|-------|
| Posisi | x:65.5, y:118 |
| Font | Sen Bold 30px |
| Warna | `#ffffff` |
| Alignment | Center |

### 4. Subtitle — `Text (610:7103)`
| Properti | Value |
|----------|-------|
| Posisi | x:48, y:151 |
| Font | Sen Regular 13px |
| Warna | `#a4a4a4`, opacity 85% |
| Text | "Kami mengirimkan email untuk reset password." |
| Line height | 26px |

### 5. Email Field — `Group (610:7091)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:257 |
| Ukuran | 327×86 |
| **Label** | "Email" — Sen Regular 13px, `#32343e` |
| **Input field** | 327×62, bg `#f0f5fa`, `border-radius: 10px` |

### 6. Send Code Button — `Group (610:7088)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:373 |
| Ukuran | 327×62 |
| Background | `#ff7622`, `border-radius: 12px` |
| Text | "Send Code" — Sen Bold 14px, `#ffffff`, centered |

### 7. Alphabet Keyboard — `Frame (610:6962)`
| Properti | Value |
|----------|-------|
| Posisi | x:0, y:521 |
| Ukuran | 375×291 |
| Background | `#d1d5db` dengan background blur 108.7px |
| **Keys** | Group (610:6966) — x:3, y:8, 369×259, 33 key children |
| **Home indicator** | Frame (610:6964) — x:0, y:257, 375×34 |

### 8. White BG Card — `Rectangle (610:6961)`
| Properti | Value |
|----------|-------|
| Ukuran | 375×579 |
| Posisi | x:0, y:233 |
| Fill | `#ffffff` |
| Corner radius | topLeft/topRight 24, bottomLeft/bottomRight 0 |

---

## Ringkasan Node

| Tipe | Jumlah |
|------|--------|
| 🖼️ FRAME | 2 (Forgot Password, Alphabet Keyboard) |
| 🟪 RECTANGLE | 2 (White Card, Keyboard background) |
| 📦 GROUP | 6 (Back, BG Asset, Email, Button, Keys, home indicator) |
| 📝 TEXT | 3 (Forgot Password, subtitle, Email label/keyboard keys) |
| 🔷 VECTOR | 2 (BG Vector, Back icon) |
| ⭕ ELLIPSE | 1 (BG ellipse) |
| **Total** | **~16 node** |

---

## Milestone Implementasi

### Phase 1: Custom Page (Replace Breeze Default)
- [ ] Buat `ForgotPassword.jsx` custom — ganti Breeze default `GuestLayout`
- [ ] Dark background `#121223` (full page, bukan hanya guest layout)
- [ ] Back button — lingkaran putih 45×45, arrow icon `#5e616f`
- [ ] White card — `rounded-t-[24px]`, mulai y:233
- [ ] BG Asset dekoratif — lingkaran dashed putih + garis dashed oranye `#ff7622`
- [ ] Title "Forgot Password" — Sen Bold 30px, `#ffffff`, center
- [ ] Subtitle — "Kami mengirimkan email untuk reset password." — Sen 13px, `#a4a4a4`
- [ ] Email field — bg `#f0f5fa`, `rounded-[10px]`, label "Email"
- [ ] "Send Code" button — `#ff7622`, 327×62, `rounded-[12px]`
- [ ] Alphabet Keyboard overlay — bg `#d1d5db` + blur (opsional, decorative)
- [ ] Font Sen konsisten
- [ ] Loading + error state

### Phase 2: Figma Design Comparison
- [ ] Screenshot Figma (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Catat skor kesamaan — target minimal **90%**
- [ ] Perbaiki semua perbedaan Figma vs Web hingga ≥ 90%

### Phase 3: Git Commit & Push
- [ ] `git add` semua perubahan
- [ ] `git commit` dengan pesan deskriptif (contoh: "feat: custom forgot password page sesuai Figma")
- [ ] `git push` ke remote repository
