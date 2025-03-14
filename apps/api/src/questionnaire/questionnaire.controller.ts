import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createQuestionnaire(@Req() req, @Body() data: CreateQuestionnaireDto) {
    const userId = req.user.id;
    return this.questionnaireService.createQuestionnaire(data, userId);
  }

  @Put('update/:questionnaireId')
  @UseGuards(AuthGuard)
  async updateQuestionnaire(
    @Body() data: CreateQuestionnaireDto,
    @Param('questionnaireId') questionnaireId: string,
  ) {
    return this.questionnaireService.updateQuestionnaire(questionnaireId, data);
  }

  @Delete('delete/:questionnaireId')
  @UseGuards(AuthGuard)
  async deleteQuestionnaire(@Param('questionnaireId') questionnaireId: string) {
    await this.questionnaireService.deleteQuestionnaire(questionnaireId);

    return { message: 'Questionnaire deleted successfully' };
  }
}
