import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { VariantDto } from "./variantDto";
import { QuestionType } from "@prisma/client";
import { Type } from "class-transformer";

export class QuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: QuestionType;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variants?: VariantDto[];
}