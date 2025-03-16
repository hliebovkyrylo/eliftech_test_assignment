export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum SortBy {
  TITLE = "title",
  QUESTION_COUNT = "questionCount",
  COMPLETED_COUNT = "completedCount",
}

export interface QuestionnairesFilters {
  page: number;
  pageSize?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}
