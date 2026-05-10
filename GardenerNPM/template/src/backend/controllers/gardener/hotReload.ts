import fs from 'fs';
import path from 'path';
import type { Request, Response } from 'express';

// ── Version token ─────────────────────────────────────────────
// Monotonically-increasing timestamp updated whenever a file
// in src/frontend/ changes. The frontend stores the first value
// it sees and reloads as soon as it receives a different one.
let version: number = Date.now();

// ── File watcher ──────────────────────────────────────────────
const watchTarget = path.resolve('src', 'frontend');

let debounce: ReturnType<typeof setTimeout> | null = null;

if (process.env.NODE_ENV !== 'production') {
  fs.watch(watchTarget, { recursive: true }, (_event, filename) => {
    // Ignore hidden files and node_modules
    if (!filename || filename.startsWith('.')) return;

    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(() => {
      version = Date.now();
      // console.log(`[gardener] file changed: ${filename} → version ${version}`);
    }, 100);
  });
  console.log(`[gardener] watching ${watchTarget} for changes…`);
}


// ── Route handler ─────────────────────────────────────────────
// GET /__gardener/hot-reload
// Returns { version: <number> }
export function hotReloadHandler(req: Request, res: Response) {
  res.json({ version });
}
