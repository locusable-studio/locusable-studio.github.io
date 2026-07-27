# Locusable Studio Site Redesign — Apple-like Visual System

Date: 2026-07-27  
Status: Approved (user: full-site scope, approach 1, skip further design Q&A)

## Goal

Rewrite the entire static marketing site with a modern Apple-like visual language:

- Large whitespace, clear hierarchy, product-first storytelling
- System light/dark via `prefers-color-scheme` (no manual theme toggle)
- Strong scroll-theater motion on marketing surfaces
- Keep the existing brand title treatment: Instrument Serif + italic `Studio` in gold

Success looks like: opening any page feels like one coherent Apple-adjacent product site; first viewport is brand-led; each app reads as its own product chapter with icon-matched title color.

## Non-goals

- No SPA / build framework (stay GitHub Pages static HTML)
- No CMS, i18n, or manual theme switcher
- No inventing new product features or App Store links that do not already exist
- No rewriting privacy policy substance (layout/chrome only + light copy polish if needed)

## Decisions (locked)

| Topic | Choice |
|---|---|
| Scope | Full site: homepage + app pages + privacy/themes |
| Theme | Auto light + dark (`prefers-color-scheme`) |
| Homepage product presentation | Full-bleed product chapters (one app per sticky section) |
| Display type | Instrument Serif for studio brand + page hero titles |
| Product title color | Match each app icon primary |
| Copy | Keep English facts; shorten to Apple-like tone |
| Motion | Strong marketing scroll theater + sticky chapters |
| Architecture | Shared `assets/site.css` + `assets/site.js` |

## Product accent tokens

Extracted from current app icons (dominant non-white pixels):

| App | Token | Hex |
|---|---|---|
| Here Wallpaper | `--accent-wallpaper` | `#4CAC50` |
| Here Links | `--accent-links` | `#2094F0` |
| Here Sidefy | `--accent-sidefy` | `#F44034` |
| Studio brand italic | `--accent-studio` | `#C9A24D` (existing gold) |

Usage:

- Product/page hero titles use the matching accent
- Studio homepage brand: `Locusable` in foreground, `Studio` italic in `--accent-studio`
- CTAs and focus rings on product pages may tint with the page accent; body text stays neutral

## Visual system

### Light theme

- Background: cool near-white with subtle atmospheric gradient (not flat gray, not warm cream)
- Foreground: near-black
- Muted: mid cool gray
- Separators: hairline translucent black
- Product chapter media sits on soft tinted planes derived from each accent at low opacity

### Dark theme

- Background: near-black with soft depth gradient (not the old stone-brown card look)
- Foreground: near-white
- Muted: cool gray
- Separators: hairline translucent white
- Same accent tokens; media planes use slightly higher accent wash

### Typography

- Display / hero titles: `Instrument Serif` (regular + italic)
- UI / body: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif`
- Huge, tight tracking on heroes; generous leading on body
- One job per section: one headline, one short supporting sentence

### Layout principles

- Brand-first first viewport on homepage
- No generic card grids for marketing heroes
- Cards/panels only where they aid interaction (e.g. themes picker tiles that are already interactive)
- Full-bleed or near full-bleed product imagery preferred over inset media cards
- Mobile-first; sticky theater softens to stacked chapters on small screens when needed for usability

## Shared architecture

### New files

- `assets/site.css` — design tokens, chrome, marketing sections, content typography, light/dark
- `assets/site.js` — scroll chapter progress, reveal / pin behavior, reduced-motion fallback

### Page contract

Each HTML page:

1. Links shared CSS/JS + Instrument Serif
2. Sets `data-app` when product-scoped (`wallpaper` | `links` | `sidefy`) so accent CSS variables resolve
3. Uses shared chrome classes for topbar/footer
4. Keeps only page-unique markup and minimal page-local CSS (theme swatches, map layer controls)

### Theme behavior

- CSS variables under `:root` for light
- Override block under `@media (prefers-color-scheme: dark)`
- `theme-color` meta updated via small JS (or dual meta strategy) to match active scheme
- Respect `prefers-reduced-motion: reduce`: disable pin/scrub; keep simple fades or none

## Page designs

### Homepage (`index.html`)

Structure:

1. **Hero chapter (viewport 1)**  
   - Brand: `Locusable *Studio*`  
   - One short line (polished): e.g. “Indie apps that sense the present on Apple.”  
   - Optional primary scroll cue, no product cards in first viewport
2. **Product chapters (3 sticky sections)** — Wallpaper / Links / Sidefy  
   Each chapter:
   - Icon + Instrument Serif product title in app accent
   - One short supporting sentence
   - One CTA (“Explore” / App Store / external as already applicable)
   - Dominant product visual (existing screenshots; Sidefy uses icon-led composition until more shots exist)
3. **Footer** — copyright only (current), shared chrome

Motion:

- Sticky product chapters with scroll-driven opacity/scale/translate of media + title
- Hero entrance fade/rise
- Reduced-motion: static stacked chapters, no pin

### App marketing pages

`here-wallpaper/index.html`, `here-links/index.html` (and Sidefy remains external; homepage chapter links out)

Structure:

1. Shared topbar (back to Studio / related links already present)
2. Hero: app icon + Instrument Serif title in app accent + short tagline + existing primary CTA(s)
3. Scroll chapters for existing content blocks (features, shot strips, feature panels) restyled to theater sections — preserve destinations (themes/privacy/store)
4. Footer

Copy polish examples (tone, not new claims):

- Keep product facts and links
- Shorten leads; prefer concrete verbs over filler

### Secondary pages

`here-wallpaper/themes/`, `here-wallpaper/privacy/`, `here-links/privacy/`

- Same chrome + tokens + accent
- Content-first layout; no forced sticky theater on dense interactive tools (themes keeps utility UX with layer toggles)
- Light motion: section reveal only
- Privacy: readable long-form type scale, no card stack chrome

## Motion spec

| Surface | Behavior |
|---|---|
| Homepage hero | Entrance fade + slight rise |
| Homepage product chapters | Sticky pin; media/title scrub with scroll progress |
| App marketing heroes | Entrance + gentle media parallax |
| Themes / privacy | Intersection reveal only |
| Reduced motion | No pin/scrub/parallax |

Implementation preference: CSS sticky + `IntersectionObserver` / scroll progress in `site.js`. No animation framework dependency.

## Accessibility & quality bar

- Contrast passes for body text in both themes
- Accent-colored titles remain readable on both backgrounds (darken/lighten accent if needed via theme-specific title tokens)
- Focus-visible styles on all interactive elements
- Images keep meaningful alt text
- Keyboard users can skip/ignore theater; content order remains logical without JS

## Files touched

- Add: `assets/site.css`, `assets/site.js`
- Rewrite/restyle:  
  `index.html`  
  `here-wallpaper/index.html`  
  `here-wallpaper/themes/index.html`  
  `here-wallpaper/privacy/index.html`  
  `here-links/index.html`  
  `here-links/privacy/index.html`
- Docs: this spec; implementation plan under `docs/superpowers/plans/`

## Verification

1. Desktop + mobile widths: homepage first viewport is brand-only; product chapters read as separate compositions
2. macOS/iOS light and dark system appearance both look intentional
3. Sticky theater works in current Safari/Chrome; reduced-motion path remains usable
4. All existing deep links (store, themes, privacy, Sidefy external) still work
5. No broken assets; icons/screenshots reuse current paths
