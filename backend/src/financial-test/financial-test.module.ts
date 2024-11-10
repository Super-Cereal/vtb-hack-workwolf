import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FinancialTestService } from './financial-test.service';
import { FinancialTestController } from './financial-test.controller';
import { UserFinancialLessons } from 'src/models/staging_tables/user-financial-lessons.model';
import { FinancialTest } from 'src/models/financial-test.model';
import { Question } from 'src/models/question.model';

@Module({
  imports: [SequelizeModule.forFeature([UserFinancialLessons, FinancialTest, Question])],
  providers: [FinancialTestService],
  controllers: [FinancialTestController],
})
export class FinancialTestModule {}
