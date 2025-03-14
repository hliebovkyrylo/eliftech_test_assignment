import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionnaireService {
  constructor(private readonly prisma: PrismaService) {}

  async createQuestionnaire(data: CreateQuestionnaireDto, userId: string) {
    try {
      return this.prisma.questionnaire.create({
        data: {
          ...data,
          userId: userId,
        }
        
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating questionnaire');
    }
  }
}
