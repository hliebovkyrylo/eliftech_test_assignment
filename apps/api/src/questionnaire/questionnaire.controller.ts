import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
}
