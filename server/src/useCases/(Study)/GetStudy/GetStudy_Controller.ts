import z from "zod";
import { ZodValidationError } from "../../../repositories/IErrorRepository";
import { NextFunction, Request, Response } from "express";
import { GetStudyByIdUseCase, GetStudyUseCase } from "./GetStudy_UseCase";
import { getStudiesSchema } from "./GetStudy_DTO";

export class GetStudyController {
  constructor(private getStudyUseCase: GetStudyUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = getStudiesSchema.parse(req.query);

      const studies = await this.getStudyUseCase.execute(data);

      return res
        .status(200)
        .json({ message: "Estudos retornados com sucesso.", studies });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodValidationError = new ZodValidationError(err);
        return next(zodValidationError);
      }
      next(err);
    }
  }
}
export class GetStudyByIdController {
  constructor(private getStudyByIdUseCase: GetStudyByIdUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.params.id;

      const study = await this.getStudyByIdUseCase.execute(data);

      return res
        .status(200)
        .json({ message: "Estudo retornado com sucesso.", study });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodValidationError = new ZodValidationError(err);
        return next(zodValidationError);
      }
      next(err);
    }
  }
}
