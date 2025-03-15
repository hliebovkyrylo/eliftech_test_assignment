import { Question } from "./question";
import { Variant } from "./variant";

export interface Answer {
  id: string;
  resultId: string;
  questionId: string;
  variantId?: string | null;
  variant?: Variant | null;
  textValue?: string | null;
  question: Question;
}
