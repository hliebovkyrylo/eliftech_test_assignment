import { Input } from "@/components/input";
import { Questionnaire } from "@/lib/types/questionnaire";
import { useForm } from "react-hook-form";
import {
  UpdateQuestionnaireInput,
  updateQuestionnaireSchema,
} from "./schemas/updateQuestionnaireSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/lib/types/apiResponse";

export const UpdateQuestionnaireForm = ({ data }: { data: Questionnaire }) => {
  const router = useRouter();
  const [updateError, setUpdateError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateQuestionnaireInput>({
    defaultValues: {
      title: data.title,
      description: data.description,
    },
    resolver: zodResolver(updateQuestionnaireSchema),
  });

  const mutation = useMutation({
    mutationFn: async (formData: UpdateQuestionnaireInput) => {
      const response = await api.updateQuestionnaire(data.id, formData);
      return response.data;
    },
    onError: (response: AxiosError<ErrorResponse>) => {
      setUpdateError(response.message);
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = handleSubmit((formData: UpdateQuestionnaireInput) => {
    mutation.mutate(formData);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-2xl w-full flex flex-col gap-3 bg-slate-900 p-5 rounded-2xl"
    >
      <div className="text-white text-center text-2xl">
        Update Questionnaire
      </div>
      <div>{updateError}</div>
      <Input {...register("title")} placeholder="Name of the questionnaire" />
      {errors.title && (
        <span className="text-red-500 text-sm">{errors.title.message}</span>
      )}
      <Input
        {...register("description")}
        placeholder="Description of the questionnaire"
      />
      {errors.description && (
        <span className="text-red-500 text-sm">
          {errors.description.message}
        </span>
      )}
      <Button className="bg-amber-200 cursor-pointer hover:bg-amber-100 transition-colors text-black text-base">
        {mutation.isPending ? "Loading..." : "Save"}
      </Button>
    </form>
  );
};
