import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireDto } from './dto/questionnaire.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { GetAllQuestionnairesDto } from './dto/getAllQuestionnaires.dto';
import { SubmitQuestionnaireDto } from './dto/submitQuestionnaire.dto';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createQuestionnaire(@Req() req, @Body() data: QuestionnaireDto) {
    const userId = req.user.id;
    return this.questionnaireService.createQuestionnaire(data, userId);
  }

  @Put('update/:questionnaireId')
  @UseGuards(AuthGuard)
  async updateQuestionnaire(
    @Req() req,
    @Body() data: QuestionnaireDto,
    @Param('questionnaireId') questionnaireId: string,
  ) {
    const userId = req.user.id;
    return this.questionnaireService.updateQuestionnaire(
      questionnaireId,
      data,
      userId,
    );
  }

  @Delete('delete/:questionnaireId')
  @UseGuards(AuthGuard)
  async deleteQuestionnaire(@Param('questionnaireId') questionnaireId: string) {
    await this.questionnaireService.deleteQuestionnaire(questionnaireId);

    return { message: 'Questionnaire deleted successfully' };
  }

  @Get('get-all')
  async getAllQuestionnaires(@Query() data: GetAllQuestionnairesDto) {
    return this.questionnaireService.getAllQuestionnaires(data);
  }

  @Post('submit')
  @UseGuards(AuthGuard)
  async submitQuestionnaire(@Req() req, @Body() data: SubmitQuestionnaireDto) {
    const userId = req.user.id;
    return this.questionnaireService.submitQuestionnaire(userId, data);
  }

  @Get(':questionnaireId')
  async getQuestionnaire(@Param('questionnaireId') questionnaireId: string) {
    return this.questionnaireService.getQuestionnaireById(questionnaireId);
  }

  @Get(':questionnaireId/is-submitted')
  @UseGuards(AuthGuard)
  async isQuestionnaireSubmitted(
    @Param('questionnaireId') questionnaireId: string,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.questionnaireService.isAlreadyCompleted(
      userId,
      questionnaireId,
    );
  }
}
