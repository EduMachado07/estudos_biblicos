import { z } from "zod";

export const SchemaCreateStudies = z.object({
  thumbnail: z
    .any()
    .refine((file) => file instanceof File, "Selecione uma imagem válida."),
  title: z
    .string()
    .min(3, { message: "O título deve ter pelo menos 3 caracteres." })
    .max(100, { message: "O título deve ter no máximo 100 caracteres." })
    .trim(),
  description: z
    .string()
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres." })
    .max(500, { message: "A descrição deve ter no máximo 500 caracteres." })
    .trim(),
  body: z
    .string()
    .min(10, { message: "O corpo do estudo deve conter pelo menos 10 caracteres." }),
  tag: z.string().min(1, { message: "Selecione uma tag." }),
});

export type SchemaCreateStudiesType = z.infer<typeof SchemaCreateStudies>;
