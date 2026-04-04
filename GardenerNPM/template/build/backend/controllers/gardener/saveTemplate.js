import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, "..", "..", "..", "frontend");
const templateDir = path.join(frontendDir, "template");
export async function saveTemplate(req, res) {
    try {
        const { path: reqPath } = req.body; // ✅ renamed
        const name = reqPath;
        const sourceFile = path.join(frontendDir, 'views', `${name}.ejs`);
        const sourceFileContent = await fsp.readFile(sourceFile, "utf-8");
        const targetFileContent = replaceLastOccurrence(sourceFileContent, `/static/pages/pages.${name}.js`, "");
        // ✅ ensure directory exists
        await fsp.mkdir(templateDir, { recursive: true });
        await fsp.writeFile(path.join(templateDir, `template.${name}.ejs`), targetFileContent, "utf-8");
        return res.json({ message: "Template Saved Successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
function replaceLastOccurrence(content, searchPattern, replacementLine) {
    const lines = content.split("\n");
    for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].includes(searchPattern)) {
            lines[i] = replacementLine; // ✅ replace cleanly
            return lines.join("\n"); // ✅ return result
        }
    }
    console.warn(`Pattern not found: ${searchPattern}`);
    return content; // fallback
}
//# sourceMappingURL=saveTemplate.js.map