import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { TrashIcon } from "@heroicons/react/16/solid";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import { CreateQuestionnaireInput } from "../schemas/createQuestionnaire";

interface VariantsFieldArrayProps {
  questionIndex: number;
  control: Control<CreateQuestionnaireInput>;
  register: UseFormRegister<CreateQuestionnaireInput>;
  errors: FieldErrors<CreateQuestionnaireInput>;
}

export const VariantsFieldArray = ({
  questionIndex,
  control,
  register,
  errors,
}: VariantsFieldArrayProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.variants`,
  });

  return (
    <div className="mx-10 my-4">
      <div className="text-white">Variants:</div>
      {fields.map((field, variantIndex) => (
        <div key={field.id} className="flex gap-3 justify-between mt-2">
          <Input
            placeholder="Enter variant"
            {...register(
              `questions.${questionIndex}.variants.${variantIndex}.title`
            )}
          />
          <button
            type="button"
            onClick={() => remove(variantIndex)}
            className="cursor-pointer"
          >
            <TrashIcon className="w-6 h-6 text-white" />
          </button>
          {errors.questions?.[questionIndex]?.variants?.[variantIndex]
            ?.title && (
            <span className="text-red-500 text-sm">
              {
                errors.questions[questionIndex].variants[variantIndex].title
                  .message
              }
            </span>
          )}
        </div>
      ))}
      {errors.questions?.[questionIndex]?.variants && (
        <span className="text-red-500 text-sm">
          {errors.questions[questionIndex].variants.message}
        </span>
      )}
      <Button
        type="button"
        onClick={() => append({ title: "" })}
        className="cursor-pointer mt-2"
      >
        Add new variant
      </Button>
    </div>
  );
};
