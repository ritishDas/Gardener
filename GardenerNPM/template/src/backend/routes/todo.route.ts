import { Router } from "express";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todo.js";

const router: Router = Router();

router.route("/")
    .get(getTodos)
    .post(addTodo);

router.route("/:id")
    .put(updateTodo)
    .delete(deleteTodo);

export default router;
