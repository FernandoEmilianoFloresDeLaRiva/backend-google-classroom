import { Router } from "express";
import * as taskController from "../controllers/task.controller.js";

const taskRouter = Router();

taskRouter
.get("/task/:taskId", taskController.getTaskController)
  .get("/:idSubject", taskController.getTasksBySubjectIdController)
  .get("/pending/:idUser", taskController.getPendingTasksByUserIdController)
  .get(
    "/pending/count/:idUser",
    taskController.getCountPendingTasksByUserIdController
  )
  .get("/fullfiled/:idUser", taskController.getFullFiledTasksByUserIdController)
  .get("/invalid/task/:idUser", taskController.getInvalidTaskByUserIdController)
  .post("/", taskController.createTaskController)
  .put("/:idTask", taskController.updateTaskStateController);

export default taskRouter;
