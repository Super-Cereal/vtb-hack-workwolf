import { Table, Column, Model, DataType, HasMany, ForeignKey, HasOne, BeforeCreate } from 'sequelize-typescript';
import { PartnerBanner } from './partner-banner.model';
import { ObjectLevel } from './object-level.model';
import { v4 as uuidv4 } from 'uuid';

export enum ObjectCategoryEnum {
  SUPERMARKETS = 'Супермаркеты',
  RESTAURANTS = 'Рестораны',
  TRANSPORT = 'Транспорт',
  ANIMALS = 'Животные',
  HOUSING = 'Жилье',
  CLOTHING = 'Одежда',
  MARKETPLACES = 'Маркетплейсы',
  BEAUTY_AND_HEALTH = 'Красота и здоровье',
}

@Table
export class ObjectCategory extends Model<ObjectCategory> {
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
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  ObjectImg: string;

  @Column({
    type: DataType.ENUM(...Object.values(ObjectCategoryEnum)),
    allowNull: false,
  })
  category: ObjectCategoryEnum;

  @ForeignKey(() => PartnerBanner)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  partnerBannerId: string;

  @HasOne(() => PartnerBanner)
  partnerBanner: PartnerBanner;

  @HasMany(() => ObjectLevel)
  levels: ObjectLevel[];

  @BeforeCreate
static generateUuid(instance: ObjectCategory) {
  if (!instance.id) {
    instance.id = uuidv4();
  }
}
}
