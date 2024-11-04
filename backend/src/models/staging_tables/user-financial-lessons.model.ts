import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../user.model';
import { FinancialLesson } from '../financial-lesson.model';

@Table
export class UserFinancialLessons extends Model<UserFinancialLessons> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => FinancialLesson)
  @Column({
    type: DataType.UUID,
  })
  financialLessonId: string;

  @BelongsTo(() => FinancialLesson)
  financialLesson: FinancialLesson;
}
