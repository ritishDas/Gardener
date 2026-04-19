import type { Request, Response } from "express";
import { createComponent } from "../../libs/gardener-services.js";

interface AddComponentBody {
  path: string;
  component: string;
}

export async function addComponent(req: Request<{}, {}, AddComponentBody>, res: Response) {
  try {
    const { path: filePath, component } = req.body;
    await createComponent(filePath, component);
    res.json({ success: true });
  } catch (err) {
    const error = err as Error;
    res.json({ success: false, msg: error.message });
  }
}
