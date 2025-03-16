import { Input } from "@/components/input";
import { QuestionTypeSelect } from "./components/QuestionTypeSelect";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Button } from "@/components/button";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CreateQuestionnaireInput,
  createQuestionnaireSchema,
} from "./schemas/createQuestionnaire";
import { zodResolver } from "@hookform/resolvers/zod";
import { VariantsFieldArray } from "./components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { useRouter } from "next/router";
import { endpoints } from "@/lib/api/endpoints";

export const CreateSurveyForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateQuestionnaireInput>({
    resolver: zodResolver(createQuestionnaireSchema),
    defaultValues: {
      title: "",
      description: "",
      questions: [{ title: "", type: "TEXT", variants: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const watchQuestions = watch("questions");

  const mutation = useMutation({
    mutationFn: async (data: CreateQuestionnaireInput) => {
      const response = await api.createQuestionnaire(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [endpoints.getAllQuestionnaires()],
      });
      router.push("/");
    },
  });

  const onSubmit = handleSubmit((data: CreateQuestionnaireInput) => {
    mutation.mutate(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 max-w-[700px] w-full h-full"
    >
      <label className="text-white">NAME</label>
      <Input {...register("title")} placeholder="Name of the questionnaire" />
      {errors.title && (
        <span className="text-red-500 text-sm">{errors.title.message}</span>
      )}

      <label className="text-white">DESCRIPTION</label>
      <Input {...register("description")} placeholder="Enter description" />
      {errors.description && (
        <span className="text-red-500 text-sm">
          {errors.description.message}
        </span>
      )}

      <label className="text-white">QUESTIONS</label>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div className="flex gap-3 justify-between items-center">
            <div className="text-white">{index + 1}</div>
            <Input
              {...register(`questions.${index}.title`)}
              placeholder="Enter question"
            />
            {errors.questions?.[index]?.title && (
              <span className="text-red-500 text-sm">
                {errors.questions[index].title?.message}
              </span>
            )}

            <QuestionTypeSelect
              control={control}
              name={`questions.${index}.type`}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="cursor-pointer"
            >
              <TrashIcon className="w-6 h-6 text-white" />
            </button>
          </div>

          {(watchQuestions[index]?.type === "ONE_CHOICE" ||
            watchQuestions[index]?.type === "MULTIPLE_CHOICE") && (
            <VariantsFieldArray
              questionIndex={index}
              control={control}
              register={register}
              errors={errors}
            />
          )}
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append({ title: "", type: "TEXT", variants: [] })}
        className="cursor-pointer"
      >
        <PlusIcon className="text-white w-4 h-4" /> <div>Add question</div>
      </Button>
      <Button type="submit" className="cursor-pointer">
        Create
      </Button>
    </form>
  );
};
