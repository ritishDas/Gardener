import type { Request, Response } from 'express';
import { Router } from "express";
import { addComponent, addPage, createStatic, imageOptimiser, saveTemplate } from "../controllers/gardener/index.js";

const router: Router = Router();
export default router;




router.route("/static/cache/:name").get(imageOptimiser);

if (process.env.NODE_ENV !== 'production') {
  router.route("/createstatic").get(createStatic);
  router.route('/addcomponent').post(addComponent);
  router.route('/addpage').post(addPage);
  router.route('/savetemplate').post(saveTemplate);
}





router.route('/').get((req: Request, res: Response) => res.render('_', { fileName: '_' }));
router.route("/new").get((req: Request, res: Response) => res.render("_new",{fileName:"_new"}));
router.route("/new").get((req: Request, res: Response) => res.render("_new",{fileName:"_new"}));
router.route("/about").get((req: Request, res: Response) => res.render("_about",{fileName:"_about"}));
router.route("/ritish").get((req: Request, res: Response) => res.render("_ritish",{fileName:"_ritish"}));
router.route("/kartik").get((req: Request, res: Response) => res.render("_kartik",{fileName:"_kartik"}));
