import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";
import { VariantDto } from "./variantDto";
import { QuestionType } from "@prisma/client";

export class QuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: QuestionType;

  @IsArray()
  variants?: VariantDto[];
}