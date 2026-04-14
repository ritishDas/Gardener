import type { Request, Response } from "express";
import fsp from "fs/promises";
import path from "path";
import generateWebP from "../../libs/generateWebp.js";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Whitelist of allowed remote image domains.
// Set GARDENER_IMAGE_DOMAINS=example.com,cdn.mysite.com in your .env
function getAllowedDomains(): string[] {
  const raw = process.env.GARDENER_IMAGE_DOMAINS ?? "";
  return raw
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
}

function isAllowedUrl(rawUrl: string): { ok: true } | { ok: false; reason: string } {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { ok: false, reason: "Malformed URL." };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, reason: "Only http/https URLs are allowed." };
  }

  const allowedDomains = getAllowedDomains();
  if (allowedDomains.length === 0) {
    return { ok: false, reason: "No allowed image domains configured. Set GARDENER_IMAGE_DOMAINS in your .env" };
  }

  const hostname = parsed.hostname.toLowerCase();
  const isAllowed = allowedDomains.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  );

  if (!isAllowed) {
    return { ok: false, reason: `Domain '${hostname}' is not in the allowed list.` };
  }

  return { ok: true };
}

async function downloadRemoteImage(
  remoteUrl: string,
  destPath: string
): Promise<void> {
  const response = await fetch(remoteUrl);

  if (!response.ok) {
    throw new Error(`Remote fetch failed: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`Remote URL did not return an image (got: ${contentType})`);
  }

  const buffer = await response.arrayBuffer();
  await fsp.writeFile(destPath, Buffer.from(buffer));
}

export async function imageOptimiser(req: Request, res: Response) {
  try {
    const { name } = req.params;

    if (typeof name !== "string") {
      return res.status(400).json({ success: false, message: "invalid path" });
    }

    // name format: baseName_{width}x{height}.webp
    const match = name.match(/^(.+?)_(\d+)x(\d+)\.webp$/);
    if (!match) {
      return res.status(400).json({ error: "Invalid image format. Expected: name_{w}x{h}.webp" });
    }

    const [, baseName, widthStr, heightStr] = match;
    const width = parseInt(widthStr!, 10);
    const height = parseInt(heightStr!, 10);

    // ── 1. Serve from cache if already converted ────────────────────────────
    const cacheDir = path.join(__dirname, "..", "..", "..", "frontend", "static", "cache");
    await fsp.mkdir(cacheDir, { recursive: true });

    const outputPath = path.join(cacheDir, name);

    try {
      await fsp.access(outputPath);
      return res.sendFile(path.basename(outputPath), { root: path.dirname(outputPath) });
    } catch {
      // not cached → continue
    }

    // ── 2. Locate source image in assets/ (local) ───────────────────────────
    const assetsDir = path.resolve(__dirname, "..", "..", "..", "frontend", "assets");
    await fsp.mkdir(assetsDir, { recursive: true });

    let inputPath: string | null = null;

    const localFiles = await fsp.readdir(assetsDir);
    const localMatch = localFiles.find((file) => path.parse(file).name === baseName);
    if (localMatch) {
      inputPath = path.join(assetsDir, localMatch);
    }

    // ── 3. Check assets/remote/ if not found locally ────────────────────────
    const remoteAssetsDir = path.join(assetsDir, "remote");
    await fsp.mkdir(remoteAssetsDir, { recursive: true });

    if (!inputPath) {
      const remoteFiles = await fsp.readdir(remoteAssetsDir);
      const remoteMatch = remoteFiles.find((file) => path.parse(file).name === baseName);
      if (remoteMatch) {
        inputPath = path.join(remoteAssetsDir, remoteMatch);
      }
    }

    // ── 4. Download from remote URL if provided and still not found ──────────
    if (!inputPath) {
      const remoteUrl = req.query.url;

      if (typeof remoteUrl !== "string" || !remoteUrl) {
        return res.status(404).json({
          error: "Source image not found. Provide ?url=<imageUrl> to use a remote source.",
        });
      }

      const urlCheck = isAllowedUrl(remoteUrl);
      if (!urlCheck.ok) {
        return res.status(400).json({ error: urlCheck.reason });
      }

      // Infer extension from URL (fallback to .jpg)
      const urlPathname = new URL(remoteUrl).pathname;
      const remoteExt = path.extname(urlPathname) || ".jpg";
      const destFilename = `${baseName}${remoteExt}`;
      const destPath = path.join(remoteAssetsDir, destFilename);

      await downloadRemoteImage(remoteUrl, destPath);
      inputPath = destPath;
    }

    // ── 5. Convert & cache ───────────────────────────────────────────────────
    await generateWebP(inputPath, outputPath, width, height);

    return res.sendFile(path.basename(outputPath), { root: path.dirname(outputPath) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Image optimisation failed", detail: String(err) });
  }
}
