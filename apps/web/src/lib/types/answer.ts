import { Question } from "./question";
import { Result } from "./result";
import { Variant } from "./variant";

export interface Answer {
  id: string;
  resultId: string;
  result: Result;
  questionId: string;
  question: Question;
  variantId?: string | null;
  variant?: Variant | null;
  textValue?: string | null;
}
