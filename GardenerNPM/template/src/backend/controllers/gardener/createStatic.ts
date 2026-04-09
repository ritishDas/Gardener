import path from "path";
import fsp from "fs/promises";
import ejs from "ejs";
import { build } from "esbuild";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.resolve(__dirname, "..", "..", "..", "frontend");

async function generateStatic() {
  const viewsDir = path.join(frontendDir, "views");
  const outDir = path.resolve("src/tempfrontend");
  const finalOut = path.resolve("src/frontendStatic");

  await fsp.mkdir(outDir, { recursive: true });
  await fsp.mkdir(finalOut, { recursive: true });

  const entries = await fsp.readdir(viewsDir, { withFileTypes: true });

  const rendered: string[] = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.endsWith(".ejs")) continue;

    const inputPath = path.join(viewsDir, entry.name);
    const outputName = entry.name.replace(/\.ejs$/, ".html");
    const outputPath = path.join(outDir, outputName);

    const html = await ejs.renderFile(
      inputPath,
      {
        fileName: entry.name.slice(0, -4)
      },
      {
        views: [viewsDir],
      }
    );

    await fsp.writeFile(outputPath, html, "utf8");
    rendered.push(outputName);
  }

  const entries3 = await fsp.readdir(outDir, { withFileTypes: true });
  for (const entry of entries3) {
    const parts = entry.name
      .replace(/^_/, "")
      .replace(/\.html$/, "")
      .split("_");

    const targetDir = path.join(finalOut, ...parts);
    const targetFile = path.join(targetDir, "index.html");

    await fsp.mkdir(targetDir, { recursive: true });
    await fsp.copyFile(path.join(outDir, entry.name), targetFile);
  }

  await fsp.rm(outDir, { recursive: true, force: true });

  await fsp.mkdir(path.join(finalOut, "static"), { recursive: true });

  await fsp.cp(
    path.join(frontendDir, "static", 'cache'),
    path.join(finalOut, "static", 'cache'),
    { recursive: true }
  );

  await fsp.cp(
    path.join(frontendDir, "static", 'style.css'),
    path.join(finalOut, "static", 'style.css'),
    { recursive: true }
  );


  await fsp.cp(
    path.join(frontendDir, "static", 'style2.css'),
    path.join(finalOut, "static", 'style2.css'),
    { recursive: true }
  );

  const srcBundleDir = path.join(frontendDir, "bundle");
  const destBundleDir = path.join(finalOut, "static", "bundle");

  try {
    const bundleFiles = await fsp.readdir(srcBundleDir);
    if (bundleFiles.length) {
      await fsp.mkdir(destBundleDir, { recursive: true });

      for (const file of bundleFiles) {
        const srcFile = path.join(srcBundleDir, file);
        const destFile = path.join(destBundleDir, file);

        await build({
          entryPoints: [srcFile],
          bundle: true,
          minify: true,
          format: "esm",
          outfile: destFile,
        });
      }
    }
  } catch (err) {
    const error = err as NodeJS.ErrnoException;
    if (error.code !== "ENOENT") {
      throw err;
    }
  }

  console.log("Static pages generated:", rendered);
  console.log("Output directory:", finalOut);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateStatic().catch((err) => {
    console.error("Static build failed:", err);
    process.exit(1);
  });
}
