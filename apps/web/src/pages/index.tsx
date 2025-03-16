import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";
import {
  QuestionnairesFilters,
  SortBy,
  SortOrder,
} from "@/lib/types/getQuestionnairesFilters";
import { Loader, MainLayout } from "@/modules/common";
import {
  DraggableQuestionnaireCard,
  QuestionnaireCardSkeleton,
  QuestionnaireFilterPanel,
  QuestionnairesPagination,
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
    page: 1,
    pageSize: 9,
  });

  const [questionnaires, setQuestionnaires] = useState<GetQuestionnaires[]>([]);

  const { data, isLoading: isLoadingQuestionnaires } = useQuery({
    queryKey: [endpoints.getAllQuestionnaires(), filters],
    queryFn: () => api.getAllQuestionnaires(filters),
    select: ({ data }) => ({
      questionnaires: data.data.questionnaires as GetQuestionnaires[],
      total: data.data.total,
    }),
  });
  useEffect(() => {
    if (data) {
      setQuestionnaires(data.questionnaires);
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

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: [endpoints.getMe()],
    queryFn: () => api.getMe(),
    select: ({ data }) => data.data,
    retry: false,
  });

  useEffect(() => {
    if (data?.questionnaires) {
      setQuestionnaires(data.questionnaires);
    }
  }, [data]);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (isLoadingUser) return <Loader />;

  return (
    <DndProvider backend={HTML5Backend}>
      <MainLayout>
        <QuestionnaireFilterPanel filters={filters} setFilters={setFilters} />
        <section className="grid grid-cols-3 max-[613px]:grid-cols-1 gap-4 mt-3 mb-5">
          {!isLoadingQuestionnaires ? (
            questionnaires.map((questionnaire, index) => (
              <DraggableQuestionnaireCard
                key={questionnaire.id}
                data={questionnaire}
                index={index}
                moveCard={moveCard}
                user={user}
              />
            ))
          ) : (
            <>
              {[...Array(9)].map(() => (
                <QuestionnaireCardSkeleton />
              ))}
            </>
          )}
        </section>
        {data?.total && (
          <QuestionnairesPagination
            currentPage={filters.page as number}
            pageSize={filters.pageSize as number}
            totalItems={data.total}
            onPageChange={handlePageChange}
          />
        )}
      </MainLayout>
    </DndProvider>
  );
}
