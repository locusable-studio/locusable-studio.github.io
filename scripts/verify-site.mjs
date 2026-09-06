import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const pages = [
  "index.html",
  "about/index.html",
  "here-wallpaper/index.html",
  "here-wallpaper/privacy/index.html",
  "here-links/index.html",
  "here-links/privacy/index.html",
  "here-sidefy/index.html",
  "here-sidefy/privacy/index.html",
  "here-island/index.html",
  "here-island/privacy/index.html",
  "here-hackerba/index.html",
  "here-trmnl/index.html",
  "unmaintained/index.html",
];

const cssVersion = "214";
const jsVersion = "65";

const must = [
  ["/assets/site.css", "shared stylesheet"],
  ["/assets/site.js", "shared script"],
  [`site.css?v=${cssVersion}`, "css cache version"],
  [`site.js?v=${jsVersion}`, "js cache version"],
  ['property="og:title"', "og:title"],
  ['property="og:description"', "og:description"],
  ['property="og:type"', "og:type"],
  ['property="og:url"', "og:url"],
  ['property="og:image"', "og:image"],
  ['name="twitter:card"', "twitter:card"],
  ['name="twitter:title"', "twitter:title"],
  ['name="twitter:description"', "twitter:description"],
];

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
    "Is Sidefy free?",
    "What does Sidefy do?",
    "What do I need to run it?",
    "Does Sidefy collect personal data?",
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

const themeColors = {
  "about/index.html": "#9b7100",
  "here-wallpaper/index.html": "#328e3a",
  "here-wallpaper/privacy/index.html": "#328e3a",
  "here-links/index.html": "#1479bd",
  "here-links/privacy/index.html": "#1479bd",
  "here-sidefy/index.html": "#d5312c",
  "here-sidefy/privacy/index.html": "#d5312c",
  "here-island/index.html": "#85209d",
  "here-island/privacy/index.html": "#85209d",
  "here-hackerba/index.html": "#d95700",
  "here-trmnl/index.html": "#3347a5",
};

const read = (page) => fs.readFileSync(path.join(root, page), "utf8");
const exists = (rel) => fs.existsSync(path.join(root, rel));

let failed = 0;
const fail = (msg) => {
  console.error(msg);
  failed++;
};

// --- per-page contract ---
const htmlByPage = Object.fromEntries(pages.map((page) => [page, read(page)]));

for (const page of pages) {
  const html = htmlByPage[page];

  for (const [needle, label] of must) {
    if (!html.includes(needle)) fail(`FAIL ${page}: missing ${label} (${needle})`);
  }

  if (!html.includes('class="topbar"') || !html.includes('class="nav" aria-label="Studio"')) {
    fail(`FAIL ${page}: missing unified site navigation`);
  }
  if (html.includes('class="crumbs"') || html.includes('class="crumbbar"')) {
    fail(`FAIL ${page}: obsolete breadcrumb navigation found`);
  }
  if (page.endsWith("privacy/index.html") && !html.includes('class="doc-layout"')) {
    fail(`FAIL ${page}: missing doc-layout wrapper`);
  }
  if (html.includes('class="chev"')) fail(`FAIL ${page}: obsolete chevron markup found`);
  if (html.includes("product-faq__inner")) fail(`FAIL ${page}: obsolete FAQ inner wrapper found`);
  if (/data-i18n|data-home-(?:lang|theme)|assets\/(?:i18n|home)\.js/.test(html)) {
    fail(`FAIL ${page}: obsolete theme or language controls found`);
  }
  if (/\p{Script=Han}/u.test(html)) fail(`FAIL ${page}: Chinese content found on English-only site`);

  const faqQuestions = productFaqs[page];
  if (faqQuestions) {
    if (!html.includes('class="product-faq"')) fail(`FAIL ${page}: missing product FAQ section`);
    for (const question of faqQuestions) {
      if (!html.includes(`>${question}</summary>`)) {
        fail(`FAIL ${page}: missing FAQ question (${question})`);
      }
    }
  }

  const color = themeColors[page];
  if (color && !html.includes(`name="theme-color" content="${color}"`)) {
    fail(`FAIL ${page}: theme-color should be ${color}`);
  }
}

// --- removed routes and assets ---
for (const rel of [
  "here-wallpaper/themes/index.html",
  "here-wallpaper/layers/index.html",
  "assets/theme-map-style.js",
  "scripts/sync-wallpaper-themes.mjs",
  "assets/i18n.js",
  "assets/home.js",
  "assets/lucide",
  "assets/fonts/Maplestory-Bold.woff2",
]) {
  if (exists(rel)) fail(`FAIL ${rel} should not exist`);
}

// --- home & hubs ---
const home = htmlByPage["index.html"];
const unmaintained = htmlByPage["unmaintained/index.html"];
const about = htmlByPage["about/index.html"];

for (const needle of [
  "Small native tools for the devices you already use.",
  "interface corners most people skip",
  "A good place for a small tool",
  "founded August 15, 2025",
  "The notch, the screen edge, the gap between wallpaper and icons",
  "prose--after-hero",
  "What we ship",
]) {
  if (!about.includes(needle)) fail(`FAIL about/index.html: missing studio context (${needle})`);
}
if (about.includes("personal information such as self-hosted bookmarks")) {
  fail("FAIL about/index.html: removed bookmark rationale should not be shown");
}
for (const needle of [
  "A two-person studio from Xi'an, China,",
  "more than a decade of programming experience",
]) {
  if (about.includes(needle)) {
    fail(`FAIL about/index.html: removed studio detail should not be shown (${needle})`);
  }
}

if (!home.includes('href="/about/"')) fail("FAIL index.html: missing About link");
for (const href of ["/here-wallpaper/", "/here-sidefy/", "/here-island/", "/unmaintained/"]) {
  if (!home.includes(`href="${href}"`)) fail(`FAIL index.html: missing href ${href}`);
}
if (home.includes('href="/here-links/"') || home.includes('href="/here-hackerba/"') || home.includes('href="/here-trmnl/"')) {
  fail("FAIL index.html: archived and unreleased products do not belong on the released page");
}
if ((home.match(/class="product"/g) || []).length !== 3) {
  fail("FAIL index.html: homepage should list three released products");
}
if (!unmaintained.includes('href="/here-trmnl/"') || !unmaintained.includes('href="/here-links/"') || !unmaintained.includes('href="/here-hackerba/"')) {
  fail("FAIL unmaintained/index.html: product assignment is incorrect");
}
if ((unmaintained.match(/class="product"/g) || []).length !== 3) {
  fail("FAIL unmaintained/index.html: expected 3 product rows");
}
if (home.includes('href="/coming-soon/"') || pages.some((page) => htmlByPage[page].includes('href="/coming-soon/"'))) {
  fail("FAIL Coming Soon navigation should be removed");
}

const productIconCount = (html) => (html.match(/class="product__icon"[^>]*width="72" height="72"/g) || []).length;
if (productIconCount(home) !== 3 || productIconCount(unmaintained) !== 3) {
  fail("FAIL hub pages: product icons should declare 72px dimensions");
}

// --- shared assets ---
const siteCss = read("assets/site.css");
const siteJs = read("assets/site.js");

for (const needle of [
  ".topbar",
  ".catalog",
  ".product__icon",
  ".product-hero",
  ".prose",
  "@media (max-width: 600px)",
  ".detail-feature-grid",
  ".feature-list",
  ".product-faq {",
  ".product-faq summary {",
]) {
  if (!siteCss.includes(needle)) fail(`FAIL assets/site.css: missing ${needle}`);
}
if (!siteCss.includes(".unit__media img {") || !siteCss.includes("border-radius: 8px;")) {
  fail("FAIL assets/site.css: screenshots should use the minimal bordered treatment");
}
if (!siteCss.includes(".topbar__inner {") || !siteCss.includes("width: min(100% - 32px, var(--max));")) {
  fail("FAIL assets/site.css: navigation should use the minimal site width");
}
if (!/\.install-snippet__code \{[\s\S]*?white-space:\s*pre-wrap;/.test(siteCss)) {
  fail("FAIL assets/site.css: install snippet must wrap");
}
if (siteCss.includes("Maplestory")) fail("FAIL assets/site.css: custom brand font should be removed");

for (const [app, color] of Object.entries({
  studio: "#9b7100",
  wallpaper: "#328e3a",
  links: "#1479bd",
  sidefy: "#d5312c",
  island: "#85209d",
  hackerba: "#d95700",
  trmnl: "#3347a5",
})) {
  if (!siteJs.includes(`${app}: "${color}"`)) {
    fail(`FAIL assets/site.js: APP_THEME_COLORS should map ${app} to ${color}`);
  }
  if (!siteCss.includes(`[data-app="${app}"] { --accent: ${color}; }`)) {
    fail(`FAIL assets/site.css: ${app} accent should be ${color}`);
  }
}

// --- here-wallpaper ---
const wallpaper = htmlByPage["here-wallpaper/index.html"];

if (!wallpaper.includes('class="platforms">iPhone, iPad, and Mac</p>')) {
  fail("FAIL here-wallpaper/index.html: platform line should be iPhone, iPad, and Mac");
}
if (!home.includes("<span>iPhone, iPad, and Mac</span>")) {
  fail("FAIL index.html: wallpaper card platform should match the product page");
}
if (!wallpaper.includes('data-mac-url="macappstore://apps.apple.com/app/id6789155385"')) {
  fail("FAIL here-wallpaper/index.html: App Store link should include a Mac deep link");
}
for (const shot of [
  "shot-mac-maldives.jpg",
  "shot-mac-brasilia.jpg",
  "shot-mac-christ-the-redeemer.jpg",
]) {
  if (!exists(`assets/here-wallpaper/${shot}`)) fail(`FAIL missing assets/here-wallpaper/${shot}`);
  if (!wallpaper.includes(shot)) fail(`FAIL here-wallpaper/index.html: missing Mac preview ${shot}`);
}
if (wallpaper.includes("/here-wallpaper/themes") || wallpaper.includes("themes-title") || wallpaper.includes("Browse themes")) {
  fail("FAIL here-wallpaper/index.html: themes catalog link should be removed");
}
if ((wallpaper.match(/\/assets\/shots\/shot-1\.jpg\?v=10/g) || []).length !== 1) {
  fail("FAIL here-wallpaper/index.html: hero preview should appear only once");
}
if ((wallpaper.match(/\/assets\/shots\/shot-\d\.jpg\?v=10" width="585" height="1266"/g) || []).length !== 4) {
  fail("FAIL here-wallpaper/index.html: hero phone shots should declare 585x1266");
}

// --- here-links ---
const linksPage = htmlByPage["here-links/index.html"];
if (!linksPage.includes("feature-list")) fail("FAIL here-links/index.html: missing feature list");
if ((linksPage.match(/\/assets\/here-links\/shots\/shot-\d\.jpg\?v=\d" width="585" height="1272"/g) || []).length !== 4) {
  fail("FAIL here-links/index.html: phone shots should declare 585x1272");
}

// --- here-island ---
const island = htmlByPage["here-island/index.html"];
const islandPrivacy = htmlByPage["here-island/privacy/index.html"];

if (!island.includes('/assets/here-island/peek.gif?v=1" width="420" height="180"') || !exists("assets/here-island/peek.gif")) {
  fail("FAIL here-island/index.html: missing 420x180 GitHub preview GIF");
}
if (!island.includes("detail-feature-grid")) fail("FAIL here-island/index.html: missing paired feature layout");
for (const needle of [
  "https://github.com/locusable-studio/HereIsland",
  "brew tap locusable-studio/tap",
  "brew trust --cask locusable-studio/tap/here-island",
  "brew install --cask here-island",
  "/here-island/privacy/",
  "On the lock screen too",
  "Optional media card with artwork, controls, and progress",
  "Stay out of screenshots",
  "Hide during screenshots and recordings",
  "native fullscreen",
]) {
  if (!island.includes(needle)) fail(`FAIL here-island/index.html: missing ${needle}`);
}
for (const needle of ["Mac notch", "Sparkle", "github.com/locusable-studio/HereIsland/issues"]) {
  if (!islandPrivacy.includes(needle)) fail(`FAIL here-island/privacy/index.html: missing ${needle}`);
}
for (const page of ["here-island/index.html", "here-island/privacy/index.html"]) {
  if (htmlByPage[page].includes("麦金刘海") || htmlByPage[page].includes("Mac 刘海")) {
    fail(`FAIL ${page}: leftover 麦金刘海 / Mac 刘海`);
  }
}

// --- here-hackerba ---
const hackerba = htmlByPage["here-hackerba/index.html"];
if (!hackerba.includes("detail-feature-grid")) fail("FAIL here-hackerba/index.html: missing paired feature layout");
for (const needle of [
  "https://github.com/sha2kyou/HackerBa",
  "Here <em>HackerBa</em>",
  "/assets/here-hackerba/shot-list.jpg",
  "/assets/here-hackerba/shot-thread.jpg",
  "unit__media--desktop-dual",
]) {
  if (!hackerba.includes(needle)) fail(`FAIL here-hackerba/index.html: missing ${needle}`);
}

// --- here-sidefy ---
const sidefy = htmlByPage["here-sidefy/index.html"];
const sidefyPrivacy = htmlByPage["here-sidefy/privacy/index.html"];

if (!sidefy.includes("detail-feature-grid")) fail("FAIL here-sidefy/index.html: missing paired feature layout");
for (const href of [
  "https://apps.apple.com/app/id6751482006",
  "https://sidefy.locusable.com/",
  "/here-sidefy/privacy/",
]) {
  if (!sidefy.includes(`href="${href}"`)) fail(`FAIL here-sidefy/index.html: missing href ${href}`);
}
for (const needle of ["Local Processing", "sidefy.locusable.com", "github.com/sidefy-team/sidefy"]) {
  if (!sidefyPrivacy.includes(needle)) fail(`FAIL here-sidefy/privacy/index.html: missing ${needle}`);
}

// --- result ---
if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log(`OK ${pages.length} pages pass shared asset contract`);
