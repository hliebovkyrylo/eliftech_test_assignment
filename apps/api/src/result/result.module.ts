import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [ResultController],
  providers: [ResultService],
  exports: [ResultService],
})
export class ResultModule {}
