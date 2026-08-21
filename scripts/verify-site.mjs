import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = [
  "index.html",
  "about/index.html",
  "here-wallpaper/index.html",
  "here-wallpaper/themes/index.html",
  "here-wallpaper/privacy/index.html",
  "here-links/index.html",
  "here-links/privacy/index.html",
  "here-sidefy/index.html",
  "here-sidefy/privacy/index.html",
  "here-island/index.html",
  "here-hackerba/index.html",
  "here-trmnl/index.html",
  "coming-soon/index.html",
  "unmaintained/index.html",
];

const cssVersion = "191";
const jsVersion = "59";
const i18nJsVersion = "13";

const themeMapJsVersion = "1";

const must = [
  ["/assets/site.css", "shared stylesheet"],
  ["/assets/site.js", "shared script"],
  ["/assets/i18n.js", "i18n script"],
  [`site.css?v=${cssVersion}`, "css cache version"],
  [`site.js?v=${jsVersion}`, "js cache version"],
  [`i18n.js?v=${i18nJsVersion}`, "i18n cache version"],
  ["<noscript><style>[data-reveal]{opacity:1;transform:none}</style></noscript>", "no-JS fallback"],
  ['rel="preload" href="/assets/fonts/Maplestory-Bold.woff2" as="font" type="font/woff2" crossorigin', "font preload"],
  ['property="og:title"', "og:title"],
  ['property="og:description"', "og:description"],
  ['property="og:type"', "og:type"],
  ['property="og:url"', "og:url"],
  ['property="og:image"', "og:image"],
  ['name="twitter:card"', "twitter:card"],
  ['name="twitter:title"', "twitter:title"],
  ['name="twitter:description"', "twitter:description"],
];

const breadcrumbs = {
  "about/index.html": [
    'href="/">Locusable <em>Studio</em>',
    '<span aria-current="page" data-i18n="crumb.about">About</span>',
  ],
  "here-wallpaper/index.html": [
    'href="/">Locusable <em>Studio</em>',
    '<span aria-current="page">Here Wallpaper</span>',
  ],
  "here-links/index.html": [
    'href="/">Locusable <em>Studio</em>',
    '<span aria-current="page">Here Links</span>',
  ],
  "here-sidefy/index.html": [
    'href="/">Locusable <em>Studio</em>',
    '<span aria-current="page">Here Sidefy</span>',
  ],
  "here-island/index.html": [
    'href="/">Locusable <em>Studio</em>',
    '<span aria-current="page">Here Island</span>',
  ],
  "here-hackerba/index.html": [
    'href="/">Locusable <em>Studio</em>',
    '<span aria-current="page">Here HackerBa</span>',
  ],
  "here-trmnl/index.html": [
    'href="/">Locusable <em>Studio</em>',
    '<span aria-current="page">Here TRMNL</span>',
  ],
  "here-wallpaper/themes/index.html": [
    'href="/">Locusable <em>Studio</em>',
    'href="/here-wallpaper/">Here Wallpaper',
    '<span aria-current="page" data-i18n="crumb.themes">Themes</span>',
  ],
  "here-wallpaper/privacy/index.html": [
    'href="/">Locusable <em>Studio</em>',
    'href="/here-wallpaper/">Here Wallpaper',
    '<span aria-current="page" data-i18n="crumb.privacy">Privacy</span>',
  ],
  "here-links/privacy/index.html": [
    'href="/">Locusable <em>Studio</em>',
    'href="/here-links/">Here Links',
    '<span aria-current="page" data-i18n="crumb.privacy">Privacy</span>',
  ],
  "here-sidefy/privacy/index.html": [
    'href="/">Locusable <em>Studio</em>',
    'href="/here-sidefy/">Here Sidefy',
    '<span aria-current="page" data-i18n="crumb.privacy">Privacy</span>',
  ],
};

const productFaqs = {
  "here-wallpaper/index.html": [
    "Is Here Wallpaper free?",
    "What does Here Wallpaper do?",
    "What do I need to run it?",
    "Does Here Wallpaper collect personal data?",
  ],
  "here-links/index.html": [
    "Is Here Links free?",
    "What does Here Links do?",
    "What do I need to run it?",
    "Does Here Links collect personal data?",
  ],
  "here-sidefy/index.html": [
    "Is Here Sidefy free?",
    "What does Here Sidefy do?",
    "What do I need to run it?",
    "Does Here Sidefy collect personal data?",
  ],
  "here-island/index.html": [
    "Is Here Island free?",
    "What does Here Island do?",
    "What do I need to run it?",
    "Does Here Island collect personal data?",
  ],
  "here-hackerba/index.html": [
    "Is Here HackerBa free?",
    "What does Here HackerBa do?",
    "What do I need to run it?",
    "Does Here HackerBa collect personal data?",
  ],
  "here-trmnl/index.html": [
    "Is Here TRMNL free?",
    "What does Here TRMNL do?",
    "What do I need to run it?",
    "Does Here TRMNL collect personal data?",
  ],
};

let failed = 0;
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  for (const [needle, label] of must) {
    if (!html.includes(needle)) {
      console.error(`FAIL ${page}: missing ${label} (${needle})`);
      failed++;
    }
  }
  if (html.includes("crumb-back") || html.includes("crumbbar--back")) {
    console.error(`FAIL ${page}: legacy back-button nav found`);
    failed++;
  }
  if (page !== "index.html" && page !== "coming-soon/index.html" && page !== "unmaintained/index.html" && html.includes('href="/about/"')) {
    console.error(`FAIL ${page}: About link should only appear on hub pages`);
    failed++;
  }
  const crumbs = breadcrumbs[page];
  if (crumbs) {
    if (!html.includes('class="crumbs"')) {
      console.error(`FAIL ${page}: missing breadcrumb list (.crumbs)`);
      failed++;
    }
    for (const needle of crumbs) {
      if (!html.includes(needle)) {
        console.error(`FAIL ${page}: missing breadcrumb segment (${needle})`);
        failed++;
      }
    }
  }
  if (page.endsWith("privacy/index.html") && !html.includes('class="doc-layout"')) {
    console.error(`FAIL ${page}: missing doc-layout wrapper`);
    failed++;
  }
  const faqQuestions = productFaqs[page];
  if (faqQuestions) {
    if (!html.includes('class="product-faq"')) {
      console.error(`FAIL ${page}: missing product FAQ section`);
      failed++;
    }
    for (const question of faqQuestions) {
      if (!html.includes(`>${question}</summary>`)) {
        console.error(`FAIL ${page}: missing FAQ question (${question})`);
        failed++;
      }
    }
  }
}

if (fs.existsSync(path.join(root, "here-wallpaper/layers/index.html"))) {
  console.error("FAIL here-wallpaper/layers/index.html should not exist (layers merged into themes)");
  failed++;
}

const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
const about = fs.readFileSync(path.join(root, "about/index.html"), "utf8");
for (const needle of [
  "Small native tools for the devices you already use.",
  "interface corners most people skip",
  "A good place for a small tool",
  "The notch, the screen edge, the gap between wallpaper and icons",
]) {
  if (!about.includes(needle)) {
    console.error(`FAIL about/index.html: missing studio context (${needle})`);
    failed++;
  }
}
if (about.includes("personal information such as self-hosted bookmarks")) {
  console.error("FAIL about/index.html: removed bookmark rationale should not be shown");
  failed++;
}
for (const needle of [
  "A two-person studio from Xi'an, China,",
  "more than a decade of programming experience",
]) {
  if (about.includes(needle)) {
    console.error(`FAIL about/index.html: removed studio detail should not be shown (${needle})`);
    failed++;
  }
}
if (!home.includes('href="/about/"')) {
  console.error("FAIL index.html: missing About link");
  failed++;
}
for (const href of ["/here-wallpaper/", "/here-sidefy/", "/here-island/", "/coming-soon/", "/unmaintained/"]) {
  if (!home.includes(`href="${href}"`)) {
    console.error(`FAIL index.html: missing href ${href}`);
    failed++;
  }
}
if ((home.match(/class="unit unit--tint[^"]*home-app-card/g) || []).length !== 3) {
  console.error("FAIL index.html: homepage should have three tinted app cards");
  failed++;
}
if (home.includes("unit--soft home-app-card") || home.includes("home-app-card--feature") || home.includes("home-app-card__screens")) {
  console.error("FAIL index.html: homepage should not use soft/feature/screens card patterns");
  failed++;
}
if (home.includes("home-app-card__details")) {
  console.error("FAIL index.html: homepage app cards should not include expandable details");
  failed++;
}
for (const needle of [
  'class="home-product-grid"',
  "home-app-card--2x2",
  "home-app-card--2x1",
  "home-app-card__arrow",
  'data-app="island"',
  'data-app="sidefy"',
  'data-app="wallpaper"',
]) {
  if (!home.includes(needle)) {
    console.error(`FAIL index.html: missing homepage card structure (${needle})`);
    failed++;
  }
}
if (!home.includes('class="home-app-card__shot"') || !home.includes('/assets/shots/shot-1.jpg?v=10" width="585" height="1266"')) {
  console.error("FAIL index.html: missing wallpaper shot in the 2x2 card");
  failed++;
}

if (home.includes("home-card-tags")) {
  for (const needle of [
    'data-i18n="home.wallpaper.tag.osm"',
    'data-i18n="home.wallpaper.tag.maplibre"',
    'data-i18n="home.wallpaper.tag.sync"',
  ]) {
    if (!home.includes(needle)) {
      console.error(`FAIL index.html: missing wallpaper tag (${needle})`);
      failed++;
    }
  }
}

if (home.includes("home-app-card__list-shots")) {
  console.error("FAIL index.html: homepage cards should not embed list screenshots");
  failed++;
}
if (home.includes('data-app="links"') || home.includes('data-app="hackerba"') || home.includes('data-app="trmnl"')) {
  console.error("FAIL index.html: Links, HackerBa, and TRMNL do not belong on the homepage");
  failed++;
}
const comingSoon = fs.readFileSync(path.join(root, "coming-soon/index.html"), "utf8");
if (comingSoon.includes('data-app="links"')) {
  console.error("FAIL coming-soon/index.html: Here Links belongs on unmaintained");
  failed++;
}
if (!comingSoon.includes('data-app="hackerba"') || !comingSoon.includes("home-product-grid")) {
  console.error("FAIL coming-soon/index.html: should list HackerBa in the product grid");
  failed++;
}
if (comingSoon.includes("home-app-card__list-shots")) {
  console.error("FAIL coming-soon/index.html: cards should not embed list screenshots");
  failed++;
}
const unmaintained = fs.readFileSync(path.join(root, "unmaintained/index.html"), "utf8");
if (unmaintained.includes('data-app="hackerba"')) {
  console.error("FAIL unmaintained/index.html: HackerBa belongs on coming-soon");
  failed++;
}
if (!unmaintained.includes('data-app="trmnl"') || !unmaintained.includes('data-app="links"') || !unmaintained.includes("home-product-grid")) {
  console.error("FAIL unmaintained/index.html: should list TRMNL and Links in the product grid");
  failed++;
}
if (unmaintained.includes("home-app-card__list-shots")) {
  console.error("FAIL unmaintained/index.html: cards should not embed list screenshots");
  failed++;
}
if (!home.includes('href="/unmaintained/" class="edge-plaster edge-plaster--left"')) {
  console.error("FAIL index.html: missing left unmaintained plaster");
  failed++;
}
if (!unmaintained.includes('href="/" class="edge-plaster edge-plaster--right"')) {
  console.error("FAIL unmaintained/index.html: missing right Released plaster");
  failed++;
}
if (home.includes("home-app-card--island") || home.includes("home-app-card__peeks")) {
  console.error("FAIL index.html: Island should use a compact card without peeks");
  failed++;
}
const siteCss = fs.readFileSync(path.join(root, "assets/site.css"), "utf8");
if (!siteCss.includes('html[data-home-layout="list"] .home-app-card__shot')) {
  console.error("FAIL assets/site.css: shot must hide in list layout (and therefore on mobile)");
  failed++;
}
if (!/@media \(max-width: 800px\)[\s\S]*html\[data-home-layout="list"\] \.home-app-card--2x2 \.product-hero__icon/.test(siteCss)) {
  console.error("FAIL assets/site.css: mobile compact rows must override list 2x2 icon size");
  failed++;
}
if (siteCss.includes(".home-app-card--feature") || siteCss.includes(".home-app-card__screens")) {
  console.error("FAIL assets/site.css: legacy feature/screens homepage styles should be removed");
  failed++;
}
if (!siteCss.includes("grid-auto-rows: var(--home-row-h")) {
  console.error("FAIL assets/site.css: homepage grid rows should use --home-row-h (not stretch to fill)");
  failed++;
}
if (!siteCss.includes(".home-app-card--1x2 {")) {
  console.error("FAIL assets/site.css: missing 竖版小卡 size class");
  failed++;
}
if (!siteCss.includes(".home-app-card--2x1 {")) {
  console.error("FAIL assets/site.css: missing 横版小卡 size class");
  failed++;
}
if (siteCss.includes(".home-app-card--island")) {
  console.error("FAIL assets/site.css: Island full-width homepage card styles should be removed");
  failed++;
}
if (!siteCss.includes("--card-radius: 20px;") || !siteCss.includes("border-radius: var(--card-radius);")) {
  console.error("FAIL assets/site.css: cards should use the unified --card-radius token");
  failed++;
}
if (!siteCss.includes(".site-shell:has(.home-product-grid) main")) {
  console.error("FAIL assets/site.css: homepage grid should fill the main viewport area");
  failed++;
}
if (!siteCss.includes("padding-top: var(--site-chrome-h-masthead);")) {
  console.error("FAIL assets/site.css: homepage grid should clear the fixed masthead");
  failed++;
}
if (!siteCss.includes("border-radius: var(--card-radius);") || !siteCss.includes("aspect-ratio: 1400 / 787;")) {
  console.error("FAIL assets/site.css: screenshots should show full ratio with --card-radius corners");
  failed++;
}
if (siteCss.includes("26px 26px 0 0") || /\.unit__media--desktop-peek \{[^}]*aspect-ratio/.test(siteCss)) {
  console.error("FAIL assets/site.css: mobile screenshots must not flush-crop (full ratio, four-corner radius)");
  failed++;
}
if (!siteCss.includes('html[data-theme="dark"] .product-hero {')) {
  console.error("FAIL assets/site.css: product hero dark tint should respect data-theme");
  failed++;
}
for (const needle of [
  ".detail-feature-grid",
  ".feature-list--cards",
]) {
  if (!siteCss.includes(needle)) {
    console.error(`FAIL assets/site.css: missing product-detail layout (${needle})`);
    failed++;
  }
}
for (const needle of ['content: "›";']) {
  if (!siteCss.includes(needle)) {
    console.error(`FAIL assets/site.css: missing unified breadcrumb styling (${needle})`);
    failed++;
  }
}
const crumbBrandRule = siteCss.match(/\.crumbs a\[href="\/"\] \{([^}]*)\}/)?.[1] || "";
for (const needle of [
  'font-family: "Maplestory"',
  "font-size: var(--site-brand-size);",
]) {
  if (!crumbBrandRule.includes(needle)) {
    console.error(`FAIL assets/site.css: breadcrumb brand should match masthead (${needle})`);
    failed++;
  }
}
for (const needle of [
  ".product-faq {",
  ".product-faq details {",
  ".product-faq summary {",
]) {
  if (!siteCss.includes(needle)) {
    console.error(`FAIL assets/site.css: missing FAQ style (${needle})`);
    failed++;
  }
}
if (!siteCss.includes(".about-page .unit__subhead {\n  max-width: 34rem;")) {
  console.error("FAIL assets/site.css: About copy should avoid orphaned final words");
  failed++;
}
if (!siteCss.includes(".crumbbar__inner {\n  max-width: var(--max-wide);\n  margin: 0 auto;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;")) {
  console.error("FAIL assets/site.css: breadcrumb content should align with homepage masthead");
  failed++;
}

const wallpaper = fs.readFileSync(path.join(root, "here-wallpaper/index.html"), "utf8");
if (!wallpaper.includes('data-i18n="platform.iphoneIpad"')) {
  console.error("FAIL here-wallpaper/index.html: platform line should be iPhone and iPad");
  failed++;
}
if (!wallpaper.includes('id="mac-title"') || !wallpaper.includes("unit__media--desktop-peek")) {
  console.error("FAIL here-wallpaper/index.html: missing Mac desktop preview section");
  failed++;
}
if (!fs.existsSync(path.join(root, "assets/here-wallpaper/shot-mac-chicago.jpg"))) {
  console.error("FAIL missing assets/here-wallpaper/shot-mac-chicago.jpg");
  failed++;
}
if (fs.existsSync(path.join(root, "assets/here-wallpaper/shot-mac-marrakech.jpg"))) {
  console.error("FAIL assets/here-wallpaper/shot-mac-marrakech.jpg should be removed");
  failed++;
}
if (wallpaper.includes("shot-mac-marrakech") || wallpaper.includes("desktop-dual")) {
  console.error("FAIL here-wallpaper/index.html: Mac preview should be a single desktop-peek image");
  failed++;
}


if (wallpaper.includes("detail-feature-media")) {
  console.error("FAIL here-wallpaper/index.html: place-and-layout should not duplicate hero previews");
  failed++;
}
if ((wallpaper.match(/\/assets\/shots\/shot-1\.jpg\?v=10/g) || []).length !== 1) {
  console.error("FAIL here-wallpaper/index.html: hero preview should appear only once");
  failed++;
}
// Phone shots must declare their intrinsic dimensions (585×1266 / 585×1272), not a copied hero size.
if ((wallpaper.match(/\/assets\/shots\/shot-\d\.jpg\?v=10" width="585" height="1266"/g) || []).length !== 4) {
  console.error("FAIL here-wallpaper/index.html: hero phone shots should declare 585x1266");
  failed++;
}

const linksShots = fs.readFileSync(path.join(root, "here-links/index.html"), "utf8");
if ((linksShots.match(/\/assets\/here-links\/shots\/shot-\d\.jpg\?v=\d" width="585" height="1272"/g) || []).length !== 4) {
  console.error("FAIL here-links/index.html: phone shots should declare 585x1272");
  failed++;
}

// Home cards render icons at 52px (CSS), so the HTML attributes must match, not the 84px hero size.
const homeCardIcon = (html) => (html.match(/class="unit unit--tint[^"]*home-app-card[\s\S]*?width="52" height="52"/g) || []).length;
if (homeCardIcon(home) !== 3) {
  console.error("FAIL index.html: all three home cards should declare 52px icons");
  failed++;
}
if (homeCardIcon(comingSoon) !== 1) {
  console.error("FAIL coming-soon/index.html: the HackerBa card should declare a 52px icon");
  failed++;
}
if (homeCardIcon(unmaintained) !== 2) {
  console.error("FAIL unmaintained/index.html: both unmaintained cards should declare 52px icons");
  failed++;
}

const siteJs = fs.readFileSync(path.join(root, "assets/site.js"), "utf8");
if (!siteJs.includes('studio: "#b8860b"')) {
  console.error("FAIL assets/site.js: APP_THEME_COLORS should include the studio accent");
  failed++;
}

const linksPage = fs.readFileSync(path.join(root, "here-links/index.html"), "utf8");
if (!linksPage.includes("feature-list--cards")) {
  console.error("FAIL here-links/index.html: missing feature-card treatment");
  failed++;
}

const island = fs.readFileSync(path.join(root, "here-island/index.html"), "utf8");
if (!island.includes("detail-feature-grid")) {
  console.error("FAIL here-island/index.html: missing paired feature layout");
  failed++;
}
for (const href of [
  "https://github.com/locusable-studio/HereIsland",
]) {
  if (!island.includes(`href="${href}"`)) {
    console.error(`FAIL here-island/index.html: missing href ${href}`);
    failed++;
  }
}
for (const needle of [
  "brew tap locusable-studio/tap",
  "brew trust --cask locusable-studio/tap/here-island",
  "brew install --cask here-island",
]) {
  if (!island.includes(needle)) {
    console.error(`FAIL here-island/index.html: missing ${needle}`);
    failed++;
  }
}

const hackerba = fs.readFileSync(path.join(root, "here-hackerba/index.html"), "utf8");
if (!hackerba.includes("detail-feature-grid")) {
  console.error("FAIL here-hackerba/index.html: missing paired feature layout");
  failed++;
}
for (const href of [
  "https://github.com/sha2kyou/HackerBa",
]) {
  if (!hackerba.includes(`href="${href}"`)) {
    console.error(`FAIL here-hackerba/index.html: missing href ${href}`);
    failed++;
  }
}
for (const needle of [
  "Here <em>HackerBa</em>",
  "/assets/here-hackerba/shot-list.jpg",
  "/assets/here-hackerba/shot-thread.jpg",
  "unit__media--desktop-dual",
]) {
  if (!hackerba.includes(needle)) {
    console.error(`FAIL here-hackerba/index.html: missing ${needle}`);
    failed++;
  }
}

const sidefy = fs.readFileSync(path.join(root, "here-sidefy/index.html"), "utf8");
if (!sidefy.includes("detail-feature-grid")) {
  console.error("FAIL here-sidefy/index.html: missing paired feature layout");
  failed++;
}
for (const href of [
  "https://apps.apple.com/app/id6751482006",
  "https://sidefy.locusable.com/",
  "/here-sidefy/privacy/",
]) {
  if (!sidefy.includes(`href="${href}"`)) {
    console.error(`FAIL here-sidefy/index.html: missing href ${href}`);
    failed++;
  }
}

const sidefyPrivacy = fs.readFileSync(path.join(root, "here-sidefy/privacy/index.html"), "utf8");
for (const needle of [
  "Local Processing",
  "sidefy.locusable.com",
  "github.com/sidefy-team/sidefy",
]) {
  if (!sidefyPrivacy.includes(needle)) {
    console.error(`FAIL here-sidefy/privacy/index.html: missing ${needle}`);
    failed++;
  }
}

const themes = fs.readFileSync(path.join(root, "here-wallpaper/themes/index.html"), "utf8");
if (!themes.includes("catalog-section")) {
  console.error("FAIL here-wallpaper/themes/index.html: missing catalog-section");
  failed++;
}
if (!themes.includes("theme-grid")) {
  console.error("FAIL here-wallpaper/themes/index.html: missing theme-grid");
  failed++;
}
if (!themes.includes(`theme-map-style.js?v=${themeMapJsVersion}`)) {
  console.error("FAIL here-wallpaper/themes/index.html: missing theme-map-style.js");
  failed++;
}
if (themes.includes("styles/liberty")) {
  console.error("FAIL here-wallpaper/themes/index.html: legacy Liberty style URL found");
  failed++;
}
for (const file of ["basic_themes.json", "featured_themes.json"]) {
  const themePath = path.join(root, "here-wallpaper/themes/data", file);
  if (!fs.existsSync(themePath)) {
    console.error(`FAIL missing ${file}`);
    failed++;
    continue;
  }
  const catalog = JSON.parse(fs.readFileSync(themePath, "utf8"));
  if (!Array.isArray(catalog) || !catalog.length) {
    console.error(`FAIL ${file}: empty catalog`);
    failed++;
  }
}
// Guard against stale catalogs: mirrors the HereWallpaper app resources.
const themeCounts = { "basic_themes.json": 8, "featured_themes.json": 38 };
for (const [file, min] of Object.entries(themeCounts)) {
  const themePath = path.join(root, "here-wallpaper/themes/data", file);
  const catalog = JSON.parse(fs.readFileSync(themePath, "utf8"));
  if (catalog.length < min) {
    console.error(`FAIL ${file}: expected >= ${min} themes, found ${catalog.length} — re-run scripts/sync-wallpaper-themes.mjs`);
    failed++;
  }
}
if (!fs.existsSync(path.join(root, "assets/theme-map-style.js"))) {
  console.error("FAIL assets/theme-map-style.js missing");
  failed++;
}

const themeColors = {
  "about/index.html": "#b8860b",
  "here-wallpaper/index.html": "#4caf50",
  "here-wallpaper/themes/index.html": "#4caf50",
  "here-wallpaper/privacy/index.html": "#4caf50",
  "here-links/index.html": "#2196f3",
  "here-links/privacy/index.html": "#2196f3",
  "here-sidefy/index.html": "#f44336",
  "here-sidefy/privacy/index.html": "#f44336",
  "here-island/index.html": "#9c27b0",
  "here-hackerba/index.html": "#ff6600",
  "here-trmnl/index.html": "#3c50b4",
};

for (const [page, color] of Object.entries(themeColors)) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  if (!html.includes(`name="theme-color" content="${color}"`)) {
    console.error(`FAIL ${page}: theme-color should be ${color}`);
    failed++;
  }
}


const siteCss2 = fs.readFileSync(path.join(root, "assets/site.css"), "utf8");
if (!siteCss2.includes("@supports not selector(:has(*))")) {
  console.error("FAIL assets/site.css: missing :has() fallback block");
  failed++;
}
if (siteCss2.includes("Maplestory-Light")) {
  console.error("FAIL assets/site.css: Light font face should be removed (dead resource)");
  failed++;
}
if (!fs.existsSync(path.join(root, "assets/fonts/Maplestory-Bold.woff2"))) {
  console.error("FAIL assets/fonts/Maplestory-Bold.woff2 missing");
  failed++;
}
if (fs.existsSync(path.join(root, "assets/fonts/Maplestory-Light.woff2"))) {
  console.error("FAIL assets/fonts/Maplestory-Light.woff2 should be removed");
  failed++;
}

if (!fs.existsSync(path.join(root, "assets/i18n.js"))) {
  console.error("FAIL assets/i18n.js missing");
  failed++;
}
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  if (!html.includes('data-lang-option="en"') || !html.includes('data-lang-option="zh"')) {
    console.error(`FAIL ${page}: missing language switcher`);
    failed++;
  }
}

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log(`OK ${pages.length} pages pass shared asset contract`);
