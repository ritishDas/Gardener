import type { Request, Response } from "express";
import fs, { readFile, readFileSync } from "fs";
import path from "path";
import ejs from "ejs";
import fsp from "fs/promises";
import generateWebP from "../libs/generateWebp.js";
import { fileURLToPath } from "url";
const availableCache: Record<string, boolean> = {};


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface AddComponentBody {
  path: string;
  component: string;
}

export function addComponent(req: Request<{}, {}, AddComponentBody>, res: Response) {
  try {
    const { path: filePath, component } = req.body;

    fs.writeFileSync(`./src/frontend/${filePath}`, component, "utf8");

    res.json({ success: true });
  } catch (err) {
    const error = err as Error;
    res.json({ success: false, msg: error.message });
  }
}


export async function imageOptimiser(req: Request, res: Response) {
  try {
    const { name } = req.params;

    if (typeof name !== 'string') return;
    // name format: test_500x300.webp
    const match = name.match(/^(.+?)_(\d+)x(\d+)\.webp$/);

    if (!match) {
      return res.status(400).json({ error: "Invalid image format" });
    }

    const [, baseName, widthStr, heightStr] = match;

    if (!widthStr || !heightStr) return;
    const width = parseInt(widthStr, 10);
    const height = parseInt(heightStr, 10);

    const cacheDir = path.join(__dirname, "../../frontend/static/cache");
    await fsp.mkdir(cacheDir, { recursive: true });

    const outputPath = path.join(cacheDir, name);

    // 1️⃣ Return cached file if exists
    try {
      await fsp.access(outputPath);
      return res.sendFile(path.basename(outputPath), {
        root: path.dirname(outputPath),
      });
    } catch {
      // not cached → continue
    }

    // 2️⃣ Find source image with same base name
    const assetsDir = path.resolve("./src/frontend/assets");
    const files = await fsp.readdir(assetsDir);

    const sourceFile = files.find((file) => {
      const parsed = path.parse(file);
      return parsed.name === baseName;
    });

    if (!sourceFile) {
      return res.status(404).json({ error: "Source image not found" });
    }

    const inputPath = path.join(assetsDir, sourceFile);

    // 3️⃣ Generate optimized WebP
    await generateWebP(inputPath, outputPath, width, height);

    // 4️⃣ Return generated file
    return res.sendFile(path.basename(outputPath), {
      root: path.dirname(outputPath),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Image optimisation failed" });
  }
}

export async function addPage(req: Request, res: Response) {
  try {
    const pagename: string = req.body.page;
    const buffer = readFileSync('./src/frontend/frontendtemplate.ejs', 'utf8');
    const name = pagename.replaceAll('/', '_');

    fs.writeFileSync(`./src/frontend/views/${name}.ejs`, buffer, "utf8");

    fs.appendFileSync('./src/backend/routes/gardener.route.ts', ` router.route("${pagename}").get((req: Request, res: Response) => res.render("${name}"))\n `);

    res.json({ success: true });
  }
  catch (err) {
    const error = err as Error;
    res.json({ success: false, msg: error.message });
  }

}


export async function createStatic(req: Request, res: Response) {
  try {
    const viewsDir = path.resolve("src/frontend/views");
    const outDir = path.resolve("src/tempfrontend");
    const finalOut = path.resolve("src/frontendStatic");

    await fsp.mkdir(outDir, { recursive: true });
    await fsp.mkdir(finalOut, { recursive: true });

    const entries = await fsp.readdir(viewsDir, { withFileTypes: true });

    const rendered: string[] = [];


    for (const entry of entries) {
      // skip folders (partials, layouts, etc.)
      if (!entry.isFile()) continue;
      if (!entry.name.endsWith(".ejs")) continue;

      const inputPath = path.join(viewsDir, entry.name);
      const outputName = entry.name.replace(/\.ejs$/, ".html");
      const outputPath = path.join(outDir, outputName);

      const html = await ejs.renderFile(
        inputPath,
        {
        },
        {
          // async: true,
          views: [viewsDir], // needed for includes
        }
      );

      await fsp.writeFile(outputPath, html, "utf8");
      rendered.push(outputName);
    }

    const entries3 = await fsp.readdir(outDir, { withFileTypes: true });
    for (const entry of entries3) {

      // "_path1_path2_path3.html" -> ["path1", "path2", "path3"]
      const parts = entry.name
        .replace(/^_/, "")
        .replace(/\.html$/, "")
        .split("_");

      const targetDir = path.join(finalOut, ...parts);
      const targetFile = path.join(targetDir, "index.html");

      // ensure directories exist
      await fsp.mkdir(targetDir, { recursive: true });
      console.log('done');
      // copy file
      await fsp.copyFile(path.join(outDir, entry.name), targetFile);

    }
    await fsp.rm(outDir, { recursive: true, force: true });
    await fsp.cp(
      path.resolve("src/frontend/static"),
      path.join(finalOut, 'static'),
      { recursive: true }
    );

    return res.json({
      success: true,
      generated: rendered,
      outDir,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Static build failed" });
  }
}

