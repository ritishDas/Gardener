import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import fsp from "fs/promises";
import generateWebP from "../libs/generateWebp.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const availableCache: Record<string, boolean> = {};

interface AddComponentBody {
  path: string;
  component: string;
}

export function addComponent(req: Request<{}, {}, AddComponentBody>, res: Response) {
  try {
    const { path: filePath, component } = req.body;

    const filecontent = `export default function(){
  return (${component})
}`;

    fs.writeFileSync(path.join(__dirname, '../../src/frontend', filePath), filecontent, "utf8");

    res.json({ success: true });
  } catch (err) {
    const error = err as Error;
    res.json({ success: false, msg: error.message });
  }
}

export async function imageOptimiser(req: Request, res: Response) {
  try {
    const { name } = req.params;
    if (!name) return;
    const width = Number(req.params.width);
    const height = Number(req.params.height);

    if (!Number.isInteger(width) || !Number.isInteger(height)) {
      return res.status(400).json({ error: "Invalid width or height" });
    }

    const inputPath = path.join(__dirname, '../../src/frontend/assets', name);

    const cacheKey = `${name}_${width}x${height}`;
    const cacheDir = path.join(__dirname, "../../.cache");

    const outputPath = path.join(
      cacheDir,
      `${path.parse(name).name}_${width}x${height}.webp`
    );

    // If cached → serve
    try {
      await fsp.access(outputPath);
      return res.sendFile(path.basename(outputPath), {
        root: path.dirname(outputPath),
      });
    } catch {
      // not cached
    }

    // Ensure input exists
    await fsp.access(inputPath);

    await generateWebP(inputPath, outputPath, width, height);

    availableCache[cacheKey] = true;

    return res.sendFile(path.basename(outputPath), {
      root: path.dirname(outputPath),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image processing failed" });
  }
}

