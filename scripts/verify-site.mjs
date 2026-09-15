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
  "archive/index.html",
];

const canonicalByPage = {
  "index.html": "https://locusable.com/",
  "about/index.html": "https://locusable.com/about/",
  "archive/index.html": "https://locusable.com/archive/",
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
      "Free open-source media in the MacBook notch: artwork, controls, optional waveform, quick peek, lock screen card. Hide in screenshots and fullscreen.",
  },
  "here-sidefy/index.html": {
    title: "Sidefy — Info stream on the Mac screen edge",
    description:
      "Calendar, Reminders, GitHub, RSS, and plugins on the Mac screen edge, with reader mode and translation. Keyboard-friendly, processed on your Mac.",
  },
  "here-wallpaper/index.html": {
    title: "Here Wallpaper — Map wallpapers for iPhone, iPad, and Mac",
    description:
      "A place you care about as wallpaper — lock screen on iPhone and iPad, live under the icons on Mac.",
  },
};

const cssVersion = "247";
const jsVersion = "68";

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
    "What do I need to run it?",
    "Does Here Wallpaper collect personal data?",
    "What does Pro include?",
  ],
  "here-links/index.html": [
    "Is Here Links free?",
    "What do I need to run it?",
    "Does Here Links collect personal data?",
    "Can I connect more than one server?",
  ],
  "here-sidefy/index.html": [
    "Is Sidefy free?",
    "What do I need to run it?",
    "Does Sidefy collect personal data?",
  ],
  "here-island/index.html": [
    "Is Here Island free?",
    "What do I need to run it?",
    "Does Here Island collect personal data?",
  ],
  "here-hackerba/index.html": [
    "Is Here HackerBa free?",
    "What do I need to run it?",
    "Does Here HackerBa collect personal data?",
    "How do I install it?",
  ],
  "here-trmnl/index.html": [
    "Is Here TRMNL free?",
    "What do I need to run it?",
    "Does Here TRMNL collect personal data?",
  ],
};

const flatFaqPages = new Set([
  "here-wallpaper/index.html",
  "here-sidefy/index.html",
  "here-island/index.html",
  "here-links/index.html",
  "here-hackerba/index.html",
  "here-trmnl/index.html",
]);

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
  if (!/href="\/about\/"[^>]*>About<\/a>/.test(navigation) || !/href="\/archive\/"[^>]*>Archive<\/a>/.test(navigation)) {
    fail(`FAIL ${page}: top navigation should keep About and Archive`);
  }
  if (page === "about/index.html" && !navigation.includes('aria-current="page"')) {
    fail(`FAIL ${page}: About should be marked current in the top navigation`);
  }
  if (page === "archive/index.html" && !navigation.includes('aria-current="page"')) {
    fail(`FAIL ${page}: Archive should be marked current in the top navigation`);
  }
  if (page === "index.html") {
    const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0] || "";
    if (/href="\/about\/"/.test(main) || /href="\/archive\/"/.test(main)) {
      fail(`FAIL ${page}: About and Archive belong in the top navigation, not under the catalog lead`);
    }
    if (/footer__links/.test(footer) || /href="\/about\/"/.test(footer) || /href="\/archive\/"/.test(footer)) {
      fail(`FAIL ${page}: homepage footer should be copyright only`);
    }
  }
  if ((page === "about/index.html" || page === "archive/index.html") && /footer__links/.test(footer)) {
    fail(`FAIL ${page}: About/Archive pages should not have footer links`);
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
    fail(`FAIL ${page}: archived product needs a visible status`);
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
  if (!html.includes('<a class="brand" href="/">Locusable <span class="brand__studio">Studio</span></a>')) {
    fail(`FAIL ${page}: brand should keep Locusable in --fg and Studio in brand__studio`);
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
    const faq = html.match(/<section class="product-faq"[\s\S]*?<\/section>/)?.[0] || "";
    if (/Privacy Policy|\/privacy\//.test(faq)) {
      fail(`FAIL ${page}: FAQ should not include a Privacy Policy link`);
    }
    if (flatFaqPages.has(page)) {
      if (/<details[\s>]/.test(html) || /<summary[\s>]/.test(html)) {
        fail(`FAIL ${page}: product FAQ should be flat (no details/summary)`);
      }
      for (const question of faqQuestions) {
        if (!html.includes(`>${question}</h3>`) && !html.includes(`>${question}</dt>`)) {
          fail(`FAIL ${page}: missing FAQ question (${question})`);
        }
      }
    } else {
      for (const question of faqQuestions) {
        if (!html.includes(`>${question}</summary>`)) {
          fail(`FAIL ${page}: missing FAQ question (${question})`);
        }
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
  "assets/here-wallpaper/shot-iphone-dhaka.webp",
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
    "https://locusable.com/archive/",
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
const archive = htmlByPage["archive/index.html"];
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
  "Calendar, reminders, RSS, and plugins on your Mac’s screen edge.",
  "Now Playing in the MacBook notch.",
]) {
  if (!home.includes(line)) fail(`FAIL index.html: missing product card line (${line})`);
}
for (const href of ["/here-wallpaper/", "/here-sidefy/", "/here-island/", "/archive/"]) {
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
if (!home.includes('<html lang="en" data-app="studio">')) {
  fail("FAIL index.html: homepage should use data-app=studio for brand gold");
}
for (const [app, title] of [
  ["wallpaper", "Here <em>Wallpaper</em>"],
  ["sidefy", "<em>Sidefy</em>"],
  ["island", "Here <em>Island</em>"],
]) {
  if (!home.includes(`<article class="product" data-app="${app}">`)) {
    fail(`FAIL index.html: product card missing data-app=${app}`);
  }
  if (!home.includes(title)) {
    fail(`FAIL index.html: product title should use accent em (${title})`);
  }
}
if (!home.includes('class="product-title"')) {
  fail("FAIL index.html: product titles should use product-title for accent em");
}
if (!about.includes('data-app="studio"')) {
  fail("FAIL about/index.html: studio pages should keep data-app=studio");
}
if (!archive.includes('<html lang="en" data-app="studio">')) {
  fail("FAIL archive/index.html: Archive should use data-app=studio for brand gold");
}
if (!archive.includes('href="/here-trmnl/"') || !archive.includes('href="/here-links/"') || !archive.includes('href="/here-hackerba/"')) {
  fail("FAIL archive/index.html: product assignment is incorrect");
}
if ((archive.match(/class="product"/g) || []).length !== 3) {
  fail("FAIL archive/index.html: expected 3 product rows");
}
for (const [app, title] of [
  ["trmnl", "Here <em>TRMNL</em>"],
  ["links", "Here <em>Links</em>"],
  ["hackerba", "Here <em>HackerBa</em>"],
]) {
  if (!archive.includes(`<article class="product" data-app="${app}">`)) {
    fail(`FAIL archive/index.html: product card missing data-app=${app}`);
  }
  if (!archive.includes(title)) {
    fail(`FAIL archive/index.html: product title should use accent em (${title})`);
  }
}
if (!archive.includes('class="product-title"')) {
  fail("FAIL archive/index.html: product titles should use product-title for accent em");
}
if (!archive.includes("<title>Archive — Locusable Studio</title>")) {
  fail("FAIL archive/index.html: title should be Archive — Locusable Studio");
}
if (!archive.includes('property="og:title" content="Archive — Locusable Studio"')) {
  fail("FAIL archive/index.html: og:title should be Archive — Locusable Studio");
}
if (/Unmaintained/i.test(archive)) {
  fail("FAIL archive/index.html: public copy must not contain Unmaintained");
}
if (archive.includes("/unmaintained/")) {
  fail("FAIL archive/index.html: canonical/nav paths must use /archive/");
}

// --- legacy /unmaintained/ redirect-only ---
if (!exists("unmaintained/index.html")) {
  fail("FAIL unmaintained/index.html: legacy path should remain as a redirect");
} else {
  const legacy = read("unmaintained/index.html");
  if (!/http-equiv=["']refresh["']/i.test(legacy) || !legacy.includes("url=/archive/")) {
    fail("FAIL unmaintained/index.html: should meta-refresh to /archive/");
  }
  if (!legacy.includes('location.replace("/archive/")') && !legacy.includes("location.replace('/archive/')")) {
    fail("FAIL unmaintained/index.html: should JS-replace to /archive/");
  }
  if (!legacy.includes('href="/archive/"')) {
    fail("FAIL unmaintained/index.html: should include an /archive/ fallback link");
  }
  if (/Unmaintained/i.test(legacy)) {
    fail("FAIL unmaintained/index.html: redirect page must not expose Unmaintained");
  }
  if (legacy.includes('class="topbar"') || legacy.includes('class="catalog"')) {
    fail("FAIL unmaintained/index.html: should be redirect-only, not a full page");
  }
}

// Outward public pages: zero Unmaintained wording
for (const page of pages) {
  if (/Unmaintained/i.test(htmlByPage[page])) {
    fail(`FAIL ${page}: outward copy must not contain Unmaintained`);
  }
  if (htmlByPage[page].includes("/unmaintained/")) {
    fail(`FAIL ${page}: internal hrefs must use /archive/, not /unmaintained/`);
  }
}
if (read("sitemap.xml").includes("/unmaintained/")) {
  fail("FAIL sitemap.xml: should list /archive/, not /unmaintained/");
}
if (home.includes('href="/coming-soon/"') || pages.some((page) => htmlByPage[page].includes('href="/coming-soon/"'))) {
  fail("FAIL Coming Soon navigation should be removed");
}

const productIconCount = (html) => (html.match(/class="product__icon"[^>]*width="72" height="72"/g) || []).length;
if (productIconCount(home) !== 3 || productIconCount(archive) !== 3) {
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
  ".product-faq summary,",
  ".product-faq h3,",
]) {
  if (!siteCss.includes(needle)) fail(`FAIL assets/site.css: missing ${needle}`);
}
if (siteCss.includes(".product-faq details + details") ||
    siteCss.includes(".product-faq h3 + p + h3") ||
    siteCss.includes(".product-faq dd + dt")) {
  fail("FAIL assets/site.css: FAQ inter-item border dividers should be removed");
}
if (!/main > \.unit,\s*\.product-faq,\s*\.detail-feature-grid \{\s*border-top:/.test(siteCss)) {
  fail("FAIL assets/site.css: section-level product-faq border-top should remain");
}
if (!siteCss.includes(".unit__media img {") || !siteCss.includes("border-radius: 8px;")) {
  fail("FAIL assets/site.css: screenshots should use the minimal bordered treatment");
}
if (!siteCss.includes(".topbar__inner {") || !siteCss.includes("width: min(100% - 32px, var(--max));")) {
  fail("FAIL assets/site.css: navigation should use the minimal site width");
}
if (!/\.topbar \{[\s\S]*?position:\s*fixed;/.test(siteCss) ||
    !siteCss.includes("border-bottom: 1px solid var(--line);") ||
    siteCss.includes(".topbar.is-scrolled") ||
    !siteCss.includes("--topbar-height:") ||
    !/\.site-shell \{[\s\S]*?padding-top:\s*var\(--topbar-height\);/.test(siteCss)) {
  fail("FAIL assets/site.css: topbar should be fixed with always-on border and spacer");
}
if (siteJs.includes('classList.toggle("is-scrolled"') || siteJs.includes("initTopbarScroll")) {
  fail("FAIL assets/site.js: topbar should not toggle .is-scrolled on scroll");
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
if (!/\.brand \{[\s\S]*?color:\s*var\(--fg\);/.test(siteCss)) {
  fail("FAIL assets/site.css: .brand should use var(--fg)");
}
if (!siteCss.includes(".brand__studio") || !siteCss.includes("color: var(--accent-ink, var(--accent));")) {
  fail("FAIL assets/site.css: .brand__studio should follow page accent");
}
if (!siteCss.includes('[data-app="studio"] { --accent: #9b7100; }') ||
    !siteCss.includes('[data-app="studio"] { --accent-ink: #ddc274; }')) {
  fail("FAIL assets/site.css: studio accent / accent-ink should remain gold");
}
if (!siteCss.includes("--link: var(--accent-ink, var(--accent));")) {
  fail("FAIL assets/site.css: links should follow the page accent");
}
if (!siteCss.includes(".product__links a") || !siteCss.includes("color: var(--link);")) {
  fail("FAIL assets/site.css: catalog More Information links should follow the product accent");
}
if (siteCss.includes("#075fbb") || siteCss.includes("#72b7ff")) {
  fail("FAIL assets/site.css: leftover global blue link color");
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
if (!exists("assets/here-wallpaper/icon-192.png")) {
  fail("FAIL missing assets/here-wallpaper/icon-192.png");
}
if (exists("assets/here")) {
  fail("FAIL leftover assets/here; Wallpaper icon belongs in assets/here-wallpaper");
}
if (!wallpaper.includes("/assets/here-wallpaper/icon-192.png") || !home.includes("/assets/here-wallpaper/icon-192.png")) {
  fail("FAIL wallpaper icon should live at assets/here-wallpaper/icon-192.png");
}
for (const shot of [
  "shot-iphone-cocos-island.webp",
  "shot-iphone-acropolis.webp",
  "shot-iphone-shanghai.webp",
  "shot-iphone-machu-picchu.webp",
  "shot-mac-maldives.webp",
  "shot-mac-brasilia.webp",
  "shot-mac-christ-the-redeemer.webp",
]) {
  if (!exists(`assets/here-wallpaper/${shot}`)) fail(`FAIL missing assets/here-wallpaper/${shot}`);
  if (!wallpaper.includes(shot)) fail(`FAIL here-wallpaper/index.html: missing preview ${shot}`);
}
if (!wallpaper.includes("unit__media--desktop-scroll")) {
  fail("FAIL here-wallpaper/index.html: Mac previews should use unit__media--desktop-scroll");
}

if (wallpaper.includes("/here-wallpaper/themes") || wallpaper.includes("themes-title") || wallpaper.includes("Browse themes")) {
  fail("FAIL here-wallpaper/index.html: themes catalog link should be removed");
}
if ((wallpaper.match(/\/assets\/here-wallpaper\/shot-iphone-acropolis\.webp\?v=1/g) || []).length !== 1) {
  fail("FAIL here-wallpaper/index.html: lock-screen preview should appear once");
}
if (!wallpaper.includes('alt="Map lock screen wallpaper"')) {
  fail("FAIL here-wallpaper/index.html: lock-screen preview should keep Map lock screen wallpaper alt");
}
if ((wallpaper.match(/\/assets\/here-wallpaper\/shot-iphone-[a-z-]+\.webp\?v=1" width="585" height="1266"/g) || []).length !== 4) {
  fail("FAIL here-wallpaper/index.html: phone shots should declare 585x1266");
}
for (const alt of [
  "Mac desktop map wallpaper — Maldives",
  "Mac desktop map wallpaper — Brasília",
  "Mac desktop map wallpaper — Christ the Redeemer",
]) {
  if (!wallpaper.includes(`alt="${alt}"`)) {
    fail(`FAIL here-wallpaper/index.html: missing Frodo Mac alt (${alt})`);
  }
}
for (const title of [
  "Find a place",
  "Themes, type, and layers",
  "Favorites, Shortcuts, and widgets",
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
if ((linksPage.match(/\/assets\/here-links\/shot-iphone-[a-z-]+\.webp\?v=\d" width="585" height="1272"/g) || []).length !== 4) {
  fail("FAIL here-links/index.html: phone shots should declare 585x1272");
}

// --- here-island ---
const island = htmlByPage["here-island/index.html"];
const islandPrivacy = htmlByPage["here-island/privacy/index.html"];

if (!island.includes('/assets/here-island/shot-mac-quick-peek.gif?v=1" width="420" height="180"') || !exists("assets/here-island/shot-mac-quick-peek.gif")) {
  fail("FAIL here-island/index.html: missing 420x180 GitHub preview GIF");
}
if (exists("assets/here-links/shots") || exists("assets/shots") || exists("assets/here-island/peek.gif")) {
  fail("FAIL leftover screenshot folder or obsolete peek.gif");
}
if (!island.includes('alt="Quick peek on track change"') || !island.includes("New track, quick peek")) {
  fail("FAIL here-island/index.html: peek.gif alt / New track title missing");
}
if (!htmlByPage["here-sidefy/index.html"].includes('alt="Sidefy screen-edge info stream"') || !htmlByPage["here-sidefy/index.html"].includes("One stream, no app switching")) {
  fail("FAIL here-sidefy/index.html: shot-hero alt / One stream title missing");
}
if (!htmlByPage["here-sidefy/index.html"].includes('alt="Sidefy desktop feed columns"')) {
  fail("FAIL here-sidefy/index.html: missing desktop feed columns alt");
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
  "Now Playing or Apple Music",
  "Lock screen card, optional",
  "Out of screenshots and fullscreen",
  "Optional media card with artwork, controls, and progress",
  "Hide during screenshots and recordings",
  "native fullscreen",
  "Title marquee on track change",
  "real-time waveform",
  "follow Apple Music",
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
  "/assets/here-hackerba/shot-desktop-list.webp",
  "/assets/here-hackerba/shot-desktop-thread.webp",
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
if (!sidefyHero.includes("shot-mac-screen-edge.webp") || !sidefyHero.includes("shot-mac-feed-columns.webp")) {
  fail("FAIL here-sidefy/index.html: product-hero must include shot-mac-screen-edge.webp and shot-mac-feed-columns.webp after download links");
}
if (!sidefyHero.includes("unit__media--desktop-scroll")) {
  fail("FAIL here-sidefy/index.html: hero previews must use desktop-scroll");
}
if (!exists("assets/sidefy/shot-mac-feed-columns.webp")) {
  fail("FAIL missing assets/sidefy/shot-mac-feed-columns.webp");
}
if (sidefyGrid.includes("unit__media") || sidefyGrid.includes("shot-mac-screen-edge.webp") || sidefyGrid.includes("shot-mac-feed-columns.webp")) {
  fail("FAIL here-sidefy/index.html: detail-feature-grid must not hold screenshots / unit__media");
}
if (!sidefy.includes('id="stream-title">One stream, no app switching</h2>') || !sidefy.includes("unit__copy--solo")) {
  fail("FAIL here-sidefy/index.html: One stream benefit should remain copy-only");
}

const wallpaperHero = sectionSlice(wallpaper, '<section class="product-hero"');
const wallpaperGrid = gridSlice(wallpaper);
if (!wallpaperHero.includes("shot-iphone-cocos-island.webp") || !wallpaperHero.includes("shot-iphone-acropolis.webp") || !wallpaperHero.includes("shot-iphone-shanghai.webp") || !wallpaperHero.includes("shot-iphone-machu-picchu.webp")) {
  fail("FAIL here-wallpaper/index.html: product-hero phone row must include named iPhone previews");
}
const cocosPos = wallpaperHero.indexOf("shot-iphone-cocos-island.webp");
const acropolisPos = wallpaperHero.indexOf("shot-iphone-acropolis.webp");
if (cocosPos < 0 || acropolisPos < 0 || !(cocosPos < acropolisPos)) {
  fail("FAIL here-wallpaper/index.html: Cocos Island preview should be first in the phone row");
}
if (wallpaperHero.includes("shot-iphone-dhaka.webp") || wallpaper.includes("shot-iphone-dhaka.webp")) {
  fail("FAIL here-wallpaper/index.html: Dhaka preview should be removed");
}
for (const shot of [
  "shot-mac-maldives.webp",
  "shot-mac-brasilia.webp",
  "shot-mac-christ-the-redeemer.webp",
]) {
  if (!wallpaperHero.includes(shot)) {
    fail(`FAIL here-wallpaper/index.html: hero must include Mac preview ${shot}`);
  }
}
if (!wallpaperHero.includes("unit__media--desktop-scroll")) {
  fail("FAIL here-wallpaper/index.html: hero Mac row must use desktop-scroll");
}
if (wallpaperGrid.includes("shot-iphone-acropolis.webp") || wallpaperGrid.includes("shot-mac-maldives.webp")) {
  fail("FAIL here-wallpaper/index.html: phone and desktop previews belong in the hero");
}
for (const [name, hero] of [["here-sidefy", sidefyHero], ["here-wallpaper", wallpaperHero]]) {
  const subhead = hero.indexOf('class="unit__subhead"');
  const pills = hero.indexOf('class="press-pills"');
  const links = hero.indexOf('class="unit__links"');
  if (!(subhead >= 0 && pills > subhead && links > pills)) {
    fail(`FAIL ${name}/index.html: press-pills should sit after the product description and before download links`);
  }
}

const islandHero = sectionSlice(island, '<section class="product-hero"');
const islandGrid = gridSlice(island);
if (!islandHero.includes("shot-mac-quick-peek.gif")) {
  fail("FAIL here-island/index.html: product-hero must include shot-mac-quick-peek.gif after download links");
}
if (islandGrid.includes("unit__media") || islandGrid.includes("shot-mac-quick-peek.gif")) {
  fail("FAIL here-island/index.html: detail-feature-grid must not hold shot-mac-quick-peek.gif / unit__media");
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
