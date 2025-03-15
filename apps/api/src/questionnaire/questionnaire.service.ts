import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QuestionnaireDto } from './dto/questionnaire.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Questionnaire } from '@prisma/client';
import {
  GetAllQuestionnairesDto,
  SortBy,
  SortOrder,
} from './dto/getAllQuestionnaires.dto';

@Injectable()
export class QuestionnaireService {
  constructor(private readonly prisma: PrismaService) {}

  async createQuestionnaire(data: QuestionnaireDto, userId: string) {
    const { title, description, questions } = data;

    try {
      return await this.prisma.$transaction(async (tx) => {
        const questionnaire = await tx.questionnaire.create({
          data: {
            title,
            description,
            userId,
          },
        });

        const createdQuestions: Array<{
          id: string;
          title: string;
          type: string;
          questionnaireId: string;
          variants: { id: string; title: string; questionId: string }[];
        }> = [];

        for (const question of questions) {
          const createdQuestion = await tx.question.create({
            data: {
              title: question.title,
              type: question.type,
              questionnaireId: questionnaire.id,
            },
          });

          if (
            question.variants &&
            (question.type === 'MULTIPLE_CHOICE' ||
              question.type === 'ONE_CHOICE')
          ) {
            const variants = await Promise.all(
              question.variants.map((variant) =>
                tx.variant.create({
                  data: {
                    title: variant.title,
                    questionId: createdQuestion.id,
                  },
                }),
              ),
            );

            createdQuestions.push({
              ...createdQuestion,
              variants,
            });
          } else {
            createdQuestions.push({
              ...createdQuestion,
              variants: [],
            });
          }
        }

        return {
          ...questionnaire,
          questions: createdQuestions,
        };
      });
    } catch (error) {
      console.error('Error creating questionnaire:', error);
      throw new InternalServerErrorException('Error creating questionnaire');
    }
  }

  async updateQuestionnaire(
    id: string,
    data: QuestionnaireDto,
    userId: string,
  ) {
    try {
      const existingQuestionnaire = await this.prisma.questionnaire.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!existingQuestionnaire) {
        throw new NotFoundException(
          'Questionnaire not found or you do not have permission to update it',
        );
      }

      const { title, description, questions } = data;

      return await this.prisma.$transaction(async (tx) => {
        const updatedQuestionnaire = await tx.questionnaire.update({
          where: { id },
          data: {
            title,
            description,
          },
        });

        await tx.question.deleteMany({
          where: {
            questionnaireId: id,
          },
        });

        const updatedQuestions: Array<{
          id: string;
          title: string;
          type: string;
          questionnaireId: string;
          variants: { id: string; title: string; questionId: string }[];
        }> = [];

        for (const question of questions) {
          const createdQuestion = await tx.question.create({
            data: {
              title: question.title,
              type: question.type,
              questionnaireId: id,
            },
          });

          if (
            question.variants &&
            (question.type === 'MULTIPLE_CHOICE' ||
              question.type === 'ONE_CHOICE')
          ) {
            const variants = await Promise.all(
              question.variants.map((variant) =>
                tx.variant.create({
                  data: {
                    title: variant.title,
                    questionId: createdQuestion.id,
                  },
                }),
              ),
            );

            updatedQuestions.push({
              ...createdQuestion,
              variants,
            });
          } else {
            updatedQuestions.push({
              ...createdQuestion,
              variants: [],
            });
          }
        }

        return {
          ...updatedQuestionnaire,
          questions: updatedQuestions,
        };
      });
    } catch (error) {
      console.error('Error updating questionnaire:', error);
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

  async getAllQuestionnaires(
    dto: GetAllQuestionnairesDto,
  ): Promise<{ questionnaires: Questionnaire[]; total: number }> {
    const {
      page = 1,
      pageSize = 10,
      sortBy = SortBy.TITLE,
      sortOrder = SortOrder.ASC,
    } = dto;

    const orderBy = {};

    if (sortBy === SortBy.TITLE) {
      orderBy['title'] = sortOrder;
    } else if (sortBy === SortBy.QUESTION_COUNT) {
      orderBy['questions'] = { _count: sortOrder };
    } else if (sortBy === SortBy.COMPLETED_COUNT) {
      orderBy['completions'] = { _count: sortOrder };
    }

    const skip = (page - 1) * pageSize;

    const questionnaires = await this.prisma.questionnaire.findMany({
      orderBy,
      skip,
      take: pageSize,
      include: {
        _count: {
          select: {
            questions: true,
            results: true,
          },
        },
      },
    });

    const total = await this.prisma.questionnaire.count();

    return { questionnaires, total };
  }
}
