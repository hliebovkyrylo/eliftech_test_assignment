import { Answer } from "./answer";
import { Questionnaire } from "./questionnaire";
import { QuestionType } from "./questionType";
import { Variant } from "./variant";

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  questionnaireId: string;
  questionnaire: Questionnaire;
  variants: Variant[];
  answers: Answer[];
}
