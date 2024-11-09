import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  BeforeCreate,
  HasMany,
} from 'sequelize-typescript';
import { ObjectCategory } from './object-category.model';
import { v4 as uuidv4 } from 'uuid';
import { SpecialOffer } from './special-offer.model';

@Table
export class ObjectLevel extends Model<ObjectLevel> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => ObjectCategory)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  objectId: string;

  @BelongsTo(() => ObjectCategory)
  object: ObjectCategory;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  level: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  gamecoins: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  nextLevelCost: number;

  @HasMany(() => SpecialOffer)
  specialOffers: SpecialOffer[];

  @BeforeCreate
  static generateUuid(instance: ObjectLevel) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }
}
