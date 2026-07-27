# Apple-like Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the full Locusable Studio static site with a shared Apple-like light/dark visual system, product-chapter homepage, and strong scroll theater while preserving existing links and product facts.

**Architecture:** Add shared `assets/site.css` + `assets/site.js`. Strip duplicated inline chrome styles from all 7 HTML pages. Homepage uses sticky product chapters; app marketing pages reuse hero/chapter patterns; utility pages (themes/layers/privacy) get shared chrome with lighter motion.

**Tech Stack:** Static HTML, CSS custom properties + `prefers-color-scheme`, vanilla JS (sticky/scroll progress + App Store iOS deep link helper), Instrument Serif via Google Fonts, GitHub Pages.

## Global Constraints

- Scope: all 7 HTML pages listed in the design spec
- Theme: auto via `prefers-color-scheme` only (no manual toggle)
- Display font: Instrument Serif for studio brand + page hero titles
- Accents: Wallpaper `#4CAC50`, Links `#2094F0`, Sidefy `#F44034`, Studio gold `#C9A24D`
- Copy: English, shorter Apple-like tone, no new product claims
- Motion: sticky scroll theater on homepage/marketing; `prefers-reduced-motion: reduce` disables pin/scrub
- Preserve all existing navigation/store/privacy/external URLs
- Keep App Store iOS deep-link script behavior on Here Wallpaper
- No build toolchain / no new npm deps

## File Structure

| File | Responsibility |
|---|---|
| `assets/site.css` | Tokens, chrome, typography, chapters, light/dark, reduced-motion |
| `assets/site.js` | Theme-color sync, chapter scroll progress, reveal, App Store iOS bind |
| `scripts/verify-site.mjs` | Link/class contract checks across HTML pages |
| `index.html` | Studio homepage chapters |
| `here-wallpaper/index.html` | Wallpaper marketing |
| `here-wallpaper/themes/index.html` | Theme catalog (page-local swatch CSS kept) |
| `here-wallpaper/layers/index.html` | Layer toggles (page-local interactive CSS/JS kept) |
| `here-wallpaper/privacy/index.html` | Privacy long-form |
| `here-links/index.html` | Links marketing |
| `here-links/privacy/index.html` | Privacy long-form |

---

### Task 1: Shared CSS design system

**Files:**
- Create: `assets/site.css`
- Create: `scripts/verify-site.mjs`
- Test: run `node scripts/verify-site.mjs` (initially fails until HTML wired)

**Interfaces:**
- Consumes: none
- Produces CSS contract:
  - `:root` tokens + dark overrides
  - `[data-app="wallpaper"|"links"|"sidefy"]` sets `--app-accent`
  - Classes: `.site-shell`, `.topbar`, `.footer`, `.display`, `.hero`, `.chapter`, `.chapter-sticky`, `.chapter-media`, `.cta`, `.store-btn`, `.coming-soon`, `.points`, `.point`, `.feature-rail`, `.prose`, `.reveal`
  - Body class hook none; progress via `--chapter-progress` on `.chapter-sticky`

- [ ] **Step 1: Add verifier that expects shared stylesheet link on every HTML page**

```js
// scripts/verify-site.mjs
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = [
  "index.html",
  "here-wallpaper/index.html",
  "here-wallpaper/themes/index.html",
  "here-wallpaper/layers/index.html",
  "here-wallpaper/privacy/index.html",
  "here-links/index.html",
  "here-links/privacy/index.html",
];

const must = [
  ["/assets/site.css", "shared stylesheet"],
  ["/assets/site.js", "shared script"],
];

let failed = 0;
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  for (const [needle, label] of must) {
    if (!html.includes(needle)) {
      console.error(`FAIL ${page}: missing ${label} (${needle})`);
      failed++;
    }
  }
}

// required destination links on homepage
const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const href of ["/here-wallpaper/", "/here-links/", "https://sidefy.locusable.com/"]) {
  if (!home.includes(`href="${href}"`)) {
    console.error(`FAIL index.html: missing href ${href}`);
    failed++;
  }
}

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log(`OK ${pages.length} pages pass shared asset contract`);
```

- [ ] **Step 2: Run verifier (expect FAIL)**

Run: `node scripts/verify-site.mjs`  
Expected: FAIL missing `/assets/site.css` and `/assets/site.js` on pages

- [ ] **Step 3: Write `assets/site.css` with tokens, chrome, chapters, light/dark, reduced-motion**

Include at minimum:

```css
:root {
  --bg: #f5f6f8;
  --bg-elevated: #ffffff;
  --fg: #0b0b0f;
  --muted: #6e6e73;
  --line: rgba(0, 0, 0, 0.08);
  --accent-studio: #c9a24d;
  --accent-wallpaper: #4cac50;
  --accent-links: #2094f0;
  --accent-sidefy: #f44034;
  --app-accent: var(--accent-studio);
  --shadow: 0 30px 80px rgba(0, 0, 0, 0.12);
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #050507;
    --bg-elevated: #111114;
    --fg: #f5f5f7;
    --muted: #a1a1a6;
    --line: rgba(255, 255, 255, 0.12);
    --shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
    color-scheme: dark;
  }
}

[data-app="wallpaper"] { --app-accent: var(--accent-wallpaper); }
[data-app="links"] { --app-accent: var(--accent-links); }
[data-app="sidefy"] { --app-accent: var(--accent-sidefy); }

/* Plus: reset, body atmospheric gradient, .display (Instrument Serif),
   .display em uses var(--app-accent) on product pages / studio gold on home brand,
   .site-shell, .topbar, .footer, .hero, .chapter-sticky (min-height ~100svh; sticky inner),
   .chapter-media, .cta/.store-btn tinted with --app-accent, .points, .prose,
   .reveal transitions, and @media (prefers-reduced-motion: reduce) overrides */
```

Homepage brand exception: `.brand-studio em { color: var(--accent-studio); }` while product titles use `.display em { color: var(--app-accent); }`.

- [ ] **Step 4: Commit**

```bash
git add assets/site.css scripts/verify-site.mjs
git commit -m "feat(site): add shared Apple-like design system CSS"
```

---

### Task 2: Shared JS (theme-color, theater, App Store bind)

**Files:**
- Create: `assets/site.js`
- Modify: `scripts/verify-site.mjs` (optional assert file exists)

**Interfaces:**
- Consumes: `.chapter-sticky`, `[data-reveal]`, `meta[name="theme-color"]`, `[data-app-store-link]`
- Produces:
  - `initThemeColor()`
  - `initReveals()`
  - `initStickyChapters()` sets `--chapter-progress` 0..1 on each `.chapter-sticky`
  - `bindAppStoreLinks()` (moved from wallpaper page inline script)

- [ ] **Step 1: Implement `assets/site.js`**

```js
(function () {
  function initThemeColor() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    var dark = window.matchMedia("(prefers-color-scheme: dark)");
    function apply() {
      meta.setAttribute("content", dark.matches ? "#050507" : "#f5f6f8");
    }
    apply();
    if (dark.addEventListener) dark.addEventListener("change", apply);
    else if (dark.addListener) dark.addListener(apply);
  }

  function initReveals() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  function initStickyChapters() {
    var chapters = document.querySelectorAll(".chapter-sticky");
    if (!chapters.length) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      chapters.forEach(function (c) { c.style.setProperty("--chapter-progress", "1"); });
      return;
    }
    function update() {
      var vh = window.innerHeight || 1;
      chapters.forEach(function (chapter) {
        var rect = chapter.getBoundingClientRect();
        var total = Math.max(chapter.offsetHeight - vh, 1);
        var raw = Math.min(Math.max(-rect.top / total, 0), 1);
        chapter.style.setProperty("--chapter-progress", String(raw));
      });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function bindAppStoreLinks() {
    var isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    document.querySelectorAll("[data-app-store-link]:not([data-app-store-bound])").forEach(function (link) {
      link.setAttribute("data-app-store-bound", "true");
      var iosUrl = link.getAttribute("data-ios-url");
      var webUrl = link.getAttribute("data-web-url") || link.getAttribute("href");
      if (!iosUrl || !webUrl) return;
      if (!link.hasAttribute("data-web-url")) link.setAttribute("data-web-url", webUrl);
      if (isIOS) {
        link.setAttribute("href", iosUrl);
        link.removeAttribute("target");
      }
    });
  }

  initThemeColor();
  initReveals();
  initStickyChapters();
  bindAppStoreLinks();
})();
```

- [ ] **Step 2: Confirm file loads as module-free classic script**

Run: `node --check assets/site.js`  
Expected: no output, exit 0

- [ ] **Step 3: Commit**

```bash
git add assets/site.js
git commit -m "feat(site): add shared scroll theater and theme helpers"
```

---

### Task 3: Rewrite homepage

**Files:**
- Modify: `index.html`
- Test: `node scripts/verify-site.mjs` (homepage portion)

**Interfaces:**
- Consumes: site.css/js classes from Tasks 1–2
- Produces homepage with brand hero + 3 `.chapter-sticky` product sections

- [ ] **Step 1: Replace `index.html` body with brand hero + three sticky product chapters**

Requirements:
- Keep Instrument Serif brand `Locusable <em>Studio</em>` with `.brand-studio`
- Tagline polish: `Indie apps that sense the present on Apple.`
- Chapters for Wallpaper / Links / Sidefy with `data-app` accents
- Preserve hrefs: `/here-wallpaper/`, `/here-links/`, `https://sidefy.locusable.com/`
- Use existing icons + shots (`/assets/shots/shot-1.jpg`, `/assets/here-links/shots/shot-1.jpg`; Sidefy icon-led media)
- Link `/assets/site.css` + `/assets/site.js`
- Remove old card CSS

- [ ] **Step 2: Serve and smoke-check**

Run: `python3 -m http.server 8765` then open `/`  
Expected: brand-first viewport; sticky chapters; light/dark follow system

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(site): rebuild studio homepage as product chapters"
```

---

### Task 4: Rewrite Here Wallpaper marketing + secondary pages

**Files:**
- Modify: `here-wallpaper/index.html`
- Modify: `here-wallpaper/themes/index.html`
- Modify: `here-wallpaper/layers/index.html`
- Modify: `here-wallpaper/privacy/index.html`

**Interfaces:**
- Consumes: shared chrome + `--app-accent` via `data-app="wallpaper"` on `<html>` or `<body>`
- Produces restyled pages; keep themes/layers page-local interactive CSS/JS

- [ ] **Step 1: Restyle `here-wallpaper/index.html`**

- `data-app="wallpaper"`
- Title `Here <em>Wallpaper</em>` in accent green
- Keep App Store button attrs (`data-app-store-link`, ios/web urls)
- Keep links to themes/layers/privacy
- Shorten tagline/points copy without new claims
- Remove inline App Store script (now in `site.js`)
- Keep shot assets paths

- [ ] **Step 2: Restyle themes + layers + privacy**

- Shared topbar/footer/tokens
- Keep existing interactive behavior and theme catalog data
- Privacy uses `.prose`; no sticky theater

- [ ] **Step 3: Verify preserved hrefs**

Run:

```bash
rg -n "apps.apple.com/app/id6789155385|/here-wallpaper/themes/|/here-wallpaper/layers/|/here-wallpaper/privacy/" here-wallpaper
```

Expected: matches present

- [ ] **Step 4: Commit**

```bash
git add here-wallpaper
git commit -m "feat(here-wallpaper): adopt shared Apple-like site system"
```

---

### Task 5: Rewrite Here Links pages + finish verifier

**Files:**
- Modify: `here-links/index.html`
- Modify: `here-links/privacy/index.html`
- Modify: `scripts/verify-site.mjs` (add accent/data-app checks if useful)

**Interfaces:**
- Consumes: shared system with `data-app="links"`
- Produces restyled Links marketing + privacy

- [ ] **Step 1: Restyle Links marketing + privacy**

- Accent blue titles
- Keep Coming soon CTA state
- Keep shot paths and privacy external links (`linkding.link`, GitHub issues)
- Copy polish only

- [ ] **Step 2: Run full verifier**

Run: `node scripts/verify-site.mjs`  
Expected: `OK 7 pages pass shared asset contract`

- [ ] **Step 3: Visual pass (light + dark, mobile width)**

Check homepage first viewport brand-only; product title colors match icons; sticky works; reduced-motion path readable.

- [ ] **Step 4: Commit**

```bash
git add here-links scripts/verify-site.mjs
git commit -m "feat(here-links): adopt shared Apple-like site system"
```

---

## Spec Coverage Checklist

| Spec requirement | Task |
|---|---|
| Shared CSS/JS architecture | 1, 2 |
| Auto light/dark | 1, 2 |
| Homepage sticky product chapters | 3 |
| Instrument Serif brand + page heroes | 1, 3, 4, 5 |
| Icon-matched product title colors | 1, 3, 4, 5 |
| Copy polish | 3, 4, 5 |
| Strong scroll theater + reduced motion | 1, 2 |
| Themes/layers utility pages restyled, interactions kept | 4 |
| Privacy pages shared chrome | 4, 5 |
| Preserve store/deep links | 2, 4, 5 |
| Verification | 1, 5 |
