import { Router } from "express"
import { addComponent, addPage, imageOptimiser } from "../controllers/gardener.controller.js";

const router: Router = Router();
export default router;




router.route("/img/:name/:width/:height").get(imageOptimiser)
router.route('/addcomponent').post(addComponent)
router.route('/addpage').post(addPage)
router.route('/').get((req, res) => res.render('home'))
 router.route("/job").get((req, res) => res.render("_job"))
 