import { Router } from "express";
import userRouter from "../routes/user.router.js"

const pre = "/api";

const indexRouter = Router();

indexRouter.use(`${pre}/users`, userRouter);

export default indexRouter;
