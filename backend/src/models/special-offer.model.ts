import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  BeforeCreate,
} from 'sequelize-typescript';
import { ObjectLevel } from './object-level.model';
import { User } from './user.model';
import { UserSpecialOffers } from './staging_tables/user-special-offers.model';
import { v4 as uuidv4 } from 'uuid';
@Table
export class SpecialOffer extends Model<SpecialOffer> {
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
  sale: string;

  @ForeignKey(() => ObjectLevel)
  @Column({
    type: DataType.UUID,
  })
  objectLevelId: number;

  @BelongsTo(() => ObjectLevel)
  objectLevel: ObjectLevel;

  @BelongsToMany(() => User, () => UserSpecialOffers)
  users: User[];

  @BeforeCreate
  static generateUuid(instance: SpecialOffer) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }
}
