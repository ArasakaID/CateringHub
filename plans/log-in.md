# 🔐 Log In — USER_FIX

> **File Figma**: `unsaved-mqru7f39-ihrrysge`
> **Frame**: `610:3874` — Log In (375×812px)
> **Background**: `#131927` (dark), cornerRadius 24
> **Updated**: 2026-06-24

---

## Layout (Dari Atas ke Bawah)

```
┌──────────────────────────────┐
│         [← Back]             │  Back button (lingkaran putih 45×45)
│                              │
│          [LOGO]              │  c-hub-logo 4 (184×77px)
│                              │
│          Log In              │  Title — Sen Bold 30px, #000000
│                              │
│  ┌─ Email ─────────────────┐ │
│  │ [icon]  Email field     │ │  Sen 13px label, field bg #f6f6f6
│  └─────────────────────────┘ │
│                              │
│  ┌─ Password ──────────────┐ │
│  │ [••••••]  [eye-off]     │ │  Password field + toggle
│  └─────────────────────────┘ │
│                              │
│  ⬜ Remember me    Lupa     │ │  Checkbox + "Lupa Password" #ff7622
│                     Password │
│                              │
│  ┌─────────────────────────┐ │
│  │        Log In           │ │  Button #ff7622, 327×62, radius 12
│  └─────────────────────────┘ │  Text putih "Log In" Sen Bold 14px
│                              │
│   Belum punya akun?  Sign Up│ │  #646982 + #ff7622 (link)
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

### 2. Logo — `Rectangle (610:3896)`
| Properti | Value |
|----------|-------|
| Ukuran | 184×77px |
| Posisi | x:93, y:82 |
| Fill | Image (c-hub-logo) |

### 3. Title "Log In" — `Text (610:3895)`
| Properti | Value |
|----------|-------|
| Posisi | x:138, y:280 |
| Font | Sen Bold 30px |
| Warna | `#000000` |

### 4. Email Field — `Group (610:3890)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:346 |
| Ukuran | 327×86 |
| **Label** | "Email" — Sen Regular 13px, `#32343e` |
| **Input field** | 327×62, bg `#f6f6f6`, `border-radius: 12px` |

### 5. Password Field — `Group (610:3885)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:456 |
| Ukuran | 327×86 |
| **Label** | "Password" — Sen Regular 13px, `#32343e` |
| **Input field** | 327×62, bg `#f6f6f6`, `border-radius: 12px` |
| **eye-off icon** | x:314, y:504, 14×14 (toggle visibility) |

### 6. Remember Me & Lupa Password
| Elemen | Detail |
|--------|--------|
| **Checkbox** | `Group (610:3882)`, x:24, y:566, 92×20 |
| **Lupa Password** | `Text (610:3881)`, x:239, y:567, Sen Regular 14px, `#ff7622` |

### 7. Log In Button — `Group (610:3878)`
| Properti | Value |
|----------|-------|
| Posisi | x:24, y:616 |
| Ukuran | 327×62 |
| Background | `#ff7622`, `border-radius: 12px` |
| Text | "Log In" — Sen Bold 14px, `#ffffff`, centered |

### 8. Sign Up Link
| Elemen | Detail |
|--------|--------|
| "Belum punya akun?" | x:78, y:704, Sen Regular 16px, `#646982` |
| "Sign Up" | x:252, y:708, Sen Bold 14px, `#ff7622` (link) |

### 9. White BG Card — `Rectangle (610:3875)`
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
| 🖼️ FRAME | 1 (Log In) |
| 🟪 RECTANGLE | 1 (White BG) |
| 📦 GROUP | 7 (Back, Button, Email, Pass, Remember me, eye-off) |
| 📝 TEXT | 4 (Log In, Lupa Password, Sign Up, Belum punya akun?) |
| 🖼️ IMAGE | 1 (Logo) |
| **Total** | **~14 node** |

---

## Catatan Implementasi
- Halaman auth menggunakan **dark background** (`#131927` / `#121223`)
- White card mulai y:233 sebagai container form
- Button konsisten: `#ff7622`, 327×62, `rounded-xl`
- Semua field input: bg `#f6f6f6`, `rounded-xl`
- Link "Lupa Password" dan "Sign Up" pakai `#ff7622`
- **Ada 2 frame "Log In"** di Figma (610:3874 dan 610:3900) — perlu dicek apakah itu variant

---

## Milestone Implementasi

- [x] Back button — lingkaran putih 45×45, arrow icon, link ke home
- [x] Logo — 184×77px, diambil dari Figma
- [x] Title "Log In" — Sen Bold 30px, center, #000000
- [x] Email field — label, input bg `#f0f5fa`, placeholder "bahlul@sawit.co"
- [x] Password field — label, input bg `#f0f5fa`, eye-off toggle
- [x] Checkbox "Ingat aku" + "Lupa Password" link
- [x] Log In button — `#ff7622`, 327×62, `rounded-[12px]`
- [x] "Belum punya akun? Sign Up" link
- [x] White background card — `rounded-t-[24px]`
- [x] Dark background `#131927`
- [x] Font Sen konsisten
- [x] Loading spinner saat processing
- [x] Status message untuk session feedback

---

## Catatan Implementasi
- Input bg `#f0f5fa` (bukan `#f6f6f6` seperti tertulis di plan awal — dicek dari data Figma asli)
- Input border-radius `10px` (bukan `12px`)
- Label checkbox "Ingat aku" sesuai Figma
- ✅ **Sudah diimplementasikan** — Login.jsx = custom Log In page sesuai Figma
