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
import { CreateQuestionnaireInput } from "@/modules/create-questionnaire/CreateSurveyForm/schemas/createQuestionnaire";
import { UpdateQuestionnaireInput } from "@/modules/questionnaire/UpdateQuestionnaireForm/schemas/updateQuestionnaireSchema";
import { User } from "../types/user";

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
  createQuestionnaire: (data: CreateQuestionnaireInput) => {
    return axios.post<SuccessResponse<Questionnaire>>(
      endpoints.createQuestionnaire(),
      data,
      { headers: authHeaders() }
    );
  },
  updateQuestionnaire: (id: string, data: UpdateQuestionnaireInput) => {
    return axios.put<SuccessResponse<Questionnaire>>(
      endpoints.updateQuestionnaire(id),
      data,
      { headers: authHeaders() }
    );
  },
  deleteQuestionnaire: (id: string) => {
    return axios.delete<SuccessResponse<{ message: string }>>(
      endpoints.deleteQuestionnaire(id),
      { headers: authHeaders() }
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
    return axios.post<SuccessResponse<{ accessToken: string }>>(
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
  getMe: () => {
    return axios.get<SuccessResponse<User>>(endpoints.getMe(), {
      headers: authHeaders(),
    });
  },
};
