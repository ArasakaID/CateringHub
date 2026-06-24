# 🔄 Reset Password — USER_FIX

> **File Figma**: `unsaved-mqru7f39-ihrrysge`
> **Frame**: `610:3951` — Reset Password (375×812px)
> **Background**: `#131927` (dark), cornerRadius 20
> **Updated**: 2026-06-24

---

## Layout (Dari Atas ke Bawah)

```
┌──────────────────────────────┐
│         [← Back]             │  Back button (lingkaran putih 45×45)
│                              │
│          [LOGO]              │  c-hub-logo 4 (184×77px)
│                              │
│      Change Password         │  Title — Sen Bold 30px, #000000
│                              │
│  ┌─ OLD Password ──────────┐ │
│  │ [••••••••••]  [eye-off] │ │  Password field + toggle
│  └─────────────────────────┘ │
│                              │
│  ┌─ new Password ──────────┐ │
│  │ [••••••••••]  [eye-off] │ │  Password field + toggle
│  └─────────────────────────┘ │
│                              │
│  ○ Password minimun 8        │  Validation hint — Sen 13px, #a4a4a4
│     character                │
│  ○ Must provide at least 1   │
│     capital letter           │
│  ○ Must provide at least 1   │
│     special character        │
│                              │
│  ┌─────────────────────────┐ │
│  │         login           │ │  Button #ff7622, 327×62, radius 12
│  └─────────────────────────┘ │  Text putih "login" Sen Bold 14px
│                              │
│  ┌──────────────────────────┐│
│  │   (White BG card)        ││  Rectangle putih 375×579
│  └──────────────────────────┘│
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Back Button — `Group (610:3974)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:50 |
| Lingkaran | 45×45, fill `#ffffff`, opasitas 1 |
| Icon back | Vector stroke, warna `#5e616f`, weight 2 |

### 2. Logo — `Rectangle (610:3977)`
| Properti | Value |
|----------|-------|
| Ukuran | 184×77px |
| Posisi | x:96, y:77 |
| Fill | Image (c-hub-logo) |

### 3. Title "Change Password" — `Text (610:3973)`
| Properti | Value |
|----------|-------|
| Posisi | x:61, y:276 |
| Font | Sen Bold 30px |
| Warna | `#000000` |
| Alignment | Center |

### 4. OLD Password Field — `Group (610:3963)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:355 |
| Ukuran | 327×86 |
| **Label** | "OLD Password" — Sen Regular 13px, `#32343e` |
| **Input field** | 327×62, bg `#f0f5fa`, `border-radius: 10px` |
| **Placeholder** | "**********" — Sen Bold 14px, `#a0a5ba`, letterSpacing 47.5% |
| **eye-off icon** | x:317, y:403, 14×14 (toggle visibility) |

### 5. New Password Field — `Group (610:3956)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:463 |
| Ukuran | 327×86 |
| **Label** | "new Password" — Sen Regular 13px, `#32343e` |
| **Input field** | 327×62, bg `#f0f5fa`, `border-radius: 10px` |
| **Placeholder** | "**********" — Sen Bold 14px, `#a0a5ba`, letterSpacing 47.5% |
| **eye-off icon** | x:317, y:511, 14×14 (toggle visibility) |

### 6. Password Validation Hints
| Text | Posisi | Detail |
|------|--------|--------|
| "Password minimun 8 character" | x:24, y:571 | Sen Regular 13px, `#a4a4a4` opacity 85%, lineHeight 26px |
| "Must provide at least 1 capital letter" | x:24, y:597 | Sen Regular 13px, `#a4a4a4` opacity 85%, lineHeight 26px |
| "Must provide at least 1 special character" | x:24, y:623 | Sen Regular 13px, `#a4a4a4` opacity 85%, lineHeight 26px |

### 7. Login Button — `Group (610:3970)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:700 |
| Ukuran | 327×62 |
| Background | `#ff7622`, `border-radius: 12px` |
| Text | "login" — Sen Bold 14px, `#ffffff`, centered |

### 8. White BG Card — `Rectangle (610:3952)`
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
| 🖼️ FRAME | 1 (Reset Password) |
| 🟪 RECTANGLE | 2 (White Card, Logo) |
| 📦 GROUP | 5 (Back, OLD Password, New Password, 2× eye-off, Button) |
| 📝 TEXT | 5 (Change Password, OLD Password label, new Password label, 3 validation hints) |
| 🔷 VECTOR | 3 (Back icon, 2× Rectangle field bg) |
| **Total** | **~16 node** |

---

## Milestone Implementasi

### Phase 1: Custom Page (Replace Breeze Default)
- [ ] Buat `ResetPassword.jsx` custom — ganti Breeze default `GuestLayout`
- [ ] Dark background `#131927`
- [ ] Back button — lingkaran putih 45×45, arrow icon
- [ ] Logo — 184×77px (dari Figma)
- [ ] White card — `rounded-t-[24px]`, mulai y:233
- [ ] Title "Change Password" — Sen Bold 30px, `#000000`, center
- [ ] OLD Password field — bg `#f0f5fa`, eye-off toggle, placeholder `"**********"`
- [ ] new Password field — bg `#f0f5fa`, eye-off toggle, placeholder `"**********"`
- [ ] 3 validation hints (min 8 char, capital letter, special character)
- [ ] Button "login" (lowercase) — `#ff7622`, 327×62, `rounded-[12px]`
- [ ] Loading + error state

### Phase 2: Figma Design Comparison
- [ ] Screenshot Figma (via `save_screenshots` Figma MCP)
- [ ] Screenshot Web (via `browser_save_screenshot` Browser MCP)
- [ ] Bandingkan dengan `design_compare` (browser-ai + Gemini)
- [ ] Catat skor kesamaan — target minimal **90%**
- [ ] Perbaiki semua perbedaan Figma vs Web hingga ≥ 90%

### Phase 3: Git Commit & Push
- [ ] `git add` semua perubahan
- [ ] `git commit` dengan pesan deskriptif (contoh: "feat: custom reset password page sesuai Figma")
- [ ] `git push` ke remote repository
