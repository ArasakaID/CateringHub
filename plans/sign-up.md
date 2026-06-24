# 📝 Sign Up — USER_FIX

> **File Figma**: `unsaved-mqru7f39-ihrrysge`
> **Frame**: `610:3926` — Sign Up 2 (375×812px)
> **Background**: `#131927` (dark), cornerRadius 20
> **Updated**: 2026-06-24
> **Status**: ✅ SELESAI — Register.jsx = custom Sign Up page sesuai Figma

---

## Layout (Dari Atas ke Bawah)

```
┌──────────────────────────────┐
│         [← Back]             │  Back button (lingkaran putih 45×45)
│                              │
│          [LOGO]              │  c-hub-logo 3 (184×77px)
│                              │
│         Sign Up              │  Title — Sen Bold 30px, #000000
│                              │
│  ┌─ Name ──────────────────┐ │
│  │  Lahadalia               │ │  Name field, bg #f0f5fa
│  └─────────────────────────┘ │
│                              │
│  ┌─ Email ─────────────────┐ │
│  │  bahlul@sawit.co         │ │  Email field, bg #f0f5fa
│  └─────────────────────────┘ │
│                              │
│  ┌─ Password ──────────────┐ │
│  │ [••••••••••]  [eye-off] │ │  Password field + toggle
│  └─────────────────────────┘ │
│                              │
│  ┌─────────────────────────┐ │
│  │        Sign Up          │ │  Button #ff7622, 327×62, radius 12
│  └─────────────────────────┘ │  Text putih "Sign Up" Sen Bold 14px
│                              │
│  ┌──────────────────────────┐│
│  │   (White BG card)        ││  Rectangle putih 375×579
│  └──────────────────────────┘│
└──────────────────────────────┘
```

---

## Detail Komponen

### 1. Back Button — `Group (610:3947)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:50 |
| Lingkaran | 45×45, fill `#ffffff`, opasitas 1 |
| Icon back | Vector stroke, warna `#5e616f`, weight 2 |

### 2. Logo — `Rectangle (610:3950)`
| Properti | Value |
|----------|-------|
| Ukuran | 184×77px |
| Posisi | x:96, y:83 |
| Fill | Image (c-hub-logo 3) |

### 3. Title "Sign Up" — `Text (610:3946)`
| Properti | Value |
|----------|-------|
| Posisi | x:132, y:284 |
| Font | Sen Bold 30px |
| Warna | `#000000` |
| Alignment | Center |

### 4. Name Field — `Group (610:3942)`
| Properti | Value |
|----------|-------|
| Posisi | x:23, y:344 |
| Ukuran | 327×86 |
| **Label** | "Name" — Sen Regular 13px, `#32343e` |
| **Input field** | 327×62, bg `#f0f5fa`, `border-radius: 10px` |
| **Placeholder** | "Lahadalia" — Sen Regular 14px, `#a0a5ba` |

### 5. Email Field — `Group (610:3938)`
| Properti | Value |
|----------|-------|
| Posisi | x:23, y:454 |
| Ukuran | 327×86 |
| **Label** | "Email" — Sen Regular 13px, `#32343e` |
| **Input field** | 327×62, bg `#f0f5fa`, `border-radius: 10px` |
| **Placeholder** | "bahlul@sawit.co" — Sen Regular 14px, `#a0a5ba` |

### 6. Password Field — `Group (610:3931)`
| Properti | Value |
|----------|-------|
| Posisi | x:23, y:564 |
| Ukuran | 327×86 |
| **Label** | "Password" — Sen Regular 13px, `#32343e` |
| **Input field** | 327×62, bg `#f0f5fa`, `border-radius: 10px` |
| **Placeholder** | "**********" — Sen Bold 14px, `#a0a5ba`, letterSpacing 47.5% |
| **eye-off icon** | x:316, y:612, 14×14 (toggle visibility) |

### 7. Sign Up Button — `Group (610:3928)`
| Properti | Value |
|----------|-------|
| Posisi | x:23, y:674 |
| Ukuran | 327×62 |
| Background | `#ff7622`, `border-radius: 12px` |
| Text | "Sign Up" — Sen Bold 14px, `#ffffff`, centered |

### 8. White BG Card — `Rectangle (610:3927)`
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
| 🖼️ FRAME | 1 (Sign Up 2) |
| 🟪 RECTANGLE | 2 (White Card, Logo) |
| 📦 GROUP | 5 (Back, Name, Email, Password + eye-off, Button) |
| 📝 TEXT | 5 (Sign Up, Name label, Email label, Password label, placeholder texts) |
| 🔷 VECTOR | 4 (3× Rectangle field bg, Back icon) |
| **Total** | **~17 node** |

---

## Milestone Implementasi

- [x] Back button — lingkaran putih 45×45, arrow icon, link ke login
- [x] Logo — 184×77px, diambil dari Figma
- [x] Title "Sign Up" — Sen Bold 30px, center
- [x] Name field — label, input bg `#f0f5fa`, placeholder "Lahadalia"
- [x] Email field — label, input bg `#f0f5fa`, placeholder "bahlul@sawit.co"
- [x] Password field — label, input bg `#f0f5fa`, eye-off toggle
- [x] Hidden password_confirmation field (backend requirement)
- [x] Sign Up button — `#ff7622`, 327×62, `rounded-[12px]`
- [x] White background card — `rounded-t-[24px]`
- [x] Dark background `#131927`
- [x] Font Sen konsisten

---

## Catatan Implementasi
- Halaman auth memakai **dark background** `#131927`
- White card mulai y:233 sebagai container form
- **3 field input**: Name, Email, Password
- Password field memiliki **eye-off toggle** untuk visibility
- Field input bg `#f0f5fa` (sama pola Forgot Password/Verification/Reset Password)
- Placeholder menggunakan data dummy ("Lahadalia", "bahlul@sawit.co") — dinamis dari user
- Button "Sign Up" konsisten: `#ff7622`, 327×62, `rounded-[12px]`
- **Tidak ada** "Belum punya akun? Sign Up" link atau Remember Me di frame ini (berbeda dengan Log In)
- Tidak ada BG Asset decorative (berbeda dengan Forgot Password & Verification)
- ✅ **Sudah diimplementasikan** — Register.jsx = custom Sign Up page sesuai Figma
