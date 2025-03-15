import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { AnswerDto } from './createAnswer.dto';

export class SubmitQuestionnaireDto {
  @IsUUID()
  @IsNotEmpty()
  questionnaireId: string;

  @IsInt()
  @Min(0)
  durationSec: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
