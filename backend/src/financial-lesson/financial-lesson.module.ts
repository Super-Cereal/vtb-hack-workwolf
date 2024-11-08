import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FinancialLesson } from 'src/models/financial-lesson.model';
import { FinancialLessonsController } from './financial-lesson.controller';
import { FinancialLessonsService } from './financial-lesson.service';
import { User } from 'src/models/user.model';
import { UserFinancialLessons } from 'src/models/staging_tables/user-financial-lessons.model';


@Module({
  imports: [
    SequelizeModule.forFeature([FinancialLesson, User,UserFinancialLessons ]),
  ],
  controllers: [FinancialLessonsController],
  providers: [FinancialLessonsService],
})
export class FinancialLessonModule {}
