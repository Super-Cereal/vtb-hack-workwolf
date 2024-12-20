import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from 'src/models/article.model';
import { FinancialLesson } from 'src/models/financial-lesson.model';
import { FinancialTest } from 'src/models/financial-test.model';
import { Question } from 'src/models/question.model';
import { User } from 'src/models/user.model';
import { CreateFinancialLessonDto } from './dto/create-financial-lesson.dto';
import { UserFinancialLessons } from 'src/models/staging_tables/user-financial-lessons.model';

@Injectable()
export class FinancialLessonService {
  constructor(
    @InjectModel(FinancialLesson)
    private readonly financialLessonModel: typeof FinancialLesson,
    @InjectModel(FinancialTest)
    private readonly financialTestModel: typeof FinancialTest,
    @InjectModel(Question)
    private readonly questionModel: typeof Question,
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Article)
    private readonly articleModel: typeof Article,
    @InjectModel(UserFinancialLessons)
    private readonly userFinancialLessonsModel: typeof UserFinancialLessons,
  ) {}

  async createFinancialLesson(data: CreateFinancialLessonDto) {
    const { title, description, gamecoins, questions, article } = data;

    const financialLesson = await this.financialLessonModel.create({
      title,
      description,
      gamecoins,
    });

    const createArticle = await this.articleModel.create({
      name: article.name,
      text: article.text,
      lessonId: financialLesson.id,
    });

    const financialTest = await this.financialTestModel.create({
      lessonId: financialLesson.id,
    });

    const createQuestions = await Promise.all(
      questions.map(async (questionData) => {
        return this.questionModel.create({
          text: questionData.text,
          answers: questionData.answers,
          rightAnswer: questionData.rightAnswer,
          financialTestId: financialTest.id,
        });
      }),
    );

    return financialLesson;
  }

  async getUserFinancialLessons(userId: string) {
    // Получаем записи из таблицы UserFinancialLessons
    const userFinancialLessons = await this.userFinancialLessonsModel.findAll({
      where: { userId },
    });

    if (!userFinancialLessons || userFinancialLessons.length === 0) {
      throw new NotFoundException('No financial lessons found for this user');
    }
    // Извлекаем идентификаторы финансовых уроков
    const financialLessonIds = userFinancialLessons.map((uf) => uf.lessonId);

    const financialLessons = await this.financialLessonModel.findAll({
      where: { id: financialLessonIds },
      include: [
        {
          model: Article,
          as: 'content',
        },
        {
          model: FinancialTest,
          as: 'test',
          include: [
            {
              model: Question,
              as: 'questions',
            },
          ],
        },
      ],
    });

    return financialLessons;
  }
}
