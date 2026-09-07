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

const canonicalByPage = {
  "index.html": "https://locusable.com/",
  "about/index.html": "https://locusable.com/about/",
  "unmaintained/index.html": "https://locusable.com/unmaintained/",
  "here-wallpaper/index.html": "https://locusable.com/here-wallpaper/",
  "here-wallpaper/privacy/index.html": "https://locusable.com/here-wallpaper/privacy/",
  "here-links/index.html": "https://locusable.com/here-links/",
  "here-links/privacy/index.html": "https://locusable.com/here-links/privacy/",
  "here-sidefy/index.html": "https://locusable.com/here-sidefy/",
  "here-sidefy/privacy/index.html": "https://locusable.com/here-sidefy/privacy/",
  "here-island/index.html": "https://locusable.com/here-island/",
  "here-island/privacy/index.html": "https://locusable.com/here-island/privacy/",
  "here-hackerba/index.html": "https://locusable.com/here-hackerba/",
  "here-trmnl/index.html": "https://locusable.com/here-trmnl/",
};

const pageMeta = {
  "index.html": {
    title: "Locusable Studio — Tools for what’s already on the screen",
    description:
      "Native Mac and iPhone utilities for quiet corners of the screen — the notch, the edge, and the lock screen.",
  },
  "about/index.html": {
    title: "About Locusable Studio",
    description:
      "A small independent studio making native tools for what’s already on the screen. Founded August 15, 2025.",
  },
  "here-island/index.html": {
    title: "Here Island — Now Playing in the MacBook notch",
    description:
      "Free open-source media in the MacBook notch: artwork, controls, quick peek, optional lock screen card. Hide in screenshots and fullscreen.",
  },
  "here-sidefy/index.html": {
    title: "Sidefy — Info stream on the Mac screen edge",
    description:
      "Calendar, Reminders, GitHub, RSS, and plugins in one screen-edge stream. Stay in your window; keyboard-friendly; data stays in iCloud.",
  },
  "here-wallpaper/index.html": {
    title: "Here Wallpaper — Map lock screen wallpapers",
    description:
      "Turn a place you care about into a lock screen wallpaper. Themes, type, and layers for iPhone, iPad, and Mac — live maps on the Mac desktop too.",
  },
};

const cssVersion = "217";
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

  const canonical = canonicalByPage[page];
  if (!canonical || !html.includes(`<link rel="canonical" href="${canonical}">`)) {
    fail(`FAIL ${page}: missing canonical ${canonical}`);
  }

  const meta = pageMeta[page];
  if (meta) {
    if (!html.includes(`<title>${meta.title}</title>`)) {
      fail(`FAIL ${page}: title should be ${meta.title}`);
    }
    if (!html.includes(`<meta name="description" content="${meta.description}">`)) {
      fail(`FAIL ${page}: description mismatch`);
    }
    if (!html.includes(`property="og:title" content="${meta.title}"`)) {
      fail(`FAIL ${page}: og:title should match title`);
    }
    if (!html.includes(`property="og:description" content="${meta.description}"`)) {
      fail(`FAIL ${page}: og:description should match description`);
    }
    if (!html.includes(`name="twitter:title" content="${meta.title}"`)) {
      fail(`FAIL ${page}: twitter:title should match title`);
    }
    if (!html.includes(`name="twitter:description" content="${meta.description}"`)) {
      fail(`FAIL ${page}: twitter:description should match description`);
    }
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
  // Sidefy sspai screenshot labels only — strip before English-site Han gate
  const hanWhitelist = ["Matrix精选", "首页推荐"];
  let htmlForHan = html;
  for (const s of hanWhitelist) htmlForHan = htmlForHan.split(s).join("");
  if (/\p{Script=Han}/u.test(htmlForHan)) fail(`FAIL ${page}: Chinese content found on English-only site`);

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

// --- robots + sitemap ---
if (!exists("robots.txt")) fail("FAIL robots.txt should exist");
else {
  const robots = read("robots.txt");
  if (!robots.includes("User-agent: *")) fail("FAIL robots.txt: missing User-agent: *");
  if (!robots.includes("Allow: /")) fail("FAIL robots.txt: missing Allow: /");
  if (!robots.includes("Sitemap: https://locusable.com/sitemap.xml")) {
    fail("FAIL robots.txt: missing Sitemap URL");
  }
}
if (!exists("sitemap.xml")) fail("FAIL sitemap.xml should exist");
else {
  const sitemap = read("sitemap.xml");
  for (const loc of [
    "https://locusable.com/",
    "https://locusable.com/about/",
    "https://locusable.com/unmaintained/",
    "https://locusable.com/here-island/",
    "https://locusable.com/here-island/privacy/",
    "https://locusable.com/here-wallpaper/",
    "https://locusable.com/here-wallpaper/privacy/",
    "https://locusable.com/here-sidefy/",
    "https://locusable.com/here-sidefy/privacy/",
    "https://locusable.com/here-links/",
    "https://locusable.com/here-links/privacy/",
    "https://locusable.com/here-hackerba/",
    "https://locusable.com/here-trmnl/",
  ]) {
    if (!sitemap.includes(`<loc>${loc}</loc>`)) fail(`FAIL sitemap.xml: missing ${loc}`);
  }
}

// --- home & hubs ---
const home = htmlByPage["index.html"];
const unmaintained = htmlByPage["unmaintained/index.html"];
const about = htmlByPage["about/index.html"];

for (const needle of [
  "Who we are",
  "founded August 15, 2025",
  "What we ship",
  "quiet corners of the interface",
  "Start with the",
  "prose--after-hero",
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
if (!home.includes('class="catalog__lead"')) fail("FAIL index.html: missing studio hook lead");
if (!home.includes("what’s already on the screen")) {
  fail("FAIL index.html: studio hook should use already-on-the-screen idea");
}
for (const line of [
  "A place you care about, on the lock screen.",
  "Your feeds, on the screen edge.",
  "What’s playing, in the notch.",
]) {
  if (!home.includes(line)) fail(`FAIL index.html: missing product card line (${line})`);
}
for (const href of ["/here-wallpaper/", "/here-sidefy/", "/here-island/", "/unmaintained/"]) {
  if (!home.includes(`href="${href}"`)) fail(`FAIL index.html: missing href ${href}`);
}
if (home.includes('href="/here-links/"') || home.includes('href="/here-hackerba/"') || home.includes('href="/here-trmnl/"')) {
  fail("FAIL index.html: archived and unreleased products do not belong on the released page");
}
if ((home.match(/class="product"/g) || []).length !== 3) {
  fail("FAIL index.html: homepage should list three released products");
}
if (!home.includes("More Information")) {
  fail("FAIL index.html: More Information links should remain");
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
  ".catalog__lead",
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
}
if (!wallpaper.includes("shot-mac-maldives.jpg")) fail("FAIL here-wallpaper/index.html: missing Mac live preview");

if (wallpaper.includes("/here-wallpaper/themes") || wallpaper.includes("themes-title") || wallpaper.includes("Browse themes")) {
  fail("FAIL here-wallpaper/index.html: themes catalog link should be removed");
}
if ((wallpaper.match(/\/assets\/shots\/shot-1\.jpg\?v=10/g) || []).length !== 1) {
  fail("FAIL here-wallpaper/index.html: lock-screen preview should appear once");
}
if (!wallpaper.includes('alt="Map lock screen wallpaper"')) {
  fail("FAIL here-wallpaper/index.html: place block should use lock-screen preview alt");
}
if ((wallpaper.match(/\/assets\/shots\/shot-\d\.jpg\?v=10" width="585" height="1266"/g) || []).length !== 4) {
  fail("FAIL here-wallpaper/index.html: phone shots should declare 585x1266");
}
if (!wallpaper.includes('alt="Live map wallpaper on Mac"')) {
  fail("FAIL here-wallpaper/index.html: Mac live block should use live map alt");
}
for (const title of [
  "Your place, on the lock screen",
  "Themes, type, and layers",
  "Save, then set in Photos",
  "Live on the Mac desktop",
]) {
  if (!wallpaper.includes(`>${title}</h2>`)) {
    fail(`FAIL here-wallpaper/index.html: missing benefit title (${title})`);
  }
}
if (wallpaper.includes('class="product-scene"')) {
  fail("FAIL here-wallpaper/index.html: product-scene should be removed");
}
if (wallpaper.includes(">Any place</h2>") || wallpaper.includes(">Live wallpaper for Mac</h2>")) {
  fail("FAIL here-wallpaper/index.html: obsolete feature titles still present");
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
if (!island.includes('alt="Quick peek on track change"') || !island.includes("New track, quick peek")) {
  fail("FAIL here-island/index.html: peek.gif should hang on quick peek block");
}
if (!htmlByPage["here-sidefy/index.html"].includes('alt="Sidefy screen-edge info stream"') || !htmlByPage["here-sidefy/index.html"].includes("One stream, no app switching")) {
  fail("FAIL here-sidefy/index.html: shot-hero should hang on one-stream block");
}
if (!island.includes("detail-feature-grid")) fail("FAIL here-island/index.html: missing paired feature layout");
for (const needle of [
  "https://github.com/locusable-studio/HereIsland",
  "brew tap locusable-studio/tap",
  "brew trust --cask locusable-studio/tap/here-island",
  "brew install --cask here-island",
  "/here-island/privacy/",
  "Playing lives in the notch",
  "Controls when you hover",
  "New track, quick peek",
  "Lock screen card, optional",
  "Out of screenshots and fullscreen",
  "Optional media card with artwork, controls, and progress",
  "Hide during screenshots and recordings",
  "native fullscreen",
  "Title marquee on track change",
]) {
  if (!island.includes(needle)) fail(`FAIL here-island/index.html: missing ${needle}`);
}
if (island.includes('class="product-scene"')) {
  fail("FAIL here-island/index.html: product-scene should be removed");
}
for (const obsolete of [
  "Player in the notch",
  "Playback within reach",
  "On the lock screen too",
  "Stay out of screenshots",
  ">Quick peek</h2>",
]) {
  if (island.includes(obsolete)) {
    fail(`FAIL here-island/index.html: obsolete feature title still present (${obsolete})`);
  }
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
for (const title of [
  "One stream, no app switching",
  "Calendar to GitHub to news",
  "Keyboard-friendly",
  "Quiet until you need it",
  "Yours stays in iCloud",
]) {
  if (!sidefy.includes(`>${title}</h2>`)) {
    fail(`FAIL here-sidefy/index.html: missing benefit title (${title})`);
  }
}
if (sidefy.includes('class="product-scene"')) {
  fail("FAIL here-sidefy/index.html: product-scene should be removed");
}
if (sidefy.includes(">One stream on the edge</h2>") || sidefy.includes(">Light enough to leave on</h2>") || sidefy.includes(">Plugins</h2>")) {
  fail("FAIL here-sidefy/index.html: obsolete feature titles still present");
}
for (const needle of ["Local Processing", "sidefy.locusable.com", "github.com/sidefy-team/sidefy"]) {
  if (!sidefyPrivacy.includes(needle)) fail(`FAIL here-sidefy/privacy/index.html: missing ${needle}`);
}


// --- sspai CSS pills (detail pages under title only; no catalog list) ---
const SSPAI_SIDEFY = "https://sspai.com/post/102198";
const SSPAI_WALLPAPER = "https://sspai.com/post/114211";
const PILL_SIDEFY_MATRIX = `<a class="press-pill" href="${SSPAI_SIDEFY}" target="_blank" rel="noopener noreferrer">Matrix精选</a>`;
const PILL_SIDEFY_HOME = `<a class="press-pill" href="${SSPAI_SIDEFY}" target="_blank" rel="noopener noreferrer">首页推荐</a>`;
const PILL_WALLPAPER_MATRIX = `<a class="press-pill" href="${SSPAI_WALLPAPER}" target="_blank" rel="noopener noreferrer">Matrix精选</a>`;
if (exists("assets/sidefy/sspai-matrix-badge.png")) {
  fail("FAIL assets/sidefy/sspai-matrix-badge.png: PNG badge must be removed");
}
if (home.includes("press-badge") || home.includes("sspai-matrix-badge") || sidefy.includes("press-badge") || sidefy.includes("sspai-matrix-badge") || wallpaper.includes("press-badge")) {
  fail("FAIL: obsolete .press-badge / PNG badge markup still present");
}
if (home.includes("press-pill") || home.includes("sspai.com/post")) {
  fail("FAIL index.html: sspai pills belong on detail pages only, not the catalog list");
}
if (!sidefy.includes(PILL_SIDEFY_MATRIX) || !sidefy.includes(PILL_SIDEFY_HOME) || !sidefy.includes("press-pills")) {
  fail("FAIL here-sidefy/index.html: missing Matrix精选 and 首页推荐 press-pills under title");
}
if (sidefy.includes("编辑精选") || sidefy.includes("Featured on sspai") || sidefy.includes("sspai Matrix") || sidefy.includes("sspai Home") || sidefy.includes("On sspai")) {
  fail("FAIL here-sidefy/index.html: obsolete sspai pill labels still present");
}
if (!wallpaper.includes(PILL_WALLPAPER_MATRIX) || !wallpaper.includes("press-pills")) {
  fail("FAIL here-wallpaper/index.html: missing Matrix精选 press-pill under title");
}
if (wallpaper.includes("On sspai") || wallpaper.includes("首页推荐") || wallpaper.includes("编辑精选") || wallpaper.includes(SSPAI_SIDEFY)) {
  fail("FAIL here-wallpaper/index.html: must only have Matrix精选 (no On sspai / 首页推荐 / Sidefy URL)");
}
if (island.includes("sspai.com/post") || island.includes("press-pill") || island.includes("sspai")) {
  fail("FAIL here-island/index.html: should not include sspai pills or sspai.com/post");
}

// --- result ---
if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log(`OK ${pages.length} pages pass shared asset contract`);
