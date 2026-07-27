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

const cssVersion = "44";
const jsVersion = "37";

const must = [
  ["/assets/site.css", "shared stylesheet"],
  ["/assets/site.js", "shared script"],
  [`site.css?v=${cssVersion}`, "css cache version"],
  [`site.js?v=${jsVersion}`, "js cache version"],
  ['rel="preconnect" href="https://fonts.googleapis.com"', "fonts preconnect"],
];

const backNav = {
  "here-wallpaper/index.html": 'href="/">‹ Locusable Studio',
  "here-links/index.html": 'href="/">‹ Locusable Studio',
  "here-sidefy/index.html": 'href="/">‹ Locusable Studio',
  "here-wallpaper/themes/index.html": 'href="/here-wallpaper/">‹ Here Wallpaper',
  "here-sidefy/plugins/index.html": 'href="/here-sidefy/">‹ Here Sidefy',
  "here-wallpaper/privacy/index.html": 'href="/here-wallpaper/">‹ Here Wallpaper',
  "here-links/privacy/index.html": 'href="/here-links/">‹ Here Links',
  "here-sidefy/privacy/index.html": 'href="/here-sidefy/">‹ Here Sidefy',
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
  if (html.includes('class="crumbs"') || html.includes("<ol class=\"crumbs\">")) {
    console.error(`FAIL ${page}: legacy breadcrumb markup found`);
    failed++;
  }
  const back = backNav[page];
  if (back && !html.includes(back)) {
    console.error(`FAIL ${page}: missing back nav (${back})`);
    failed++;
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
if (!home.includes("studio-masthead__tagline")) {
  console.error("FAIL index.html: missing studio tagline");
  failed++;
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
if (!plugins.includes('class="catalog-section"')) {
  console.error("FAIL here-sidefy/plugins/index.html: missing catalog-section");
  failed++;
}

const themes = fs.readFileSync(path.join(root, "here-wallpaper/themes/index.html"), "utf8");
if (!themes.includes("@keyframes rise")) {
  console.error("FAIL here-wallpaper/themes/index.html: missing rise animation keyframes");
  failed++;
}

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log(`OK ${pages.length} pages pass shared asset contract`);
