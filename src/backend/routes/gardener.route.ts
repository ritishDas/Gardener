import type { Request, Response } from "express";
import { Router } from "express"
import { addComponent, imageOptimiser } from "../controllers/gardener.controller.js";

const router: Router = Router();




router.route('/').get((_req: Request, res: Response) => { res.render("home"); })
router.route("/img/:name/:width/:height").get(imageOptimiser)
router.route('/addcomponent').post(addComponent)


export default router;
