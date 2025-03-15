import { SortOrderSelect } from "@/modules/create-questionnaire/CreateSurveyForm/components";
import { SortBySelect } from "./components";
import { QuestionnairesFilters, SortBy, SortOrder } from "@/lib/types/getQuestionnairesFilters";

interface QuestionnaireFilterPanelProps {
  filters: QuestionnairesFilters;
  setFilters: (filters: QuestionnairesFilters) => void;
}

export const QuestionnaireFilterPanel = ({ filters, setFilters }: QuestionnaireFilterPanelProps) => {
  const handleSortByChange = (value: string) => {
    setFilters({ ...filters, sortBy: value as SortBy });
  };
  
  const handleSortOrderChange = (value: string) => {
    setFilters({ ...filters, sortOrder: value as SortOrder });
  };

  return (
    <div className="flex gap-3">
      <SortBySelect value={filters.sortBy} onChange={handleSortByChange} />
      <SortOrderSelect value={filters.sortOrder} onChange={handleSortOrderChange} />
    </div>
  );
};