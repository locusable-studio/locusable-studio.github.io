import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer(async (req, res) => {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  try {
    const url = new URL(req.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.split("/").some((part) => part.startsWith("."))) {
      res.writeHead(404).end("Not found");
      return;
    }
    let file = path.resolve(root, `.${pathname}`);
    if (file !== path.resolve(root) && !file.startsWith(root)) {
      res.writeHead(404).end("Not found");
      return;
    }
    if ((await fs.stat(file)).isDirectory()) {
      if (!pathname.endsWith("/")) {
        res.writeHead(308, { Location: `${url.pathname}/${url.search}` }).end();
        return;
      }
      file = path.join(file, "index.html");
    }
    const data = await fs.readFile(file);
    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
      "Content-Length": data.length,
    });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    res.writeHead(404).end("Not found");
  }
});
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () => {
  console.log(`Local preview: http://127.0.0.1:${port}`);
});
