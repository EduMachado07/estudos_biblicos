import { Request } from "express";

export interface IAuthAuthor extends Request {
  authorId?: string;
}