import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Control, Controller, FieldValues } from "react-hook-form";
import { CreateQuestionnaireInput } from "../schemas/createQuestionnaire";

interface QuestionTypeSelectProps {
  control: Control<CreateQuestionnaireInput>;
  name: any;
}

export const QuestionTypeSelect = ({
  control,
  name,
}: QuestionTypeSelectProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value || "TEXT"}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select question type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TEXT">Text</SelectItem>
            <SelectItem value="ONE_CHOICE">Single Choice</SelectItem>
            <SelectItem value="MULTIPLE_CHOICE">Multiple Choice</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
  );
};
