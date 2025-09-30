import * as z from "zod";

export const SchemaCreateStudies = z.object({
  title: z.string().min(1, { message: "" }).max(100, { message: "" }).trim(),
  description: z.string().min(1, { message: "" }).max(100, { message: "" }).trim(),
});
