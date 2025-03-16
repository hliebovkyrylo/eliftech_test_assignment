import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { Questionnaire } from "@/lib/types/questionnaire";
import { QuestionType } from "@/lib/types/questionType";
import { SubmitQuestionnaireType } from "../schemas/sendFormSchema";

export const useQuestionnaireSubmit = (
  questionnaire: Questionnaire,
  answers: { [key: string]: string | string[] },
  startTime: number,
  clearCookies: () => void
) => {
  const mutation = useMutation({
    mutationFn: async (data: SubmitQuestionnaireType) => {
      return await api.submitQuestionnaire(data);
    },
    onSuccess: () => {
      clearCookies();
      window.location.reload();
    },
    onError: () => {
      alert("Failed to submit survey. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const unansweredQuestions = questionnaire.questions.filter(
      (question) => !answers[question.id]
    );

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

        switch (question.type) {
          case QuestionType.TEXT:
            return [{ questionId, textValue: value as string }];
          case QuestionType.ONE_CHOICE:
            return [{ questionId, variantId: value as string }];
          case QuestionType.MULTIPLE_CHOICE:
            return (value as string[]).map((variantId) => ({
              questionId,
              variantId,
            }));
          default:
            return [];
        }
      }
    );

    mutation.mutate({
      questionnaireId: questionnaire.id,
      durationSec,
      answers: formattedAnswers,
    });
  };

  return { handleSubmit, isPending: mutation.isPending };
};
