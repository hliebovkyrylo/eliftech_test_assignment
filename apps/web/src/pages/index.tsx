import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";
import {
  QuestionnairesFilters,
  SortBy,
  SortOrder,
} from "@/lib/types/getQuestionnairesFilters";
import { MainLayout } from "@/modules/common";
import { QuestionnaireCard, QuestionnaireFilterPanel } from "@/modules/home";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [filters, setFilters] = useState<QuestionnairesFilters>({
    sortBy: SortBy.TITLE,
    sortOrder: SortOrder.ASC,
  });

  const { data = [], isLoading } = useQuery({
    queryKey: [endpoints.getAllQuestionnaires(), filters],
    queryFn: () => api.getAllQuestionnaires(filters),
    select: ({ data }) => data.data.questionnaires,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <MainLayout>
      <QuestionnaireFilterPanel filters={filters} setFilters={setFilters} />
      <section className="grid grid-cols-3 gap-4 mt-3">
        {data.map((questionnaire, index) => (
          <QuestionnaireCard data={questionnaire} key={index} />
        ))}
      </section>
    </MainLayout>
  );
}
