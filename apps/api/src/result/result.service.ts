import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  async getResultByQuestionnaireId(userId: string, questionnaireId: string) {
    try {
      const result = await this.prisma.result.findFirst({
        where: {
          userId,
          questionnaireId,
        },
        include: {
          answers: {
            include: {
              question: true,
            },
          },
          questionnaire: true,
        },
      });

      if (!result) {
        throw new NotFoundException('Result not found');
      }

      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException("Can't get result");
    }
  }
}
