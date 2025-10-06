import { z } from "zod";

export const SchemaLoginUser = z.object({
    email: z.string().email({message: "Endereço de email inválido"}),
    password: z.string().min(1, {message: "Informe a senha"})
})

export type SchemaLoginUserType = z.infer<typeof SchemaLoginUser>