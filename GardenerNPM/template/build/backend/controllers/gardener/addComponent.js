import fsp from "fs/promises";
import path from 'path';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '..', '..', '..', 'frontend');
export async function addComponent(req, res) {
    try {
        const { path: filePath, component } = req.body;
        await fsp.mkdir(path.join(frontendDir, 'static', 'components'), { recursive: true });
        await fsp.writeFile(path.join(frontendDir, `${filePath}`), component, "utf8");
        res.json({ success: true });
    }
    catch (err) {
        const error = err;
        res.json({ success: false, msg: error.message });
    }
}
//# sourceMappingURL=addComponent.js.map