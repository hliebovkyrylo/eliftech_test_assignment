import { MainLayout } from "@/modules/common";
import { CreateSurveyForm } from "@/modules/create-questionnaire";

export default function CreateSurvey() {
  return (
    <MainLayout>
      <div className="flex justify-center my-10 w-full min-h-screen">
        <CreateSurveyForm />
      </div>
    </MainLayout>
  );
}
