import { Router } from "express";
import userRouter from "../routes/user.router.js";
import subjectRouter from "./subject.router.js";

const pre = "/api";

const indexRouter = Router();

indexRouter.use(`${pre}/users`, userRouter);
indexRouter.use(`${pre}/subjects`, subjectRouter);

indexRouter.get(`${pre}`, (req, res) =>
  res.status(200).send("Bienvendo a mi api :)")
);

export default indexRouter;
