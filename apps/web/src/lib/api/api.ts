import axios from "axios";
import { QuestionnairesFilters } from "../types/getQuestionnairesFilters";
import { SuccessResponse } from "../types/apiResponse";
import { GetQuestionnaires, Questionnaire } from "../types/questionnaire";
import { endpoints } from "./endpoints";
import { Result } from "../types/result";
import { SignInInput } from "@/modules/auth/SignInForm/schemas/signInSchema";

export const api = {
  getAllQuestionnaires: (params: QuestionnairesFilters) => {
    return axios.get<
      SuccessResponse<{ questionnaires: GetQuestionnaires[]; total: number }>
    >(endpoints.getAllQuestionnaires(), { params });
  },
  getQuestionnaire: (id: string) => {
    return axios.get<SuccessResponse<Questionnaire>>(
      endpoints.getQuestionnaire(id)
    );
  },
  createQuestionnaire: (data: Partial<Questionnaire>) => {
    return axios.post<SuccessResponse<Questionnaire>>(
      endpoints.createQuestionnaire(),
      data
    );
  },
  updateQuestionnaire: (id: string, data: Partial<Questionnaire>) => {
    return axios.put<SuccessResponse<Questionnaire>>(
      endpoints.updateQuestionnaire(id),
      data
    );
  },
  deleteQuestionnaire: (id: string) => {
    return axios.delete<SuccessResponse<{ message: string }>>(
      endpoints.deleteQuestionnaire(id)
    );
  },
  submitQuestionnaire: (data: { questionnaireId: string }) => {
    return axios.post<SuccessResponse<Result>>(
      endpoints.submitQuestionnaire(),
      data
    );
  },
  isSubmittedQuestionnaire: (id: string) => {
    return axios.get<SuccessResponse<{ isSubmitted: boolean }>>(
      endpoints.isSubmittedQuestionnaire(id)
    );
  },
  signIn: (data: SignInInput) => {
    return axios.post<SuccessResponse<{ access_token: string }>>(
      endpoints.signIn(),
      data
    );
  },
};
