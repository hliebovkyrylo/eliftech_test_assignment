import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export enum SortBy {
  TITLE = 'title',
  QUESTION_COUNT = 'questionCount',
  COMPLETED_COUNT = 'completedCount'
}

export class GetAllQuestionnairesDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  pageSize?: number = 100;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy = SortBy.TITLE;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.ASC;
}