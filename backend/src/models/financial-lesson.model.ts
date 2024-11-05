import {
  Table,
  Column,
  Model,
  DataType,
  // BelongsTo,
  ForeignKey,
  HasOne,
  BelongsToMany,
  BeforeCreate,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Article } from './article.model';
import { FinancialTest } from './financial-test.model';
import { UserFinancialLessons } from './staging_tables/user-financial-lessons.model';
import { v4 as uuidv4 } from 'uuid';

@Table
export class FinancialLesson extends Model<FinancialLesson> {
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
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  complete: boolean;

  @HasOne(() => FinancialTest)
  test: FinancialTest;

  @HasOne(() => Article)
  content: Article;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsToMany(() => User, () => UserFinancialLessons)
  users: User[];

  @BeforeCreate
  static generateUuid(instance: FinancialLesson) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }
}
