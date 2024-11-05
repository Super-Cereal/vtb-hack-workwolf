import {
  Table,
  Column,
  Model,
  DataType,
  // HasMany,
  // BelongsTo,
  // ForeignKey,
  BeforeCreate,
  BelongsToMany,
} from 'sequelize-typescript';
import { FinancialLesson } from './financial-lesson.model';
import { SpecialOffer } from './special-offer.model';
import { v4 as uuidv4 } from 'uuid';
import { UserFinancialLessons } from './staging_tables/user-financial-lessons.model';
import { UserSpecialOffers } from './staging_tables/user-special-offers.model';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  gameCoins: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  multiBonusAccount: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 0,
  })
  bankAccount: string; // OPENAPI

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  AccountImg: string; //url?

  @BelongsToMany(() => SpecialOffer, () => UserSpecialOffers)
  ActiveSpecialOffers: SpecialOffer[];

  @BelongsToMany(() => FinancialLesson, () => UserFinancialLessons)
  lessons: FinancialLesson[];

  @BeforeCreate
  static generateUuid(instance: User) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }
}
