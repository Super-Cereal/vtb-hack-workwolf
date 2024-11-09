import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  // BelongsToMany,
  BeforeCreate,
} from 'sequelize-typescript';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';
import { ObjectLevel } from './object-level.model';
import { ObjectCategory } from './object-category.model';

@Table
export class ObjectCard extends Model<ObjectCard> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  progress: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  weeklyTransferredCoins: number;

  @ForeignKey(() => ObjectLevel)
  @Column({
    type: DataType.UUID,
  })
  currentLevelId: string;

  @BelongsTo(() => ObjectLevel)
  currentLevel: ObjectLevel;

  @ForeignKey(() => ObjectCategory)
  @Column({
    type: DataType.UUID,
  })
  objectCategoryId: string;

  @BelongsTo(() => ObjectCategory)
  objectCategory: ObjectCategory;

  @BeforeCreate
  static generateUuid(instance: ObjectCard) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }
}
