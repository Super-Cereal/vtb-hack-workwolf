import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Question } from './question.model';
import { FinancialLesson } from './financial-lesson.model';
import { v4 as uuidv4 } from 'uuid';

@Table
export class FinancialTest extends Model<FinancialTest> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => FinancialLesson)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  lessonId: number;

  @BelongsTo(() => FinancialLesson)
  financialLesson: FinancialLesson;

  @HasMany(() => Question)
  questions: Question[];

  static generateUuid(instance: FinancialTest) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }
}
