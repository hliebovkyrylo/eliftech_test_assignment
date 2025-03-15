import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { SortBy } from "@/lib/types/getQuestionnairesFilters";

interface SortBySelectProps {
  value?: SortBy;
  onChange: (value: string) => void;
}

export const SortBySelect = ({ value, onChange }: SortBySelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={SortBy.TITLE}>Title</SelectItem>
        <SelectItem value={SortBy.QUESTION_COUNT}>Question count</SelectItem>
        <SelectItem value={SortBy.COMPLETED_COUNT}>Completed count</SelectItem>
      </SelectContent>
    </Select>
  );
};