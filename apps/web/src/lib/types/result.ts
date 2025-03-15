import { Answer } from "./answer";
import { Questionnaire } from "./questionnaire";
import { User } from "./user";

export interface Result {
  id: string;
  userId: string;
  user: User;
  durationSec: number;
  questionnaireId: string;
  questionnaire: Questionnaire;
  answers: Answer[];
}
