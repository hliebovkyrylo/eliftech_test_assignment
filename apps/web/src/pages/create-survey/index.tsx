import { AuthGuard, MainLayout } from "@/modules/common";
import { CreateSurveyForm } from "@/modules/questionnaire";

export default function CreateSurvey() {
  return (
    <AuthGuard>
      <MainLayout>
        <div className="flex justify-center my-10 w-full min-h-screen">
          <CreateSurveyForm />
        </div>
      </MainLayout>
    </AuthGuard>
  );
}
