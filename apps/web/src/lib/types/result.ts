import { Answer } from "./answer";
import { Questionnaire } from "./questionnaire";
import { Variant } from "./variant";

export interface Result {
  id: string;
  userId: string;
  durationSec: number;
  questionnaireId: string;
  answers: Answer[];
  questionnaire: Questionnaire;
  variant?: Variant | null;
  variantId?: string;
}
