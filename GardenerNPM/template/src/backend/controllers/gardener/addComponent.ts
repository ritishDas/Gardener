import type { Request, Response } from "express";
import fsp from "fs/promises";
import path from 'path';

interface AddComponentBody {
  path: string;
  component: string;
}

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.resolve(__dirname, '..', '..', '..', 'frontend');

export async function addComponent(req: Request<{}, {}, AddComponentBody>, res: Response) {
  try {
    const { path: filePath, component } = req.body;
    await fsp.mkdir(path.join(frontendDir, 'static', 'components'), { recursive: true });
    await fsp.writeFile(path.join(frontendDir, `${filePath}`), component, "utf8");
    res.json({ success: true });

  } catch (err) {
    const error = err as Error;
    res.json({ success: false, msg: error.message });
  }
}
