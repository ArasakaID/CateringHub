# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**CateringHub** — A Laravel 13 + React (Inertia.js) catering ordering platform. Mobile-first design (max-width 430px, centered in gray `#e8e8e8` background). Uses Filament v5 as admin panel.

## Commands

```bash
# Dev — starts Laravel server, queue worker, logs, and Vite concurrently
composer run dev

# Build frontend assets (Vite)
npm run build

# Run tests (configures environment then runs PHPUnit)
composer run test

# Full project setup (composer install, .env, key:generate, migrate, npm build)
composer run setup
```

## Architecture

### Backend (Laravel 13)
- **PHP 8.4**, SQLite database (`database/database.sqlite`)
- **Routes** defined in `routes/web.php` and `routes/auth.php`
- **Controllers** in `app/Http/Controllers/`
- **Models**: `User`, `Category`, `Catering`, `Menu`, `Order`, `OrderItem`, `Review`

### Frontend (React + Inertia.js v2)
- **Pages** (`resources/js/Pages/`) — Each page is a full Inertia page component
  - `Home.jsx` — Landing with category carousel (grab-to-scroll), search bar, location dropdown, catering cards
  - `CateringAcara.jsx` — Catering profile with menu grid, keyword filters, info bar
  - Standard Breeze auth pages in `Pages/Auth/`
- **Layouts** (`resources/js/Layouts/`)
- **Components** (`resources/js/Components/`) — Shared UI components
- **SVG icons are inlined** directly in components (no external icon library)
- **Font**: "Sen" (weights 400-800) via Google Fonts, configured in `app.blade.php` and `tailwind.config.js`
- **Styling**: Tailwind CSS v3 with custom `scrollbar-hide` utility in `resources/css/app.css`

### Key Styling Patterns
- Color palette: `#fc6e2a` (primary orange), `#ff7622` (badges/icons), `#181c2e` (dark), `#a0a5ba` (subtitles), `#ecf0f4` (button bg), `#f6f6f6` (search bg)
- Cards use `boxShadow: '0 12px 30px rgba(150,150,154,0.15)'`
- All pages use `fontFamily: 'Sen, sans-serif'` inline style on root div
- Static images in `/images/icons/` (SVGs preferred)
- Container: `<div class="min-h-screen mx-auto bg-white shadow-xl" style="max-width: 430px;">` in `app.blade.php`

### Database
- 7 core tables: users, categories, caterings, menus, orders, order_items, reviews
- `Category` has `scopeActive()` — ordered by `sort_order`
- `Catering` has `scopeActive()` and `scopeFeatured()`
- Each `Catering` belongs to a `Category` and has many `Menu` items
- Seeders in `database/seeders/` (DatabaseSeeder runs all)
- Migrations in `database/migrations/`

### Image Handling
- **Do NOT READ any images from the project directory** — they consume too many tokens.
- For comparing UI output against Figma designs, use `compare_design` from **mcp browser-ai** instead.
- When saving screenshots, always use the `/screenshots/` directory with a random suffix to avoid overwriting existing files.
- **Use icons/images directly from Figma** — do not create your own. Always extract icons and resources from the Figma design file rather than building alternatives from scratch.
- **Jika screenshot gagal 3 kali berturut-turut**, hentikan percobaan dan akhiri sesi validasi. Jangan mencari alternatif lain untuk mengambil screenshot (seperti Puppeteer/Playwright, PowerShell, dll). Cukup lanjutkan task tanpa validasi visual.

### Figma MCP
- Use **figma-bridge** MCP tools only (not plugin_figma)
- **JANGAN GUNAKAN `get_document`** — output terlalu besar dan membuang token. Guna `get_design_context` atau `get_node` dengan node ID spesifik saja.
- Design file key: `unsaved-mqs49lag-zcqi8mlr`
- Pages: USER_FIX
