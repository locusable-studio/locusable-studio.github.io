import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = [
  "index.html",
  "here-wallpaper/index.html",
  "here-wallpaper/themes/index.html",
  "here-wallpaper/privacy/index.html",
  "here-links/index.html",
  "here-links/privacy/index.html",
  "here-sidefy/index.html",
  "here-sidefy/plugins/index.html",
  "here-sidefy/privacy/index.html",
];

const cssVersion = "76";
const jsVersion = "38";

const themeMapJsVersion = "1";

const must = [
  ["/assets/site.css", "shared stylesheet"],
  ["/assets/site.js", "shared script"],
  [`site.css?v=${cssVersion}`, "css cache version"],
  [`site.js?v=${jsVersion}`, "js cache version"],
];

const breadcrumbs = {
  "here-wallpaper/index.html": [
    'href="/">Locusable Studio',
    '<span aria-current="page">Here Wallpaper</span>',
  ],
  "here-links/index.html": [
    'href="/">Locusable Studio',
    '<span aria-current="page">Here Links</span>',
  ],
  "here-sidefy/index.html": [
    'href="/">Locusable Studio',
    '<span aria-current="page">Here Sidefy</span>',
  ],
  "here-wallpaper/themes/index.html": [
    'href="/">Locusable Studio',
    'href="/here-wallpaper/">Here Wallpaper',
    '<span aria-current="page">Themes</span>',
  ],
  "here-sidefy/plugins/index.html": [
    'href="/">Locusable Studio',
    'href="/here-sidefy/">Here Sidefy',
    '<span aria-current="page">Plugins</span>',
  ],
  "here-wallpaper/privacy/index.html": [
    'href="/">Locusable Studio',
    'href="/here-wallpaper/">Here Wallpaper',
    '<span aria-current="page">Privacy</span>',
  ],
  "here-links/privacy/index.html": [
    'href="/">Locusable Studio',
    'href="/here-links/">Here Links',
    '<span aria-current="page">Privacy</span>',
  ],
  "here-sidefy/privacy/index.html": [
    'href="/">Locusable Studio',
    'href="/here-sidefy/">Here Sidefy',
    '<span aria-current="page">Privacy</span>',
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
}

if (fs.existsSync(path.join(root, "here-wallpaper/layers/index.html"))) {
  console.error("FAIL here-wallpaper/layers/index.html should not exist (layers merged into themes)");
  failed++;
}

const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const href of ["/here-wallpaper/", "/here-links/", "/here-sidefy/"]) {
  if (!home.includes(`href="${href}"`)) {
    console.error(`FAIL index.html: missing href ${href}`);
    failed++;
  }
}

const sidefy = fs.readFileSync(path.join(root, "here-sidefy/index.html"), "utf8");
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
