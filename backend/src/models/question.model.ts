import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  BeforeCreate,
} from 'sequelize-typescript';
import { FinancialTest } from './financial-test.model';
import { v4 as uuidv4 } from 'uuid';
@Table
export class Question extends Model<Question> {
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
  text: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  answers: string[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  rightAnswer: string;

  @ForeignKey(() => FinancialTest)
  @Column({
    type: DataType.UUID,
  })
  financialTestId: number;

  @BelongsTo(() => FinancialTest)
  financialTest: FinancialTest;

  @BeforeCreate
  static generateUuid(instance: Question) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }
}
