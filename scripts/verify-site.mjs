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

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log(`OK ${pages.length} pages pass shared asset contract`);
