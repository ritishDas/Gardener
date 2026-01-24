import { Router } from "express"
import { addComponent, addPage, createStatic, imageOptimiser } from "../controllers/gardener.controller.js";

const router: Router = Router();
export default router;




router.route("/cache/:name").get(imageOptimiser);
router.route("/createstatic").get(createStatic);
router.route('/addcomponent').post(addComponent);
router.route('/addpage').post(addPage);
router.route('/').get((req, res) => res.render('_'));
router.route("/job").get((req, res) => res.render("_job"));

router.route("/newpage").get((req, res) => res.render("_newpage"))
router.route("/car/page/bonut").get((req, res) => res.render("_car_page_bonut"))

 router.route("/test").get((req, res) => res.render("_test"))
  router.route("/car/page/bonut").get((req, res) => res.render("_car_page_bonut"))
  router.route("/newpage").get((req, res) => res.render("_newpage"))
  router.route("/ne/ca/pa").get((req, res) => res.render("_ne_ca_pa"))
  router.route("/ne/ca/ka").get((req, res) => res.render("_ne_ca_ka"))
 