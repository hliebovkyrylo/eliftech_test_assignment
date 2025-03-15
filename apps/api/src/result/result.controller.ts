import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ResultService } from './result.service';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get('questionnaire/:questionnaireId')
  @UseGuards(AuthGuard)
  async getResultByQuestionnaireId(
    @Req() req,
    @Param('questionnaireId') questionnaireId: string,
  ) {
    const userId = req.user.id;
    return this.resultService.getResultByQuestionnaireId(
      userId,
      questionnaireId,
    );
  }
}
