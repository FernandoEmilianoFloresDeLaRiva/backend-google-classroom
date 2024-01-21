import { Router } from "express";
import * as userController from "../controllers/users.controller.js";

const userRouter = Router();

userRouter
  .get("/", userController.getAllUserController)
  .post("/", userController.getUserByEmailController)
  .post("/register", userController.createUserController)
  .post("/login", userController.loginUserController);

export default userRouter;
