import { Questionnaire } from "./questionnaire";
import { Result } from "./result";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  results: Result[];
  questionnaires: Questionnaire[];
}
