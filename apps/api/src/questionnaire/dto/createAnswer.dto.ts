import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class AnswerDto {
  @IsUUID()
  @IsNotEmpty()
  questionId: string;

  @IsUUID()
  @IsOptional()
  variantId?: string;

  @IsString()
  @IsOptional()
  textValue?: string;
}
