import { Router } from "express";
import {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} from "../controllers/event.controller.js";

const router: Router = Router();

router.route("/api/events")
    .get(getAllEvents)
    .post(createEvent);

router.route("/api/events/:id")
    .get(getEventById)
    .put(updateEvent)
    .delete(deleteEvent);

export default router;
