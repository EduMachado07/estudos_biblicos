import { Request } from "express";
import { Role } from "../../../entities/User";

export interface IAuthAuthor extends Request {
  authorId?: string;
  role?: Role;
  name?: string;
}