import { Button } from "@/components/button";
import { MultipleQuestion, SingleQuestion, TextQuestion } from "./components";
import { Questionnaire } from "@/lib/types/questionnaire";
import { QuestionType } from "@/lib/types/questionType";
import { useQuestionnaireState } from "./hooks/useQuestionnaireState";
import { useQuestionnaireSubmit } from "./hooks/useQuestionnaireSubmit";

export const QuestionnaireForm = ({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}) => {
  const { answers, startTime, handleChange, clearCookies } =
    useQuestionnaireState(questionnaire.id);
  const { handleSubmit, isPending } = useQuestionnaireSubmit(
    questionnaire,
    answers,
    startTime,
    clearCookies
  );

  return (
    <form
      className="w-full max-w-4xl flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-2">
            {questionnaire.title}
          </h2>
          <p className="text-gray-300 mb-4">{questionnaire.description}</p>
        </div>
      </div>
      {questionnaire.questions.map((question) => {
        switch (question.type) {
          case QuestionType.TEXT:
            return (
              <TextQuestion
                key={question.id}
                questionText={question.title}
                onChange={(value) => handleChange(question.id, value)}
                value={(answers[question.id] as string) || ""}
              />
            );
          case QuestionType.ONE_CHOICE:
            return (
              <SingleQuestion
                key={question.id}
                questionText={question.title}
                variants={question.variants || []}
                onChange={(value) => handleChange(question.id, value)}
                value={(answers[question.id] as string) || ""}
              />
            );
          case QuestionType.MULTIPLE_CHOICE:
            return (
              <MultipleQuestion
                key={question.id}
                questionText={question.title}
                variants={question.variants || []}
                onChange={(values) => handleChange(question.id, values)}
                value={(answers[question.id] as string[]) || []}
              />
            );
          default:
            return null;
        }
      })}
      <Button
        type="submit"
        className="w-24 cursor-pointer"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send"}
      </Button>
    </form>
  );
};
