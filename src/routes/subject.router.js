import { Router } from "express";
import * as subjectController from "../controllers/subjects.controller.js";

const subjectRouter = Router();

subjectRouter
  .get("/:idSubject", subjectController.getSubjectByIdController)
  .get("/student/:idStudent", subjectController.getEnrolledSubjectsController)
  .post("/createSubject", subjectController.createSubjectController)
  .post("/enrolledSubject", subjectController.enrolledSubjectController);

export default subjectRouter;
