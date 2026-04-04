import fsp from "fs/promises";
import path from "path";
import generateWebP from "../../libs/generateWebp.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function imageOptimiser(req, res) {
    try {
        const { name } = req.params;
        if (typeof name !== 'string')
            return res.status(400).json({ success: false, message: "invalid path" });
        // name format: test_500x300.webp
        const match = name.match(/^(.+?)_(\d+)x(\d+)\.webp$/);
        if (!match) {
            return res.status(400).json({ error: "Invalid image format" });
        }
        const [, baseName, widthStr, heightStr] = match;
        if (!widthStr || !heightStr)
            return;
        const width = parseInt(widthStr, 10);
        const height = parseInt(heightStr, 10);
        const cacheDir = path.join(__dirname, "..", "..", "..", "frontend", "static", "cache");
        await fsp.mkdir(cacheDir, { recursive: true });
        const outputPath = path.join(cacheDir, name);
        try {
            await fsp.access(outputPath);
            return res.sendFile(path.basename(outputPath), {
                root: path.dirname(outputPath),
            });
        }
        catch {
            // not cached → continue
        }
        const assetsDir = path.resolve(__dirname, '..', '..', '..', "frontend", "assets");
        const files = await fsp.readdir(assetsDir);
        const sourceFile = files.find((file) => {
            const parsed = path.parse(file);
            return parsed.name === baseName;
        });
        if (!sourceFile) {
            return res.status(404).json({ error: "Source image not found" });
        }
        const inputPath = path.join(assetsDir, sourceFile);
        await generateWebP(inputPath, outputPath, width, height);
        return res.sendFile(path.basename(outputPath), {
            root: path.dirname(outputPath),
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Image optimisation failed" });
    }
}
//# sourceMappingURL=imageOptimiser.js.map