import { z } from "zod";

export const createQuestionnaireSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  questions: z
    .array(
      z.object({
        title: z.string().min(1, "Question title is required"),
        type: z.enum(["TEXT", "ONE_CHOICE", "MULTIPLE_CHOICE"]),
        variants: z.array(
          z
            .object({
              title: z.string().min(1, "Variant title is required"),
            })
            .optional()
        ),
      })
    )
    .min(1, "At least one question is required"),
});

export type CreateQuestionnaireInput = z.infer<
  typeof createQuestionnaireSchema
>;
