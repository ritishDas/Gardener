import path from "path";
import fsp from "fs/promises";
import ejs from "ejs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '..', '..', '..', 'frontend');
export async function createStatic(req, res) {
    try {
        const viewsDir = path.join(frontendDir, "views");
        const outDir = path.resolve("src/tempfrontend");
        const finalOut = path.resolve("src/frontendStatic");
        await fsp.mkdir(outDir, { recursive: true });
        await fsp.mkdir(finalOut, { recursive: true });
        const entries = await fsp.readdir(viewsDir, { withFileTypes: true });
        const rendered = [];
        for (const entry of entries) {
            // skip folders (partials, layouts, etc.)
            if (!entry.isFile())
                continue;
            if (!entry.name.endsWith(".ejs"))
                continue;
            const inputPath = path.join(viewsDir, entry.name);
            const outputName = entry.name.replace(/\.ejs$/, ".html");
            const outputPath = path.join(outDir, outputName);
            const html = await ejs.renderFile(inputPath, {}, {
                // async: true,
                views: [viewsDir], // needed for includes
            });
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
        await fsp.cp(path.join(frontendDir, "static"), path.join(finalOut, 'static'), { recursive: true });
        return res.json({
            success: true,
            generated: rendered,
            outDir,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Static build failed" });
    }
}
//# sourceMappingURL=createStatic.js.map