import { Question } from "./question";
import { Result } from "./result";
import { User } from "./user";

export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  results: Result[];
  userId: string;
  user: User;
}

export interface GetQuestionnaires {
  id: string;
  title: string;
  description: string;
  userId: string;
  _count: {
    questions: number;
    results: number;
  };
}
