import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { QuestionDto } from './questionDto';
import { Type } from 'class-transformer';

export class QuestionnaireDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
