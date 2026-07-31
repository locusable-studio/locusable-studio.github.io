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
  "here-sidefy/plugins/index.html",
  "here-sidefy/privacy/index.html",
  "here-island/index.html",
];

const cssVersion = "100";
const jsVersion = "39";

const themeMapJsVersion = "1";

const must = [
  ["/assets/site.css", "shared stylesheet"],
  ["/assets/site.js", "shared script"],
  [`site.css?v=${cssVersion}`, "css cache version"],
  [`site.js?v=${jsVersion}`, "js cache version"],
];

const breadcrumbs = {
  "about/index.html": [
    'href="/">Locusable <em>Studio</em>',
    '<span aria-current="page">About</span>',
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
  "here-wallpaper/themes/index.html": [
    'href="/">Locusable <em>Studio</em>',
    'href="/here-wallpaper/">Here Wallpaper',
    '<span aria-current="page">Themes</span>',
  ],
  "here-sidefy/plugins/index.html": [
    'href="/">Locusable <em>Studio</em>',
    'href="/here-sidefy/">Here Sidefy',
    '<span aria-current="page">Plugins</span>',
  ],
  "here-wallpaper/privacy/index.html": [
    'href="/">Locusable <em>Studio</em>',
    'href="/here-wallpaper/">Here Wallpaper',
    '<span aria-current="page">Privacy</span>',
  ],
  "here-links/privacy/index.html": [
    'href="/">Locusable <em>Studio</em>',
    'href="/here-links/">Here Links',
    '<span aria-current="page">Privacy</span>',
  ],
  "here-sidefy/privacy/index.html": [
    'href="/">Locusable <em>Studio</em>',
    'href="/here-sidefy/">Here Sidefy',
    '<span aria-current="page">Privacy</span>',
  ],
};

const productFaqs = {
  "here-wallpaper/index.html": [
    "Is Here Wallpaper free?",
    "What does Here Wallpaper Pro include?",
    "Where does the map data come from?",
  ],
  "here-links/index.html": [
    "Is Here Links free?",
    "What is linkding?",
    "Can I connect more than one server?",
  ],
  "here-sidefy/index.html": [
    "How is Here Sidefy priced?",
    "What does Here Sidefy integrate with?",
    "Does Here Sidefy collect personal data?",
  ],
  "here-island/index.html": [
    "Is Here Island free and open source?",
    "What does Here Island do?",
    "What do I need to run it?",
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
  if (page !== "index.html" && html.includes('href="/about/"')) {
    console.error(`FAIL ${page}: About link should only appear on the homepage`);
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
      if (!html.includes(`<summary>${question}</summary>`)) {
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
  "Focused tools for the Apple devices you use every day.",
  "overlooked interface spaces",
  "Map lock screens from places you care about.",
  "Your linkding bookmarks on iPhone.",
  "Stay informed without leaving your desktop.",
  "A focused media companion in your MacBook notch.",
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
for (const href of ["/here-wallpaper/", "/here-links/", "/here-sidefy/", "/here-island/"]) {
  if (!home.includes(`href="${href}"`)) {
    console.error(`FAIL index.html: missing href ${href}`);
    failed++;
  }
}
if ((home.match(/class="unit unit--tint[^"]*home-app-card/g) || []).length !== 4) {
  console.error("FAIL index.html: homepage app cards should use the compact-card class");
  failed++;
}
if (home.includes("home-app-card__details")) {
  console.error("FAIL index.html: homepage app cards should not include expandable details");
  failed++;
}
for (const needle of [
  'class="home-product-grid"',
  "home-app-card--feature",
  "home-app-card--island",
  "home-app-card__screens",
  "home-app-card__peeks",
  "home-app-card__arrow",
  "home-app-card__arrow--feature",
  "/assets/here-island/shot-compact.jpg",
  "/assets/here-island/shot-expanded.jpg",
]) {
  if (!home.includes(needle)) {
    console.error(`FAIL index.html: missing featured homepage card structure (${needle})`);
    failed++;
  }
}
const siteCss = fs.readFileSync(path.join(root, "assets/site.css"), "utf8");
if (!siteCss.includes("height: clamp(170px, 20vw, 260px);")) {
  console.error("FAIL assets/site.css: homepage screenshots should use a constrained height");
  failed++;
}
if (!siteCss.includes("left: 48%;")) {
  console.error("FAIL assets/site.css: featured screenshots should stay in the right half");
  failed++;
}
if (!siteCss.includes(".home-app-card--island")) {
  console.error("FAIL assets/site.css: missing Island full-width homepage card");
  failed++;
}
if (!siteCss.includes("aspect-ratio: 890 / 324;")) {
  console.error("FAIL assets/site.css: Island peeks should crop the bottom 10%");
  failed++;
}
if (!siteCss.includes("border-radius: 20px;")) {
  console.error("FAIL assets/site.css: homepage cards should use rounded corners");
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
if (!siteCss.includes(".home-app-card--feature .product-hero__icon")) {
  console.error("FAIL assets/site.css: featured card icon should align with its content");
  failed++;
}
for (const needle of [
  "padding-top: 1.25rem;",
  "right: -2.5rem;",
  "top: 1.25rem;",
]) {
  if (!siteCss.includes(needle)) {
    console.error(`FAIL assets/site.css: missing homepage visual polish (${needle})`);
    failed++;
  }
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
  "padding: 0.33em 0.72em 0.37em;",
  "font-size: 1rem;",
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
if (!siteCss.includes(".unit__media--squares {\n  align-items: flex-end;\n  padding-bottom: 0;")) {
  console.error("FAIL assets/site.css: theme previews should align with the unit bottom");
  failed++;
}
if (!siteCss.includes("aspect-ratio: 1170 / 760;")) {
  console.error("FAIL assets/site.css: theme previews should crop their bottom edge");
  failed++;
}
if (!siteCss.includes(".crumbs {\n  list-style: none;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.35rem 0.55rem;\n  max-width: var(--max-wide);\n  margin: 0 auto;\n  width: 100%;\n  box-sizing: border-box;\n  padding: 0 var(--unit-pad-x);")) {
  console.error("FAIL assets/site.css: breadcrumb content should align with homepage masthead");
  failed++;
}

const wallpaper = fs.readFileSync(path.join(root, "here-wallpaper/index.html"), "utf8");
if (wallpaper.includes("detail-feature-media")) {
  console.error("FAIL here-wallpaper/index.html: place-and-layout should not duplicate hero previews");
  failed++;
}
if ((wallpaper.match(/\/assets\/shots\/shot-1\.jpg\?v=10/g) || []).length !== 1) {
  console.error("FAIL here-wallpaper/index.html: hero preview should appear only once");
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

const sidefy = fs.readFileSync(path.join(root, "here-sidefy/index.html"), "utf8");
if (!sidefy.includes("detail-feature-grid")) {
  console.error("FAIL here-sidefy/index.html: missing paired feature layout");
  failed++;
}
for (const href of [
  "https://apps.apple.com/app/id6751482006",
  "https://sidefy.locusable.com/",
  "/here-sidefy/plugins/",
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

const plugins = fs.readFileSync(path.join(root, "here-sidefy/plugins/index.html"), "utf8");
for (const name of [
  "Say Hi",
  "FreshRSS",
  "App Store Discount",
  "Steam Wishlist Discount",
  "Switch Discount Tracker",
  "Pokemon Daily",
  "Crypto Price Monitor",
  "V2EX Notifications",
]) {
  if (!plugins.includes(name)) {
    console.error(`FAIL here-sidefy/plugins/index.html: missing plugin ${name}`);
    failed++;
  }
}
if (!plugins.includes("catalog-section")) {
  console.error("FAIL here-sidefy/plugins/index.html: missing catalog-section");
  failed++;
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
if (!fs.existsSync(path.join(root, "assets/theme-map-style.js"))) {
  console.error("FAIL assets/theme-map-style.js missing");
  failed++;
}

const themeColors = {
  "here-wallpaper/index.html": "#4cac50",
  "here-wallpaper/themes/index.html": "#4cac50",
  "here-wallpaper/privacy/index.html": "#4cac50",
  "here-links/index.html": "#2094f0",
  "here-links/privacy/index.html": "#2094f0",
  "here-sidefy/index.html": "#f44034",
  "here-sidefy/plugins/index.html": "#f44034",
  "here-sidefy/privacy/index.html": "#f44034",
  "here-island/index.html": "#9820b0",
};

for (const [page, color] of Object.entries(themeColors)) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  if (!html.includes(`name="theme-color" content="${color}"`)) {
    console.error(`FAIL ${page}: theme-color should be ${color}`);
    failed++;
  }
}

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log(`OK ${pages.length} pages pass shared asset contract`);
