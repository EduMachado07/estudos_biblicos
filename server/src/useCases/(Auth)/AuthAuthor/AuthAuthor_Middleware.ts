import { Response, NextFunction } from "express";
import { IAuthAuthor } from "./AuthAuthor_DTO";
import jwt from "jsonwebtoken";
import { Unauthorized } from "../../../repositories/IErrorRepository";
import { Token } from "../../../entities/Token";
import { Role } from "../../../entities/User";

export class AuthAuthorMiddleware {
  async handle(req: IAuthAuthor, res: Response, next: NextFunction) {
    try {
      const accessToken = req.cookies["accessToken"];

      if (!accessToken) {
        throw new Unauthorized("Acesso negado. Token não fornecido.");
      }

      const payload = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET
      ) as Token;

      if (payload.role !== Role.AUTHOR) {
        throw new Unauthorized("Acesso negado. Permissão insuficiente.");
      }

      req.authorId = payload.id;
      next();
    } catch (err) {
      next(err);
    }
  }
}
