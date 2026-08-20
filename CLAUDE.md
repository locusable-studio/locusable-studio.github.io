# Locusable Studio

## Home product grid card sizes

The home page uses a **4-column × 2-row** CSS grid. Card sizes are named by column × row spans:

| Name | Span | Class | Used? |
|------|------|-------|-------|
| 主推方卡 | 2×2 | `home-app-card--2x2` | ✅ Home: Wallpaper |
| 横版小卡 | 2×1 | `home-app-card--2x1` | ✅ Home: Sidefy, Island · Coming Soon: HackerBa · Unmaintained: TRMNL, Links |
| 方卡 | 1×1 | `home-app-card--1x1` | ⚠️ CSS reserved, not used |
| 竖版小卡 | 1×2 | `home-app-card--1x2` | ⚠️ CSS reserved, not used (legacy; `verify-site.mjs` still asserts the class exists — if you remove it, update the assertion too) |
| 横版大卡 | 4×1 | `home-app-card--4x1` | ⚠️ CSS reserved, not used |

All home cards must use one of these standard classes. Do not invent ad-hoc spans.

### Current home layout

```
[Wallpaper 2×2 ] [Sidefy 2×1  ]
[              ] [Island 2×1  ]
```

- Wallpaper is the 2×2 主推方卡 (left).
- Right stack: Sidefy + Island as 2×1 cards.
- Here Links and TRMNL are **not** on the homepage — they live on `/unmaintained/` as 2×1 cards.
- HackerBa is **not** on the homepage — it lives on `/coming-soon/` as a 2×1 card.

### Grid row height

Desktop grid does **not** stretch to fill the remaining viewport. Rows use `--home-row-h` (横版小卡 / “1 高度”: leftover viewport / 3, capped). Two home rows leave empty space above the footer. Coming Soon / Unmaintained only create as many rows as needed (`grid-auto-rows`).

### List layout height

Desktop list-mode cards use **one grid row height** (`--home-row-h`, same as 横版小卡 / “1 高度”), not a taller clamp. 竖版/主推方卡 also becomes one row tall in list mode.

### Mobile home (≤800px) — desktop rules above stay unchanged

- **Grid:** single column; every card is a compact horizontal row (absolute icon). Cards reorder via `order`: wallpaper 1 → sidefy 2 → island 3 → hackerba 4 → trmnl 5 → links 6. Tighten left/right padding vs desktop; smaller title/subhead. Home only shows wallpaper/sidefy/island; trmnl/links live on `/unmaintained/`, hackerba on `/coming-soon/`.
- **List:** unlock fixed `--home-row-h` (`height: auto`). Icon stays **in-flow** — do **not** keep the desktop `6rem` absolute-icon left gutter. Copy `max-width` ~54%; one shot only; shot `max-height` explicit (not `calc(var(--home-row-h)…)`).
- ≤520px: further tighten padding, icon, type, and shot radius (`--shot-radius-sm`).

### 主推方卡 / 竖版卡 (grid)

With no screenshots in grid, center content vertically (`justify-content: center`) so the tall card does not look empty at the bottom.

## Platforms line (home + product pages)

The `.platforms` label must stay consistent across home card and product hero.

| State | Format | Example |
|-------|--------|---------|
| Released | `{Platform}` | `Mac`, `iPhone`, `Chrome`, `iPhone and iPad` |
| Coming soon | `{Platform} · Coming Soon` | `Mac · Coming Soon`, `iPhone · Coming Soon` |

Rules:
- Always include the real platform. Never replace it with only `Coming Soon`.
- Home card and product page must use the **same** platforms string.
- Every coming-soon product uses this same platforms pattern. Do not leave one as bare platform while another appends Coming Soon.
- Coming Soon CTA (`unit__links-soon`) is separate from the platforms line; do not invent App Store / GitHub links for unreleased products.
- About list copy for coming-soon products should also say Coming Soon.
- Home card and product hero `unit__subhead` must use the same one-liner.

## App accent colors

`--accent-*` / `theme-color` / `site.js` `APP_THEME_COLORS` must match the product icon’s primary fill. Sample the icon; do not invent a nearby system color.

| App | Accent |
|-----|--------|
| Studio (about) | `#b8860b` |
| Wallpaper | `#4caf50` |
| Links | `#2196f3` |
| Sidefy | `#f44336` |
| Island | `#9c27b0` |
| HackerBa | `#ff6600` |
| TRMNL | `#3c50b4` |

- Every page’s `data-app` (including `studio` on `/about/`) must have a matching `APP_THEME_COLORS` entry in `site.js`, or the JS overrides the `<meta name="theme-color">` with black/white and the head declaration is dead.
- `verify-site.mjs` `themeColors` table asserts every page’s `theme-color` — keep it in sync when adding apps.

## Theme catalog sync

- `here-wallpaper/themes/data/*.json` mirror the app's resources. Re-run
  `node scripts/sync-wallpaper-themes.mjs` (from this repo root) whenever the
  HereWallpaper app adds/changes themes — the script copies from
  `../HereWallpaper/HereWallpaperCore/Resources`.
- `verify-site.mjs` asserts a minimum theme count per catalog so stale data
  fails CI instead of shipping.

## Social / SEO meta

- Every page must ship `og:title` / `og:description` / `og:type` / `og:url` / `og:image` and `twitter:card` / `twitter:title` / `twitter:description`.
- `og:title` and `og:description` reuse the same `data-i18n-content` keys as `<title>` / `meta[name=description]` so the language toggle stays consistent.
- `og:image` must be an absolute URL (`https://locusable.com/...`), pointing at the product’s `icon-192.png` (or `/icon-512.png` for hub pages).

## No-JS fallback

- Every page includes `<noscript><style>[data-reveal]{opacity:1;transform:none}</style></noscript>` right after the stylesheet link — without it the whole page is invisible when JS is disabled.

## Browser compatibility

- Layout depends on `:has()` in a few spots (home grid padding, page tints). A `@supports not selector(:has(*))` block in `site.css` keeps the home grid clear of the fixed masthead on pre-2022 browsers — preserve it.

## Brand font

- Only one face ships: `assets/fonts/Maplestory-Bold.woff2`, **subsetted** to Latin letters + digits (~5KB). The former Light face was dead weight — never reintroduce a full font file.
- Every page preloads it (`<link rel="preload" ... as="font" type="font/woff2" crossorigin>` before the stylesheet) so the brand wordmark does not pop in late.
- Brand glyph coverage is limited to `Locusable Studio` + ASCII; any new brand copy must fit that set or add glyphs to the subset.

## UI icons (Lucide)

Theme / layout / chevron icons are **inline SVG** with `stroke="currentColor"` (not CSS `mask-image` of external Lucide files). External stroke SVGs used as CSS masks render broken/garbled in WebKit.

Keep `assets/lucide/*.svg` as source reference; page UI should embed the paths inline.

## Screenshot / shot rules

- **Home product cards: no screenshots** in grid or list. Shots live on product pages only.
- **Aspect ratio is sacred.** Never invent, override, or stretch screenshot proportions.
  - The `<img width height>` attributes must equal the **file’s intrinsic dimensions** (verify with the real file; e.g. `assets/shots/shot-*.jpg` is 585×1266, `assets/here-links/shots/shot-*.jpg` is 585×1272 — do not copy hero dimensions onto phone shots).
  - Scale with `max-height` / `max-width` caps; both axes must shrink together.
  - Forbidden: `width: 100%` + `max-height` without allowing width to shrink (that flattens portraits).
  - Forbidden: equal grid columns that force every shot to the same width.
  - Forbidden: made-up `aspect-ratio` values that are not the asset’s real ratio (crop frames for “bury” peeks on product pages are the only exception, and must derive from the real ratio × visible fraction).
  - Prefer `object-fit: contain` when a max box is required; never `object-fit: fill` on product shots.
- **Rounded corners are required** on every product screenshot peek.
- Radius is **top only** (flush bottom crop): `border-radius: var(--shot-radius) var(--shot-radius) 0 0`.
- Tokens:
  - Desktop / default: `--shot-radius: 18px`
  - Mobile (≤520px): `--shot-radius-sm: 12px`
- **Flush to the bottom** of the card. Do not add padding, margin, or gap under shots to “make room” for radius — that leaves empty bands. Bottom edge is clipped by the card (`overflow: hidden`); top corners stay visible.
- Do not put `overflow: hidden` on the shot wrapper in a way that clips the **top** rounded corners.
