import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
} from 'sequelize-typescript';
import { FinancialLesson } from './financial-lesson.model';
import { v4 as uuidv4 } from 'uuid';

@Table
export class Article extends Model<Article> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  text: string;

  @ForeignKey(() => FinancialLesson)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  lessonId: number;

  @BelongsTo(() => FinancialLesson)
  financialLesson: FinancialLesson;

  @BeforeCreate
  static generateUuid(instance: Article) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }
}
