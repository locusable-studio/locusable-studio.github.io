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
      "Native Mac, iPhone, and iPad utilities for quiet corners of the screen — the notch, the edge, and the lock screen.",
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
      "Calendar, Reminders, GitHub, RSS, and plugins in one screen-edge stream. Stay in your window with keyboard-friendly controls and local data processing.",
  },
  "here-wallpaper/index.html": {
    title: "Here Wallpaper — Map wallpapers for iPhone, iPad, and Mac",
    description:
      "A place you care about as wallpaper — lock screen on iPhone and iPad, live under the icons on Mac.",
  },
};

const cssVersion = "231";
const jsVersion = "66";

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

  const navigation = html.match(/<nav\b[^>]*>[\s\S]*?<\/nav>/)?.[0] || "";
  const footer = html.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/)?.[0] || "";
  if (navigation.includes('/unmaintained/')) {
    fail(`FAIL ${page}: Archive belongs in the footer, not the top navigation`);
  }
  if (["index.html", "about/index.html", "unmaintained/index.html"].includes(page) && !/href="\/unmaintained\/"[^>]*>Archive<\/a>/.test(footer)) {
    fail(`FAIL ${page}: missing footer Archive link`);
  }

  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) {
    fail(`FAIL ${page}: expected one page heading`);
  }
  if (!html.includes('class="skip-link" href="#main-content"') ||
      !html.includes('<main id="main-content" tabindex="-1"')) {
    fail(`FAIL ${page}: missing keyboard skip destination`);
  }
  if (/<style\b|\sstyle=/.test(html)) {
    fail(`FAIL ${page}: page styling must use the shared stylesheet`);
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  if (new Set(ids).size !== ids.length) fail(`FAIL ${page}: duplicate element ids`);
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (url.startsWith("#")) {
      if (!ids.includes(url.slice(1))) fail(`FAIL ${page}: missing anchor ${url}`);
    } else if (url.startsWith("/") && !url.startsWith("//")) {
      let local = url.split(/[?#]/)[0].slice(1);
      if (!local || local.endsWith("/")) local += "index.html";
      if (!exists(local)) fail(`FAIL ${page}: missing local destination ${url}`);
    }
  }
  if (/^here-(links|trmnl|hackerba)\/index.html$/.test(page) &&
      !html.includes('class="status-note"')) {
    fail(`FAIL ${page}: unmaintained product needs a visible status`);
  }

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
  // English-only site — no Chinese content allowed
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
  "Map wallpapers for places you care about.",
  "Calendar, reminders, and feeds on your Mac’s screen edge.",
  "Music and playback controls in your MacBook notch.",
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
if (
  !siteCss.includes(".detail-feature-grid .unit:has(> .unit__media)") ||
  !siteCss.includes("grid-column: 1 / -1;")
) {
  fail("FAIL assets/site.css: benefit units with media must span full width as copy|media");
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
  fail("FAIL here-wallpaper/index.html: lock-screen preview should keep Map lock screen wallpaper alt");
}
if ((wallpaper.match(/\/assets\/shots\/shot-\d\.jpg\?v=10" width="585" height="1266"/g) || []).length !== 4) {
  fail("FAIL here-wallpaper/index.html: phone shots should declare 585x1266");
}
if (!wallpaper.includes('alt="Live map wallpaper on Mac"')) {
  fail("FAIL here-wallpaper/index.html: Mac live preview should keep live map alt");
}
for (const title of [
  "Find a place",
  "Themes, type, and layers",
  "Favorites and Shortcuts",
  "Between wallpaper and icons",
]) {
  if (!wallpaper.includes(`>${title}</h2>`)) {
    fail(`FAIL here-wallpaper/index.html: missing benefit title (${title})`);
  }
}
if (wallpaper.includes('class="product-scene"')) {
  fail("FAIL here-wallpaper/index.html: product-scene should be removed");
}
if (
  wallpaper.includes(">Any place</h2>") ||
  wallpaper.includes(">Live wallpaper for Mac</h2>") ||
  wallpaper.includes(">Your place, on the lock screen</h2>") ||
  wallpaper.includes(">Save, then set in Photos</h2>") ||
  wallpaper.includes(">Live on the Mac desktop</h2>")
) {
  fail("FAIL here-wallpaper/index.html: obsolete feature titles still present");
}
if (!wallpaper.includes('id="find-title">') || !wallpaper.includes('id="shortcuts-title">') || !wallpaper.includes('id="mac-title">')) {
  fail("FAIL here-wallpaper/index.html: benefit ids find/shortcuts/mac should be present");
}
if (wallpaper.includes('id="place-title"') || wallpaper.includes('id="export-title"')) {
  fail("FAIL here-wallpaper/index.html: obsolete place-title / export-title ids still present");
}
const wallpaperMacPos = wallpaper.indexOf('aria-labelledby="mac-title"');
const wallpaperFaqPos = wallpaper.indexOf('aria-labelledby="faq-title"');
if (wallpaperMacPos < 0 || wallpaperFaqPos < 0 || !(wallpaper.indexOf('<div class="detail-feature-grid">') < wallpaperMacPos && wallpaperMacPos < wallpaperFaqPos)) {
  fail("FAIL here-wallpaper/index.html: mac benefit must sit inside detail-feature-grid before FAQ");
}
// Ensure no separate mid-page Mac unit outside the grid: after grid close, next product section should be FAQ
{
  const gridStart = wallpaper.indexOf('<div class="detail-feature-grid">');
  const after = wallpaper.slice(gridStart);
  const close = after.search(/<\/div>\s*\n\s*<section class="product-faq"/);
  if (close < 0) {
    fail("FAIL here-wallpaper/index.html: detail-feature-grid should close immediately before product-faq (no mid-page Mac unit)");
  }
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
  fail("FAIL here-island/index.html: peek.gif alt / New track title missing");
}
if (!htmlByPage["here-sidefy/index.html"].includes('alt="Sidefy screen-edge info stream"') || !htmlByPage["here-sidefy/index.html"].includes("One stream, no app switching")) {
  fail("FAIL here-sidefy/index.html: shot-hero alt / One stream title missing");
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
  "Processed on your Mac",
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


// --- hero previews vs benefit grid (no huge shots in dual-column benefits) ---
const sectionSlice = (html, openTag) => {
  const start = html.indexOf(openTag);
  if (start < 0) return "";
  const end = html.indexOf("</section>", start);
  return end < 0 ? "" : html.slice(start, end + "</section>".length);
};
const gridSlice = (html) => {
  const start = html.indexOf('<div class="detail-feature-grid">');
  if (start < 0) return "";
  const end = html.indexOf("</div>", start);
  // detail-feature-grid wraps many sections; find matching close after last nested section before FAQ/mac
  // Prefer: from open through the closing </div> that follows the last </section> before FAQ.
  const after = html.slice(start);
  const close = after.search(/<\/div>\s*\n\s*<(?:section class="(?:unit|product-faq)")/);
  if (close < 0) {
    const fallback = after.indexOf("</div>");
    return fallback < 0 ? "" : after.slice(0, fallback + 6);
  }
  return after.slice(0, close + 6);
};

const sidefyHero = sectionSlice(sidefy, '<section class="product-hero"');
const sidefyGrid = gridSlice(sidefy);
if (!sidefyHero.includes("shot-hero.jpg")) {
  fail("FAIL here-sidefy/index.html: product-hero must include shot-hero.jpg after download links");
}
if (sidefyGrid.includes("unit__media") || sidefyGrid.includes("shot-hero.jpg")) {
  fail("FAIL here-sidefy/index.html: detail-feature-grid must not hold shot-hero / unit__media");
}
if (!sidefy.includes('id="stream-title">One stream, no app switching</h2>') || !sidefy.includes("unit__copy--solo")) {
  fail("FAIL here-sidefy/index.html: One stream benefit should remain copy-only");
}

const wallpaperHero = sectionSlice(wallpaper, '<section class="product-hero"');
const wallpaperGrid = gridSlice(wallpaper);
if (!wallpaperHero.includes("shot-1.jpg") || !wallpaperHero.includes("shot-2.jpg") || !wallpaperHero.includes("shot-3.jpg") || !wallpaperHero.includes("shot-4.jpg")) {
  fail("FAIL here-wallpaper/index.html: product-hero phone row must include shot-1..4");
}
if (!wallpaperHero.includes("shot-mac-maldives.jpg")) {
  fail("FAIL here-wallpaper/index.html: hero must include the full-width Mac preview");
}
if (wallpaperGrid.includes("shot-1.jpg") || wallpaperGrid.includes("shot-mac-maldives.jpg")) {
  fail("FAIL here-wallpaper/index.html: phone and desktop previews belong in the hero");
}

const islandHero = sectionSlice(island, '<section class="product-hero"');
const islandGrid = gridSlice(island);
if (!islandHero.includes("peek.gif")) {
  fail("FAIL here-island/index.html: product-hero must include peek.gif after download links");
}
if (islandGrid.includes("unit__media") || islandGrid.includes("peek.gif")) {
  fail("FAIL here-island/index.html: detail-feature-grid must not hold peek.gif / unit__media");
}

// --- sspai CSS pills (English two-line Featured in/on; detail pages under title only; no catalog list) ---
const SSPAI_SIDEFY = "https://sspai.com/post/102198";
const SSPAI_WALLPAPER = "https://sspai.com/post/114211";
const twoLinePill = (href, brand, label) =>
  `<a class="press-pill" href="${href}" target="_blank" rel="noopener noreferrer">
            <span class="press-pill__brand">${brand}</span>
            <span class="press-pill__label">${label}</span>
          </a>`;
const PILL_SIDEFY_MATRIX = twoLinePill(SSPAI_SIDEFY, "sspai", "Featured in Matrix");
const PILL_SIDEFY_HOME = twoLinePill(SSPAI_SIDEFY, "sspai", "Featured on Home");
const PILL_WALLPAPER_MATRIX = twoLinePill(SSPAI_WALLPAPER, "sspai", "Featured in Matrix");
const APP_STORE_SIDEFY = "https://apps.apple.com/app/id6751482006";
const PILL_SIDEFY_APPSTORE = twoLinePill(APP_STORE_SIDEFY, "App Store", "Mac Paid #1 · 2025");
if (exists("assets/sidefy/sspai-matrix-badge.png")) {
  fail("FAIL assets/sidefy/sspai-matrix-badge.png: PNG badge must be removed");
}
if (home.includes("press-badge") || home.includes("sspai-matrix-badge") || sidefy.includes("press-badge") || sidefy.includes("sspai-matrix-badge") || wallpaper.includes("press-badge")) {
  fail("FAIL: obsolete .press-badge / PNG badge markup still present");
}
if (home.includes("press-pill") || home.includes("sspai.com/post") || home.includes("Mac Paid #1")) {
  fail("FAIL index.html: sspai/App Store ranking pills belong on detail pages only, not the catalog list");
}
if (!sidefy.includes(PILL_SIDEFY_MATRIX) || !sidefy.includes(PILL_SIDEFY_HOME) || !sidefy.includes(PILL_SIDEFY_APPSTORE) || !sidefy.includes("press-pills")) {
  fail("FAIL here-sidefy/index.html: missing English Featured in Matrix, Featured on Home, and App Store Mac Paid #1 two-line press-pills under title");
}
if (
  sidefy.includes("Matrix精选") ||
  sidefy.includes("首页推荐") ||
  sidefy.includes("编辑精选") ||
  sidefy.includes("Featured on sspai") ||
  sidefy.includes("On sspai") ||
  sidefy.includes("Matrix Featured") ||
  sidefy.includes("Home Featured")
) {
  fail("FAIL here-sidefy/index.html: leftover Chinese badge words or obsolete sspai labels still present");
}
if (!wallpaper.includes(PILL_WALLPAPER_MATRIX) || !wallpaper.includes("press-pills")) {
  fail("FAIL here-wallpaper/index.html: missing English Featured in Matrix two-line press-pill under title");
}
if (
  wallpaper.includes("On sspai") ||
  wallpaper.includes("Matrix精选") ||
  wallpaper.includes("首页推荐") ||
  wallpaper.includes("编辑精选") ||
  wallpaper.includes("Matrix Featured") ||
  wallpaper.includes("Home Featured") ||
  wallpaper.includes(SSPAI_SIDEFY) ||
  wallpaper.includes(PILL_SIDEFY_APPSTORE) ||
  wallpaper.includes("Mac Paid #1")
) {
  fail("FAIL here-wallpaper/index.html: must only have English Featured in Matrix (no Chinese badges / On sspai / Sidefy URL / App Store ranking / obsolete Matrix Featured)");
}
if (island.includes("sspai.com/post") || island.includes("press-pill") || island.includes("sspai") || island.includes("Mac Paid #1") || island.includes(PILL_SIDEFY_APPSTORE)) {
  fail("FAIL here-island/index.html: should not include sspai/App Store ranking pills or sspai.com/post");
}
// Forbid leftover Chinese badge words site-wide
for (const page of pages) {
  const html = htmlByPage[page];
  for (const bad of ["Matrix精选", "首页推荐", "编辑精选", "On sspai", "Matrix Featured", "Home Featured"]) {
    if (html.includes(bad)) fail(`FAIL ${page}: leftover badge wording (${bad})`);
  }
}
if (!siteCss.includes(".press-pill__brand") || !siteCss.includes(".press-pill__label") || !siteCss.includes("flex-direction: column")) {
  fail("FAIL assets/site.css: press-pill must be two-line flex column with brand/label");
}
if (!siteCss.includes("border-radius: 999px")) {
  fail("FAIL assets/site.css: press-pill must keep capsule border-radius 999px");
}

// --- result ---
if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log(`OK ${pages.length} pages pass shared asset contract`);
