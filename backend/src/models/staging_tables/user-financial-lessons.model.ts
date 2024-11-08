import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../user.model';
import { FinancialLesson } from '../financial-lesson.model';

@Table
export class UserFinancialLessons extends Model<UserFinancialLessons> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  userId: string;

  @ForeignKey(() => FinancialLesson)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  lessonId: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  completed: boolean;
}
