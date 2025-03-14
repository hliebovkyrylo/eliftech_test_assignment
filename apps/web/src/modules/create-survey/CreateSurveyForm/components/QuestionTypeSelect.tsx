import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";

export const QuestionTypeSelect = () => {
  return (
    <Select defaultValue="text">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="text">Text</SelectItem>
        <SelectItem value="single_choice">Single Choice</SelectItem>
        <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
      </SelectContent>
    </Select>
  );
};
