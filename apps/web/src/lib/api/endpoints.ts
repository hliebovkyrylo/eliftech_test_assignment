const API_URL = process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:4000";

export const endpoints = {
  getAllQuestionnaires: () => `${API_URL}/questionnaire/get-all`,
  signIn: () => `${API_URL}/auth/sign-in`,
  signUp: () => `${API_URL}/auth/sign-up`,
  createQuestionnaire: () => `${API_URL}/questionnaire/create`,
  getQuestionnaire: (id: string) => `${API_URL}/questionnaire/${id}`,
  updateQuestionnaire: (id: string) => `${API_URL}/questionnaire/update/${id}`,
  deleteQuestionnaire: (id: string) => `${API_URL}/questionnaire/delete/${id}`,
  submitQuestionnaire: () => `${API_URL}/questionnaire/submit`,
  isSubmittedQuestionnaire: (id: string) =>
    `${API_URL}/questionnaire/${id}/is-submitted`,
  getQuestionnaireResult: (id: string) =>
    `${API_URL}/result/questionnaire/${id}`,
  getMe: () => `${API_URL}/user/me`,
};
