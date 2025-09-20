import z from "zod";
import { ZodValidationError } from "../../../repositories/IErrorRepository";
import { LoginUserUseCase } from "./LoginUser_UseCase";
import { NextFunction, Request, Response } from "express";
import { LoginUserSchema } from "./LoginUserDTO";

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = LoginUserSchema.parse(req.body);

      const token = await this.loginUserUseCase.execute(data);

      res.cookie("accessToken", token.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 15, // 15 minutos
      });

      res.cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      });

      return res.status(200).json({ message: 'Usuário entrou no sistema.' });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodValidationError = new ZodValidationError(err);
        return next(zodValidationError);
      }
      next(err);
    }
  }
}
