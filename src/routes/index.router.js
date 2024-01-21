import { Router } from "express";
import userRouter from "../routes/user.router.js";

const pre = "/api";

const indexRouter = Router();

indexRouter.use(`${pre}/users`, userRouter);

indexRouter.get(`${pre}`, (req, res) =>
  res.status(200).send("Bienvendo a mi api :)")
);

export default indexRouter;
