# ✅ Verification — USER_FIX

> **File Figma**: `unsaved-mqru7f39-ihrrysge`
> **Frame**: `610:6878` — Verification (375×812px)
> **Background**: `#121223` (dark), cornerRadius 20
> **Updated**: 2026-06-24

---

## Layout (Dari Atas ke Bawah)

```
┌──────────────────────────────┐
│         [← Back]             │  Back button (lingkaran putih 45×45)
│                              │
│         [BG Asset]           │  Decorative ellipses & dashed lines
│                              │
│       Verification           │  Title — Sen Bold 30px, #ffffff
│                              │
│   We have sent a code to     │  Subtitle — Sen Regular 16px, #ffffff 90%
│   your email                 │
│                              │
│    example@gmail.com         │  Email display — Sen Bold 16px, #ffffff
│                              │
│  ┌─ Code ──────────────────┐ │
│  │ [__][__][__][__]        │ │  Code input field, bg #f0f5fa
│  └─────────────────────────┘ │  Resend link di kanan label
│                              │
│  ┌─────────────────────────┐ │
│  │         Verify          │ │  Button #ff7622, 327×62, radius 12
│  └─────────────────────────┘ │  Text putih "Verify" Sen Bold 14px
│                              │
│  ┌─ Number Keyboard ────────┐│
│  │  [1] [2] [3]             ││  Overlay #d1d5db + background blur
│  │  [4] [5] [6]             ││
│  │  [7] [8] [9]             ││
│  │  [⌫] [0] [↵]             ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │   (White BG card)        ││  Rectangle putih 375×579, radius 24
│  └──────────────────────────┘│
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Back Button — `Group (610:6957)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:50 |
| Lingkaran | 45×45, fill `#ffffff`, opasitas 1 |
| Icon back | Vector stroke, warna `#5e616f`, weight 2 |

### 2. BG Asset — `Group (610:6954)` (sama pola di Forgot Password)
| Properti | Value |
|----------|-------|
| Posisi | x:-83, y:-94 |
| Ukuran | 552×449 |
| **Ellipse 1005** | 177×177, stroke putih dashed `[4,4]` weight 94, opacity 5% |
| **Vector 142** | Garis oranye `#ff7622` dashed `[8,8]` weight 3, opacity 20% |

### 3. Title "Verification" — `Text (610:6953)`
| Properti | Value |
|----------|-------|
| Posisi | x:100, y:119 |
| Font | Sen Bold 30px |
| Warna | `#ffffff` |

### 4. Subtitle — `Text (610:6952)`
| Properti | Value |
|----------|-------|
| Posisi | x:45, y:159 |
| Font | Sen Regular 16px |
| Warna | `#ffffff`, opacity 90% |
| Text | "We have sent a code to your email" |
| Line height | 26px |

### 5. Email Display — `Text (610:6951)`
| Properti | Value |
|----------|-------|
| Posisi | x:108, y:184 |
| Font | Sen Bold 16px |
| Warna | `#ffffff` |
| Text | "example@gmail.com" |

### 6. Code Field — `Group (610:6932)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:257 |
| Ukuran | 327×87 |
| **Label "Code"** | Sen Regular 13px, `#32343e`, x:24, y:257.5 |
| **Input field** | 327×62, bg `#f0f5fa`, `border-radius: 10px` |
| **Resend link** | Group (610:6946) — x:243, y:257, 108×17 |
| **Placeholder** | 4 digit code boxes |

### 7. Verify Button — `Group (610:6929)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:374 |
| Ukuran | 327×62 |
| Background | `#ff7622`, `border-radius: 12px` |
| Text | "Verify" — Sen Bold 14px, `#ffffff`, centered |

### 8. Number Keyboard — `Frame (610:6880)`
| Properti | Value |
|----------|-------|
| Posisi | x:0, y:521 |
| Ukuran | 375×291 |
| Background | `#d1d5db` dengan background blur 108.7px |
| **Keyboard keys** | Frame (610:6884) — "safari keyboard/light", 375×216, 12 children |
| **Home indicator** | Frame (610:6882) — x:0, y:257, 375×34 |

### 9. White BG Card — `Rectangle (610:6879)`
| Properti | Value |
|----------|-------|
| Ukuran | 375×579 |
| Posisi | x:0, y:233 |
| Fill | `#ffffff` |
| Corner radius | 24 (semua sisi) |

---

## Ringkasan Node

| Tipe | Jumlah |
|------|--------|
| 🖼️ FRAME | 3 (Verification, Number Keyboard, safari keyboard) |
| 🟪 RECTANGLE | 2 (White Bg, Keyboard background) |
| 📦 GROUP | 5 (Back, BG Asset, Code Field, Button, home indicator) |
| 📝 TEXT | 4 (Verification, subtitle, email, Code label) |
| 🔷 VECTOR | 2 (BG Vector, Back icon) |
| ⭕ ELLIPSE | 1 (BG ellipse) |
| **Total** | **~17 node** |

---

## Milestone Implementasi

### Phase 1: Custom Page (Replace Breeze Default)
- [ ] Buat `VerifyEmail.jsx` custom — ganti Breeze default `GuestLayout`
- [ ] Dark background `#121223`
- [ ] Back button — lingkaran putih 45×45, arrow icon
- [ ] BG Asset dekoratif — lingkaran dashed putih + garis dashed oranye
- [ ] White card — `rounded-[24px]` (semua sisi), mulai y:233
- [ ] Title "Verification" — Sen Bold 30px, `#ffffff`
- [ ] Subtitle "We have sent a code to your email" — Sen 16px, `#ffffff` 90%
- [ ] Email display — "example@gmail.com" (dinamis dari input user)
- [ ] Code field — 4 digit input boxes — label "Code" + "Resend" link
- [ ] "Verify" button — `#ff7622`, 327×62, `rounded-[12px]`
- [ ] Number Keyboard overlay — bg `#d1d5db` + blur (opsional, decorative)
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
- [ ] `git commit` dengan pesan deskriptif (contoh: "feat: custom verification page sesuai Figma")
- [ ] `git push` ke remote repository
