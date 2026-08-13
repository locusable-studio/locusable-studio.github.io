# Locusable Studio

## Home product grid card sizes

The home page uses a **4-column × 3-row** CSS grid. Card sizes are named by column × row spans:

| Name | Span | Class | Notes |
|------|------|-------|-------|
| 方卡 | 1×1 | `home-app-card--1x1` | Former Wallpaper feature cell |
| 竖版小卡 | 1×2 | `home-app-card--1x2` | Quarter width, double height |
| 横版小卡 | 2×1 | `home-app-card--2x1` | Half width, single row |
| 横版大卡 | 4×1 | `home-app-card--4x1` | Full width, single row |

All home cards must use one of these standard sizes. Do not invent ad-hoc spans.

### Current home layout

```
[Wallpaper 1×2] [Sidefy 1×2] [Island 2×1 ]
[      ↑        ] [     ↑      ] [TRMNL 2×1  ]
[HackerBa 2×1              ] [Links 2×1  ]
```

- Left: Wallpaper + Sidefy as 竖版小卡
- Right (middle stack): Island + TRMNL as 横版小卡
- Bottom: HackerBa + Links as 横版小卡, left-right

### List layout height

Desktop list-mode cards use **one grid row height** (`--home-row-h`, same as 横版小卡 / “1 高度”), not a taller clamp. 竖版小卡 also becomes one row tall in list mode.

### Mobile home (≤800px) — desktop rules above stay unchanged

- **Grid:** single column; every card is a compact horizontal row (absolute icon). Tighten left/right padding vs desktop; smaller title/subhead.
- **List:** unlock fixed `--home-row-h` (`height: auto`). Icon stays **in-flow** — do **not** keep the desktop `6rem` absolute-icon left gutter. Copy `max-width` ~54%; one shot only; shot `max-height` explicit (not `calc(var(--home-row-h)…)`).
- ≤520px: further tighten padding, icon, type, and shot radius (`--shot-radius-sm`).

### 竖版小卡 (grid)

With no screenshots in grid, center content vertically (`justify-content: center`) so the tall card does not look empty at the bottom.

## Platforms line (home + product pages)

The `.platforms` label must stay consistent across home card and product hero.

| State | Format | Example |
|-------|--------|---------|
| Released | `{Platform}` | `Mac`, `iPhone`, `Chrome`, `iPhone and iPad`, `iPhone, iPad, and Mac` |
| Coming soon | `{Platform} · Coming Soon` | `Mac · Coming Soon`, `iPhone · Coming Soon` |

Rules:
- Always include the real platform. Never replace it with only `Coming Soon`.
- Home card and product page must use the **same** platforms string.
- Every coming-soon product uses this same platforms pattern (Links and TRMNL alike). Do not leave one as bare platform while another appends Coming Soon.
- Coming Soon CTA (`unit__links-soon`) is separate from the platforms line; do not invent App Store / GitHub links for unreleased products.
- About list copy for coming-soon products should also say Coming Soon.
- Home card and product hero `unit__subhead` must use the same one-liner.

## App accent colors

`--accent-*` / `theme-color` / `site.js` `APP_THEME_COLORS` must match the product icon’s primary fill. Sample the icon; do not invent a nearby system color.

| App | Accent |
|-----|--------|
| Wallpaper | `#4caf50` |
| Links | `#2196f3` |
| Sidefy | `#f44336` |
| Island | `#9c27b0` |
| HackerBa | `#ff6600` |
| TRMNL | `#3c50b4` |

Sample from `icon-192.png` (dominant non-white fill). Tiny deltas from “nearby” hex still count as wrong.

## UI icons (Lucide)

Theme / layout / chevron icons are **inline SVG** with `stroke="currentColor"` (not CSS `mask-image` of external Lucide files). External stroke SVGs used as CSS masks render broken/garbled in WebKit.

Keep `assets/lucide/*.svg` as source reference; page UI should embed the paths inline.

## Screenshot / shot rules

- **Home product cards: no screenshots** in grid or list. Shots live on product pages only.
- **Aspect ratio is sacred.** Never invent, override, or stretch screenshot proportions.
  - Use the file’s intrinsic ratio only (`width: auto; height: auto`).
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