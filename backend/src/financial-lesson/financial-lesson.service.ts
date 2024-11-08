import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFinancialLessonDto } from './dto/create-financial-lesson.dto';
import { UpdateFinancialLessonDto } from './dto/update-financial-lesson.dto';
import { FinancialLesson } from 'src/models/financial-lesson.model';
import { User } from 'src/models/user.model';
import { UserFinancialLessons } from 'src/models/staging_tables/user-financial-lessons.model';

@Injectable()
export class FinancialLessonsService {
  constructor(
    @InjectModel(FinancialLesson)
    private readonly financialLessonModel: typeof FinancialLesson,
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(UserFinancialLessons)
    private readonly userFinancialLessonsModel: typeof UserFinancialLessons,
  ) {}

  async createFinancialLesson(
    createFinancialLessonDto: CreateFinancialLessonDto,
  ): Promise<FinancialLesson> {
    return this.financialLessonModel.create(createFinancialLessonDto);
  }

  async findAllFinancialLessons(): Promise<FinancialLesson[]> {
    return this.financialLessonModel.findAll();
  }

  async findFinancialLessonById(id: string): Promise<FinancialLesson> {
    const financialLesson = await this.financialLessonModel.findByPk(id);
    if (!financialLesson) {
      throw new NotFoundException('FinancialLesson not found');
    }
    return financialLesson;
  }

  async updateFinancialLesson(
    id: string,
    updateFinancialLessonDto: UpdateFinancialLessonDto,
  ): Promise<FinancialLesson> {
    const [updatedRows] = await this.financialLessonModel.update(updateFinancialLessonDto, {
      where: { id },
      returning: true,
    });

    if (updatedRows === 0) {
      throw new NotFoundException('FinancialLesson not found');
    }

    return this.findFinancialLessonById(id);
  }

  async deleteFinancialLesson(id: string): Promise<void> {
    const deletedRows = await this.financialLessonModel.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new NotFoundException('FinancialLesson not found');
    }
  }

  async getUserFinancialLessons(userId: string): Promise<FinancialLesson[]> {
    const user = await this.userModel.findByPk(userId, {
      include: [
        {
          model: FinancialLesson,
          through: {
            attributes: ['completed'],
          },
        },
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.lessons;
  }

  async completeFinancialLesson(
    userId: string,
    lessonId: string,
    gameCoins: number,
  ): Promise<void> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const lesson = await this.financialLessonModel.findByPk(lessonId);
    if (!lesson) {
      throw new NotFoundException('FinancialLesson not found');
    }

    const userLesson = await this.userFinancialLessonsModel.findOne({
      where: { userId, lessonId },
    });

    if (!userLesson) {
      await this.userFinancialLessonsModel.create({ userId, lessonId, completed: true });
    } else {
      await this.userFinancialLessonsModel.update(
        { completed: true },
        { where: { userId, lessonId } },
      );
    }

    await this.userModel.update(
      { gameCoins: user.gameCoins + gameCoins },
      { where: { id: userId } },
    );
  }
}
