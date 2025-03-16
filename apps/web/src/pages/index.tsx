import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";
import { SortBy, SortOrder } from "@/lib/types/getQuestionnairesFilters";
import { MainLayout } from "@/modules/common";
import {
  DraggableQuestionnaireCard,
  QuestionnaireFilterPanel,
  useInfiniteScroll,
} from "@/modules/home";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GetQuestionnaires } from "@/lib/types/questionnaire";

export default function Home() {
  const initialFilters = {
    sortBy: SortBy.TITLE,
    sortOrder: SortOrder.ASC,
  };

  const {
    filters,
    setFilters,
    items: questionnaires,
    hasMore,
    isFetching,
    loadMoreRef,
    moveItems,
  } = useInfiniteScroll<GetQuestionnaires>({
    queryKey: endpoints.getAllQuestionnaires(),
    queryFn: (filters) => api.getAllQuestionnaires(filters),
    select: ({ data }) => data.data.questionnaires as GetQuestionnaires[],
    initialFilters,
    pageSize: 12,
  });

  const moveCard = useCallback(
    (fromIndex: number, toIndex: number) => {
      moveItems(fromIndex, toIndex);
    },
    [moveItems]
  );

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: [endpoints.getMe()],
    queryFn: () => api.getMe(),
    select: ({ data }) => data.data,
    retry: false,
  });

  if (isLoadingUser) return <p>Loading...</p>;

  return (
    <DndProvider backend={HTML5Backend}>
      <MainLayout>
        <QuestionnaireFilterPanel filters={filters} setFilters={setFilters} />
        <section className="grid grid-cols-3 max-[613px]:grid-cols-1 gap-4 mt-3">
          {questionnaires.map((questionnaire, index) => (
            <DraggableQuestionnaireCard
              key={questionnaire.id}
              data={questionnaire}
              index={index}
              moveCard={moveCard}
              user={user}
            />
          ))}
        </section>
        {hasMore && (
          <div ref={loadMoreRef} className="h-10">
            {isFetching ? <p>Loading more...</p> : null}
          </div>
        )}
      </MainLayout>
    </DndProvider>
  );
}
