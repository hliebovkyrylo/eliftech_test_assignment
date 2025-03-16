import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateQuestionnaireDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
