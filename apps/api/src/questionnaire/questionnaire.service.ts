import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QuestionnaireDto } from './dto/questionnaire.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Questionnaire, QuestionType } from '@prisma/client';
import {
  GetAllQuestionnairesDto,
  SortBy,
  SortOrder,
} from './dto/getAllQuestionnaires.dto';
import { SubmitQuestionnaireDto } from './dto/submitQuestionnaire.dto';

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

  async submitQuestionnaire(userId: string, data: SubmitQuestionnaireDto) {
    try {
      const questionnaire = await this.prisma.questionnaire.findUnique({
        where: { id: data.questionnaireId },
        include: { questions: { include: { variants: true } } },
      });

      if (!questionnaire) {
        throw new NotFoundException('Questionnaire not found');
      }

      const isAlreadyCompleted = await this.prisma.result.findFirst({
        where: {
          userId,
          questionnaireId: data.questionnaireId,
        },
      });

      if (isAlreadyCompleted) {
        throw new ConflictException('Questionnaire already completed');
      }

      const questionIds = new Set(questionnaire.questions.map((q) => q.id));
      const answeredQuestionIds = new Set(
        data.answers.map((a) => a.questionId),
      );

      for (const questionId of questionIds) {
        if (!answeredQuestionIds.has(questionId)) {
          const question = questionnaire.questions.find(
            (q) => q.id === questionId,
          );
          throw new BadRequestException(
            `No answer provided for question: ${question?.title}`,
          );
        }
      }

      for (const answer of data.answers) {
        if (!questionIds.has(answer.questionId)) {
          throw new BadRequestException(
            `Question with ID ${answer.questionId} does not belong to this questionnaire`,
          );
        }
      }

      const answersByQuestion = {};
      for (const answer of data.answers) {
        if (!answersByQuestion[answer.questionId]) {
          answersByQuestion[answer.questionId] = [];
        }
        answersByQuestion[answer.questionId].push(answer);
      }

      for (const question of questionnaire.questions) {
        const answers = answersByQuestion[question.id] || [];

        switch (question.type) {
          case QuestionType.TEXT:
            if (answers.length !== 1) {
              throw new BadRequestException(
                `Exactly one answer required for text question: ${question.title}`,
              );
            }

            if (!answers[0].textValue) {
              throw new BadRequestException(
                `You must provide a text answer for the question: ${question.title}`,
              );
            }

            if (answers[0].variantId) {
              throw new BadRequestException(
                `For text question "${question.title}" no option should be selected`,
              );
            }
            break;

          case QuestionType.ONE_CHOICE:
            if (answers.length !== 1) {
              throw new BadRequestException(
                `Exactly one option must be selected for question: ${question.title}`,
              );
            }

            if (!answers[0].variantId) {
              throw new BadRequestException(
                `You must select an option for the question: ${question.title}`,
              );
            }

            const isValidVariant = question.variants.some(
              (v) => v.id === answers[0].variantId,
            );

            if (!isValidVariant) {
              throw new BadRequestException(
                `The selected option does not belong to the question: ${question.title}`,
              );
            }
            break;

          case QuestionType.MULTIPLE_CHOICE:
            const selectedVariantIds = new Set();

            for (const answer of answers) {
              if (!answer.variantId) {
                throw new BadRequestException(
                  `Each selected option must have a valid variantId for question: ${question.title}`,
                );
              }

              if (selectedVariantIds.has(answer.variantId)) {
                throw new BadRequestException(
                  `The same option cannot be selected multiple times for question: ${question.title}`,
                );
              }
              selectedVariantIds.add(answer.variantId);

              const isValidMultipleVariant = question.variants.some(
                (v) => v.id === answer.variantId,
              );

              if (!isValidMultipleVariant) {
                throw new BadRequestException(
                  `The selected option does not belong to the question: ${question.title}`,
                );
              }
            }
            break;
        }
      }

      const result = await this.prisma.result.create({
        data: {
          userId: userId,
          questionnaireId: data.questionnaireId,
          durationSec: data.durationSec,
          answers: {
            create: data.answers.map((answer) => ({
              questionId: answer.questionId,
              variantId: answer.variantId,
              textValue: answer.textValue,
            })),
          },
        },
        include: {
          answers: {
            include: {
              question: true,
              variant: true,
            },
          },
        },
      });

      return result;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error submitting questionnaire');
    }
  }

  async getQuestionnaireById(id: string): Promise<Questionnaire> {
    try {
      const questionnaire = await this.prisma.questionnaire.findUnique({
        where: { id },
        include: {
          questions: {
            include: {
              variants: true,
            },
          },
        },
      });

      if (!questionnaire) {
        throw new NotFoundException('Questionnaire not found');
      }

      return questionnaire;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Error fetching questionnaire');
    }
  }
}
