import express, { NextFunction, Request, Response } from "express";
import { registerUserController } from "./useCases/(User)/RegisterUser";
import { loginUserController } from "./useCases/(User)/LoginUser";
import { createStudyController } from "./useCases/(Study)/CreateStudy";
import { upload } from "./providers/MulterConfig";
import {
  getStudyByIdController,
  getStudyController,
} from "./useCases/(Study)/GetStudy";
import { deleteStudyController } from "./useCases/(Study)/DeleteStudy";
import { updateStudyController } from "./useCases/(Study)/UpdateStudy";
import { authAuthorMiddleware } from "./useCases/(Auth)/AuthAuthor";

const router = express.Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  return registerUserController.handle(req, res, next);
});
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  return loginUserController.handle(req, res, next);
});
// get all studies
// ?offset&limit
router.get("/study", (req: Request, res: Response, next: NextFunction) => {
  return getStudyController.handle(req, res, next);
});
router.get("/study/:id", (req: Request, res: Response, next: NextFunction) => {
  return getStudyByIdController.handle(req, res, next);
});

router.post(
  "/study",
  upload.single("thumbnail"),
  authAuthorMiddleware.handle,
  (req: Request, res: Response, next: NextFunction) => {
    return createStudyController.handle(req, res, next);
  }
);
router.delete(
  "/study/:id",
  authAuthorMiddleware.handle,
  (req: Request, res: Response, next: NextFunction) => {
    return deleteStudyController.handle(req, res, next);
  }
);
router.patch(
  "/study/:id",
  upload.single("thumbnail"),
  authAuthorMiddleware.handle,
  (req: Request, res: Response, next: NextFunction) => {
    return updateStudyController.handle(req, res, next);
  }
);

export { router };
