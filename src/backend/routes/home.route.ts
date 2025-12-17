import type { Request, Response } from "express";
import { Router } from "express"

const router: Router = Router();





router.route('/').get((_req: Request, res: Response) => { res.render("home"); })

router.route('/events').get((_req: Request, res: Response) => {
  res.render("events");
})

router.route('/events/:id').get((_req: Request, res: Response) => {
  res.render("event-detail");
})

router.route('/create-event').get((_req: Request, res: Response) => {
  res.render("create-event");
})

router.route('/home').get(async (_req: Request, res: Response) => {
  const data = await fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())

  console.log(data)
  res.render("dashboard", { data: JSON.stringify(data) });
})

export default router;
