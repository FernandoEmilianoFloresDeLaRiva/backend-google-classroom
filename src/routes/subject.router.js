import { Router } from "express";
import * as subjectController from "../controllers/subjects.controller.js";
import { verifyJWT } from "../middlewares/jwt.middleware.js";

const subjectRouter = Router();

subjectRouter
  .get("/:idSubject", verifyJWT, subjectController.getSubjectByIdController)
  .get(
    "/student/:idStudent",
    verifyJWT,
    subjectController.getEnrolledSubjectsController
  )
  .get(
    "/teacher/:idUser",
    verifyJWT,
    subjectController.getCreatedSubjectsController
  )
  .post("/createSubject", verifyJWT, subjectController.createSubjectController)
  .post(
    "/enrolledSubject",
    verifyJWT,
    subjectController.enrolledSubjectController
  );

export default subjectRouter;
