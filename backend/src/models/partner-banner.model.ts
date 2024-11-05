import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
} from 'sequelize-typescript';
import { ObjectCategory } from './object-category.model';
import { v4 as uuidv4 } from 'uuid';

@Table
export class PartnerBanner extends Model<PartnerBanner> {
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
  url: string;

  @Column({
    type: DataType.STRING,
  })
  desc: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => ObjectCategory)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  ObjectCategoryId: string;

  @BelongsTo(() => ObjectCategory)
  object: object;

  @BeforeCreate
  static generateUuid(instance: PartnerBanner) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }
}
