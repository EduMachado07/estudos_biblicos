import { z } from "zod";
import { Role } from "../../../entities/User";

export const GetStudiesAuthorSchema = z.object({
  authorId: z.string().min(1, "Autor não informado"),
  authorRole: z.nativeEnum(Role),
  authorName: z.string().min(1, "Nome do autor não informado"),
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional()
    .default(0),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional()
    .default(10),
});

export type IGetStudiesAuthorDTO = z.infer<typeof GetStudiesAuthorSchema>;
