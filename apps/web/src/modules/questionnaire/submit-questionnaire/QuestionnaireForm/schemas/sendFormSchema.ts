import { z } from "zod";

export const answerSchema = z.object({
  questionId: z.string(),
  textValue: z.string().optional(),
  variantId: z.string().optional(),
});

export const questionnaireSchema = z.object({
  questionnaireId: z.string(),
  durationSec: z.number(),
  answers: z.array(answerSchema).min(1),
});

export type SubmitQuestionnaireType = z.infer<typeof questionnaireSchema>;
