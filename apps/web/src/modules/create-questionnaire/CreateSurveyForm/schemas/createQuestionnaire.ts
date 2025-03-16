import { z } from "zod";

export const createQuestionnaireSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  questions: z
    .array(
      z.object({
        title: z.string().min(1),
        type: z.enum(["TEXT", "ONE_CHOICE", "MULTIPLE_CHOICE"]),
        variants: z
          .array(
            z.object({
              title: z.string(),
            })
          )
          .optional()
          .refine((val) => !val || val.length >= 1, {
            message:
              "Variants array must contain at least 1 element if provided",
          }),
      })
    )
    .min(1),
});

export type CreateQuestionnaireInput = z.infer<
  typeof createQuestionnaireSchema
>;
