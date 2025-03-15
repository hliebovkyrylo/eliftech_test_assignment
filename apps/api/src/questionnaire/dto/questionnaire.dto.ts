import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { QuestionDto } from './questionDto';

export class QuestionnaireDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  questions: QuestionDto[];
}
