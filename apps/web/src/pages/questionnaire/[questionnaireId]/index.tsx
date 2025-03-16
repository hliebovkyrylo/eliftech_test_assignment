import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";
import { Questionnaire as QuestionnaireType } from "@/lib/types/questionnaire";
import { Result } from "@/lib/types/result";
import { AuthGuard, MainLayout } from "@/modules/common";
import {
  QuestionnaireForm,
  QuestionnaireResultViewer,
} from "@/modules/questionnaire";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Questionnaire() {
  const router = useRouter();
  const { questionnaireId } = router.query;

  const {
    data: isSubmittedQuestionnaire,
    isLoading: isSubmittedQuestionnaireLoading,
  } = useQuery({
    queryKey: [endpoints.isSubmittedQuestionnaire(questionnaireId as string)],
    queryFn: () => api.isSubmittedQuestionnaire(questionnaireId as string),
    select: ({ data }) => data.data,
    retry: false,
  });

  const { data: questionnaire, isLoading: questionnaireLoading } = useQuery({
    queryKey: [endpoints.getQuestionnaire(questionnaireId as string)],
    queryFn: () => api.getQuestionnaire(questionnaireId as string),
    select: ({ data }) => data.data,
  });

  const { data: questionnaireResult, isLoading: questionnaireResultLoading } =
    useQuery({
      queryKey: [endpoints.getQuestionnaireResult(questionnaireId as string)],
      queryFn: () => api.getQuestionnaireResult(questionnaireId as string),
      select: ({ data }) => data.data,
      retry: false,
    });

  if (
    isSubmittedQuestionnaireLoading ||
    questionnaireLoading ||
    questionnaireResultLoading
  )
    return <div>Loading...</div>;

  return (
    <AuthGuard>
      <MainLayout>
        <div className="flex justify-center">
          {isSubmittedQuestionnaire?.isSubmitted ? (
            <QuestionnaireResultViewer result={questionnaireResult as Result} />
          ) : (
            <QuestionnaireForm
              questionnaire={questionnaire as QuestionnaireType}
            />
          )}
        </div>
      </MainLayout>
    </AuthGuard>
  );
}
