import { QuestionType } from "@/lib/types/questionType";
import { Result } from "@/lib/types/result";
import {
  ReadOnlyMultipleQuestion,
  ReadOnlySingleQuestion,
  ReadOnlyTextQuestion,
} from "./components";

export const QuestionnaireResultViewer = ({ result }: { result: Result }) => {
  const textAnswers: Record<string, string> = {};
  const singleChoiceAnswers: Record<string, string> = {};
  const multipleChoiceAnswers: Record<string, string[]> = {};

  result.answers.forEach((answer) => {
    if (answer.question.type === QuestionType.TEXT && answer.textValue) {
      textAnswers[answer.questionId] = answer.textValue;
    } else if (
      answer.question.type === QuestionType.ONE_CHOICE &&
      answer.variantId
    ) {
      singleChoiceAnswers[answer.questionId] = answer.variantId;
    } else if (
      answer.question.type === QuestionType.MULTIPLE_CHOICE &&
      answer.variantId
    ) {
      if (!multipleChoiceAnswers[answer.questionId]) {
        multipleChoiceAnswers[answer.questionId] = [];
      }
      multipleChoiceAnswers[answer.questionId].push(answer.variantId);
    }
  });

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6">
      <div className="bg-slate-800 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">
          {result.questionnaire.title}
        </h2>
        <p className="text-gray-300 mb-4">{result.questionnaire.description}</p>
        <div className="text-sm text-gray-400">
          Время заполнения: {Math.floor(result.durationSec / 60)} мин.{" "}
          {result.durationSec % 60} сек.
        </div>
      </div>

      {result.answers.map((answer) => {
        switch (answer.question.type) {
          case QuestionType.TEXT:
            return (
              <ReadOnlyTextQuestion
                key={answer.question.id}
                questionText={answer.question.title}
                answer={textAnswers[answer.question.id] || ""}
              />
            );
          case QuestionType.ONE_CHOICE:
            return (
              <ReadOnlySingleQuestion
                key={answer.id}
                questionText={answer.question.title}
                variants={answer.question.variants}
                selectedVariantId={
                  singleChoiceAnswers[answer.questionId as string]
                }
              />
            );
          case QuestionType.MULTIPLE_CHOICE:
            return (
              <ReadOnlyMultipleQuestion
                key={answer.question.id}
                questionText={answer.question.title}
                variants={answer.question.variants}
                selectedVariantIds={
                  multipleChoiceAnswers[answer.question.id] || []
                }
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
