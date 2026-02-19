import type { Request, Response } from 'express';
import { Router } from "express";
import { addComponent, addPage, createStatic, imageOptimiser } from "../controllers/gardener.controller.js";

const router: Router = Router();
export default router;




router.route("/static/cache/:name").get(imageOptimiser);
router.route("/createstatic").get(createStatic);
router.route('/addcomponent').post(addComponent);
router.route('/addpage').post(addPage);





router.route('/').get((req: Request, res: Response) => res.render('_'));
router.route('/login').get((req: Request, res: Response) => res.render('_login'));

