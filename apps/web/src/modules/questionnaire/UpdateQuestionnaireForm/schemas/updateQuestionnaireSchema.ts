import { z } from "zod";

export const updateQuestionnaireSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"),
});

export type UpdateQuestionnaireInput = z.infer<
  typeof updateQuestionnaireSchema
>;
