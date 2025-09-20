import { z } from "zod";

export const UpdateStudySchema = z.object({
  authorId: z.string().min(1, "Autor não informado"),
  studyId: z.string().min(1, "Estudo não informado"),
  title: z.string().min(1, "Título não informado").optional(),
  description: z.string().min(1, "Descrição não informada").optional(),
  body: z.any().optional(),
});

export type IUpdateStudyDTO = z.infer<typeof UpdateStudySchema>;
