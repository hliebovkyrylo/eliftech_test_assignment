import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Questionnaire } from '@prisma/client';

@Injectable()
export class QuestionnaireService {
  constructor(private readonly prisma: PrismaService) {}

  async createQuestionnaire(
    data: CreateQuestionnaireDto,
    userId: string,
  ): Promise<Questionnaire> {
    try {
      return this.prisma.questionnaire.create({
        data: {
          ...data,
          userId: userId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating questionnaire');
    }
  }

  async updateQuestionnaire(
    id: string,
    data: CreateQuestionnaireDto,
  ): Promise<Questionnaire> {
    try {
      return this.prisma.questionnaire.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Questionnaire not found');
      }

      throw new InternalServerErrorException('Error updating questionnaire');
    }
  }

  async deleteQuestionnaire(id: string): Promise<Questionnaire> {
    try {
      return this.prisma.questionnaire.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Questionnaire not found');
      }

      throw new InternalServerErrorException('Error deleting questionnaire');
    }
  }
}
