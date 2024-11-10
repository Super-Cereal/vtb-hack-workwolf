import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from 'src/models/article.model';
import { FinancialLesson } from 'src/models/financial-lesson.model';
import { FinancialTest } from 'src/models/financial-test.model';
import { Question } from 'src/models/question.model';
import { User } from 'src/models/user.model';
import { FinancialLessonService } from './financial-lesson.service';
import { FinancialLessonsController } from './financial-lesson.controller';
import { UserFinancialLessons } from 'src/models/staging_tables/user-financial-lessons.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      FinancialLesson,
      FinancialTest,
      Question,
      User,
      Article,
      UserFinancialLessons,
    ]),
  ],
  providers: [FinancialLessonService],
  controllers: [FinancialLessonsController],
})
export class FinancialLessonModule {}
