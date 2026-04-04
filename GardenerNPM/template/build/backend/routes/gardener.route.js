import { Router } from "express";
import { addComponent, addPage, createStatic, imageOptimiser, saveTemplate } from "../controllers/gardener/index.js";
const router = Router();
export default router;
router.route("/static/cache/:name").get(imageOptimiser);
if (process.env.NODE_ENV !== 'production') {
    router.route("/createstatic").get(createStatic);
    router.route('/addcomponent').post(addComponent);
    router.route('/addpage').post(addPage);
    router.route('/savetemplate').post(saveTemplate);
}
router.route('/').get((req, res) => res.render('_', { fileName: '_' }));
//# sourceMappingURL=gardener.route.js.map