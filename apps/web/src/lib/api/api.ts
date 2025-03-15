import axios from "axios";
import { QuestionnairesFilters } from "../types/getQuestionnairesFilters";
import { SuccessResponse } from "../types/apiResponse";
import { GetQuestionnaires, Questionnaire } from "../types/questionnaire";
import { endpoints } from "./endpoints";
import { Result } from "../types/result";
import { SignInInput } from "@/modules/auth/SignInForm/schemas/signInSchema";
import { SignUpInput } from "@/modules/auth/SignUpForm/schemas/signUpSchema";
import cookie from "js-cookie";
import { SubmitQuestionnaireType } from "@/modules/questionnaire/QuestionnaireForm/schemas/sendFormSchema";

const authHeaders = () => {
  const token = cookie.get("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

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
  submitQuestionnaire: (data: SubmitQuestionnaireType) => {
    return axios.post<SuccessResponse<Result>>(
      endpoints.submitQuestionnaire(),
      data,
      { headers: authHeaders() }
    );
  },
  isSubmittedQuestionnaire: (id: string) => {
    return axios.get<SuccessResponse<{ isSubmitted: boolean }>>(
      endpoints.isSubmittedQuestionnaire(id),
      { headers: authHeaders() }
    );
  },
  signIn: (data: SignInInput) => {
    return axios.post<SuccessResponse<{ access_token: string }>>(
      endpoints.signIn(),
      data
    );
  },
  signUp: (data: SignUpInput) => {
    return axios.post<SuccessResponse<{ access_token: string }>>(
      endpoints.signUp(),
      data
    );
  },
  getQuestionnaireResult: (id: string) => {
    return axios.get<SuccessResponse<Result>>(
      endpoints.getQuestionnaireResult(id),
      { headers: authHeaders() }
    );
  },
};
