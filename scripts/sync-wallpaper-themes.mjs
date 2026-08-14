import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appRoot = path.resolve(root, "../HereWallpaper/HereWallpaperCore/Resources");
const outDir = path.join(root, "here-wallpaper/themes/data");

const files = ["basic_themes.json", "featured_themes.json"];

if (!fs.existsSync(appRoot)) {
  console.error(`FAIL: HereWallpaper resources not found at ${appRoot}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  const src = path.join(appRoot, file);
  const dest = path.join(outDir, file);
  fs.copyFileSync(src, dest);
  JSON.parse(fs.readFileSync(dest, "utf8"));
  console.log(`OK copied ${file}`);
}
