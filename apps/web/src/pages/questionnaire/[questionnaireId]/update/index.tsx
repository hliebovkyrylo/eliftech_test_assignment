import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";
import { Questionnaire } from "@/lib/types/questionnaire";
import { AuthGuard, Loader, MainLayout } from "@/modules/common";
import { UpdateQuestionnaireForm } from "@/modules/questionnaire";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function UpdateQuestionnaire() {
  const router = useRouter();
  const { questionnaireId } = router.query;

  const { data: questionnaire, isLoading: questionnaireLoading } = useQuery({
    queryKey: [endpoints.getQuestionnaire(questionnaireId as string)],
    queryFn: () => api.getQuestionnaire(questionnaireId as string),
    select: ({ data }) => data.data,
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: [endpoints.getMe()],
    queryFn: () => api.getMe(),
    select: ({ data }) => data.data,
  });

  if (questionnaireLoading || userLoading) return <Loader />;

  if (user?.id !== questionnaire?.userId) router.replace("/");

  return (
    <AuthGuard>
      <MainLayout>
        <div className="flex w-full flex-col items-center">
          <UpdateQuestionnaireForm data={questionnaire as Questionnaire} />
        </div>
      </MainLayout>
    </AuthGuard>
  );
}
