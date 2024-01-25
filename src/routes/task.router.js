import { Router } from "express";
import * as taskController from "../controllers/task.controller.js";

const taskRouter = Router();

taskRouter
  .get("/:idSubject", taskController.getTasksBySubjectIdController)
  .get("/pending/:idUser", taskController.getPendingTasksByUserIdController)
  .get("/fullfiled/:idUser", taskController.getFullFiledTasksByUserIdController)
  .post("/", taskController.createTaskController)
  .put("/:idTask", taskController.updateTaskStateController);

  export default taskRouter