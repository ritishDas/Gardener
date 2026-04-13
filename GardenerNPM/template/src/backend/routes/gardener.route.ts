import type { Request, Response } from 'express';
import { Router } from "express";
import { addComponent, addPage, imageOptimiser, saveTemplate, hotReloadHandler } from "../controllers/gardener/index.js";

const router: Router = Router();
export default router;




router.route("/static/cache/:name").get(imageOptimiser);

if (process.env.NODE_ENV !== 'production') {
  router.route('/addcomponent').post(addComponent);
  router.route('/addpage').post(addPage);
  router.route('/savetemplate').post(saveTemplate);
  router.route('/__gardener/hot-reload').get(hotReloadHandler);
}





router.route('/').get((req: Request, res: Response) => res.render('_', { fileName: '_' }));
