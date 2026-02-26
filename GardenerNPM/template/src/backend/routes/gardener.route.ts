import type { Request, Response } from 'express';
import { Router } from "express";
import { addComponent, addPage, createStatic, imageOptimiser } from "../controllers/gardener/index.js";

const router: Router = Router();
export default router;




router.route("/static/cache/:name").get(imageOptimiser);
router.route("/createstatic").get(createStatic);
router.route('/addcomponent').post(addComponent);
router.route('/addpage').post(addPage);





router.route('/').get((req: Request, res: Response) => res.render('_'));
router.route('/login').get((req: Request, res: Response) => res.render('_login'));

 router.route("/test").get((req: Request, res: Response) => res.render("_test"))
 
router.route("/rd").get((req: Request, res: Response) => res.render("_rd"));

router.route("/car").get((req: Request, res: Response) => res.render("_car"));

router.route("/onemore").get((req: Request, res: Response) => res.render("_onemore"));
