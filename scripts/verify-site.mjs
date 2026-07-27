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
