import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { UserModule } from './user/user.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [AuthModule, QuestionnaireModule, UserModule, ResultModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
