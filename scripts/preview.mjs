import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain",
};
const server = http.createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    if (pathname === "/") {
      response.writeHead(302, { Location: "/Moe-CV/" });
      response.end();
      return;
    }
    if (!pathname.startsWith("/Moe-CV/")) throw new Error("Not found");
    pathname = pathname.slice("/Moe-CV/".length);
    let file = path.resolve(root, pathname || "index.html");
    if (!file.startsWith(root + path.sep) && file !== root)
      throw new Error("Not found");
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    const content = await readFile(file);
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
    });
    response.end(content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not found");
  }
});
server.listen(4173, "127.0.0.1", () =>
  process.stdout.write("Portfolio preview: http://127.0.0.1:4173/Moe-CV/\n"),
);
