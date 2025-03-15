import { Answer } from "./answer";
import { Question } from "./question";

export interface Variant {
  id: string;
  title: string;
  questionId: string;
  question: Question;
  answers: Answer[];
}
