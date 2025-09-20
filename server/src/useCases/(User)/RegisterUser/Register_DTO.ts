import { z } from "zod";
import { Role } from "../../../entities/User";

export const registerUserSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  role: z.nativeEnum(Role).optional()
});

export type IRegisterUserDTO = z.infer<typeof registerUserSchema>;
