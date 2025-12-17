import { Router } from "express";
import {
    registerForEvent,
    unregisterFromEvent,
    getEventParticipants,
    getUserEvents
} from "../controllers/participation.controller.js";

const router: Router = Router();

router.route("/api/events/:id/register")
    .post(registerForEvent)
    .delete(unregisterFromEvent);

router.route("/api/events/:id/participants")
    .get(getEventParticipants);

router.route("/api/user/events")
    .get(getUserEvents);

export default router;
