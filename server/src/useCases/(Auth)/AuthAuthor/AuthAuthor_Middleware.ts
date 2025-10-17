import { Response, NextFunction } from "express";
import { IAuthAuthor } from "./AuthAuthor_DTO";
import jwt from "jsonwebtoken";
import { Unauthorized } from "../../../repositories/IErrorRepository";
import { Token } from "../../../entities/Token";
import { Role } from "../../../entities/User";
import { ITokenRepository } from "../../../repositories/ITokenRepository";

export class AuthAuthorMiddleware {
  constructor(private tokenRepository: ITokenRepository) {
    this.handle = this.handle.bind(this);
  }
  async handle(req: IAuthAuthor, res: Response, next: NextFunction) {
    try {
      const accessToken = req.cookies["accessToken"];

      if (!accessToken) {
        throw new Unauthorized("Acesso negado. Token não fornecido.");
      }

      const { id, role } = await this.tokenRepository.verifyAccess(accessToken);

      if (role === Role.READER) {
        throw new Unauthorized("Acesso negado. Permissão insuficiente.");
      }

      req.authorId = id;
      next();
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ code: "token.expired", message: "Token expirado" });
      }

      if (err.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ code: "token.invalid", message: "Token inválido" });
      }

      return res
        .status(401)
        .json({ code: "token.missing", message: "Token não fornecido" });
    }
  }
}
