import type { Request, Response } from "express";
import { createPage } from "../../libs/gardener-services.js";

export async function addPage(req: Request, res: Response) {
  try {
    const pagename: string = req.body.page;
    await createPage(pagename);
    res.json({ success: true });
  } catch (err) {
    const error = err as Error;
    res.json({ success: false, msg: error.message });
  }
}
