import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";
import {
  QuestionnairesFilters,
  SortBy,
  SortOrder,
} from "@/lib/types/getQuestionnairesFilters";
import { MainLayout } from "@/modules/common";
import {
  DraggableQuestionnaireCard,
  QuestionnaireFilterPanel,
} from "@/modules/home";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GetQuestionnaires } from "@/lib/types/questionnaire";

export default function Home() {
  const [filters, setFilters] = useState<QuestionnairesFilters>({
    sortBy: SortBy.TITLE,
    sortOrder: SortOrder.ASC,
  });

  const [questionnaires, setQuestionnaires] = useState<GetQuestionnaires[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: [endpoints.getAllQuestionnaires(), filters],
    queryFn: () => api.getAllQuestionnaires(filters),
    select: ({ data }) => data.data.questionnaires as GetQuestionnaires[],
  });
  useEffect(() => {
    if (data) {
      setQuestionnaires(data);
    }
  }, [data]);

  const moveCard = useCallback((fromIndex: number, toIndex: number) => {
    setQuestionnaires((prev) => {
      const newOrder = [...prev];
      const [movedItem] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, movedItem);
      return newOrder;
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <DndProvider backend={HTML5Backend}>
      <MainLayout>
        <QuestionnaireFilterPanel filters={filters} setFilters={setFilters} />
        <section className="grid grid-cols-3 gap-4 mt-3">
          {questionnaires.map((questionnaire, index) => (
            <DraggableQuestionnaireCard
              key={questionnaire.id}
              data={questionnaire}
              index={index}
              moveCard={moveCard}
            />
          ))}
        </section>
      </MainLayout>
    </DndProvider>
  );
}
