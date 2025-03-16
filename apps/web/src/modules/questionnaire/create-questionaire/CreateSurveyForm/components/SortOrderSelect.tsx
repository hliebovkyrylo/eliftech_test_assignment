import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { SortOrder } from "@/lib/types/getQuestionnairesFilters";

interface SortOrderSelectProps {
  value?: SortOrder;
  onChange: (value: string) => void;
}

export const SortOrderSelect = ({ value, onChange }: SortOrderSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort order" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={SortOrder.ASC}>From low to high values</SelectItem>
        <SelectItem value={SortOrder.DESC}>From high to low values</SelectItem>
      </SelectContent>
    </Select>
  );
};