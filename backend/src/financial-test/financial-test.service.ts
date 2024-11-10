import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FinancialTest } from 'src/models/financial-test.model';
import { UserFinancialLessons } from 'src/models/staging_tables/user-financial-lessons.model';
import { CheckFinancialTestDto } from './dto/financial-test.dto';
import { Question } from 'src/models/question.model';

@Injectable()
export class FinancialTestService {
  constructor(
    @InjectModel(UserFinancialLessons)
    private readonly userFinancialLessonsModel: typeof UserFinancialLessons,
    @InjectModel(FinancialTest)
    private readonly financialTestModel: typeof FinancialTest,
  ) {}

  async checkFinancialTest(data: CheckFinancialTestDto) {
    const { userId, lessonId, answers } = data;

    const userFinancialLesson = await this.userFinancialLessonsModel.findOne({
      where: { userId, lessonId },
    });

    if (!userFinancialLesson) {
      throw new NotFoundException('User financial lesson not found');
    }

    const financialTest = await this.financialTestModel.findOne({
      where: { lessonId },
      include: [{ model: Question }],
    });

    if (!financialTest) {
      throw new NotFoundException('Financial test not found');
    }

    const questions = financialTest.questions;

    let allCorrect = true;

    for (const answer of answers) {
      const question = questions.find((q) => q.id === answer.questionId);
      if (!question || question.rightAnswer !== answer.userAnswer) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      userFinancialLesson.completed = true;
      await userFinancialLesson.save();
    }

    return userFinancialLesson;
  }
}
