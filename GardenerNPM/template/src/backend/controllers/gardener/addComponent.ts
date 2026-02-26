import type { Request, Response } from "express";
import fsp from "fs/promises";

interface AddComponentBody {
  path: string;
  component: string;
}

export async function addComponent(req: Request<{}, {}, AddComponentBody>, res: Response) {
  try {
    const { path: filePath, component } = req.body;

    await fsp.mkdir('./src/frontend/static/components', { recursive: true });

    await fsp.writeFile(`./src/frontend/${filePath}`, component, "utf8");

    res.json({ success: true });
  } catch (err) {
    const error = err as Error;
    res.json({ success: false, msg: error.message });
  }
}
