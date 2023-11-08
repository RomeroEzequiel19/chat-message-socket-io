import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index");
});

export { indexRouter };
