import { Button } from "@/components/button";
import { MultipleQuestion, SingleQuestion, TextQuestion } from "./components";
import { Questionnaire } from "@/lib/types/questionnaire";
import { QuestionType } from "@/lib/types/questionType";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { SubmitQuestionnaireType } from "./schemas/sendFormSchema";

export const QuestionnaireForm = ({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}) => {
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    {}
  );
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const mutation = useMutation({
    mutationFn: async (data: SubmitQuestionnaireType) => {
      return await api.submitQuestionnaire(data);
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: () => {
      alert("Failed to submit survey. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const unansweredQuestions = questionnaire.questions.filter((question) => {
      return !answers[question.id];
    });

    if (unansweredQuestions.length > 0) {
      const firstUnanswered = unansweredQuestions[0];
      alert(
        `You must select an option for the question: ${firstUnanswered.title}`
      );
      return;
    }

    const durationSec = Math.round((Date.now() - startTime) / 1000);

    const formattedAnswers = Object.entries(answers).flatMap(
      ([questionId, value]): Array<{
        questionId: string;
        textValue?: string;
        variantId?: string;
      }> => {
        const question = questionnaire.questions.find(
          (q) => q.id === questionId
        );

        if (!question) return [];

        if (question.type === QuestionType.TEXT) {
          return [
            {
              questionId,
              textValue: value as string,
            },
          ];
        } else if (question.type === QuestionType.ONE_CHOICE) {
          return [
            {
              questionId,
              variantId: value as string,
            },
          ];
        } else if (question.type === QuestionType.MULTIPLE_CHOICE) {
          return (value as string[]).map((variantId) => ({
            questionId,
            variantId,
          }));
        }

        return [];
      }
    );

    mutation.mutate({
      questionnaireId: questionnaire.id,
      durationSec,
      answers: formattedAnswers,
    });
  };

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
                onChange={(value) => handleChange(question.id, value)}
                key={question.id}
                questionText={question.title}
              />
            );
          case QuestionType.ONE_CHOICE:
            return (
              <SingleQuestion
                key={question.id}
                questionText={question.title}
                variants={question.variants || []}
                onChange={(value) => handleChange(question.id, value)}
              />
            );
          case QuestionType.MULTIPLE_CHOICE:
            return (
              <MultipleQuestion
                key={question.id}
                questionText={question.title}
                variants={question.variants || []}
                onChange={(values) => handleChange(question.id, values)}
              />
            );
          default:
            return null;
        }
      })}
      <Button
        type="submit"
        className="w-24 cursor-pointer"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Sending..." : "Send"}
      </Button>
    </form>
  );
};
