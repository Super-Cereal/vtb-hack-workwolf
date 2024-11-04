import { Table, Column, Model, DataType, BelongsTo, ForeignKey, BelongsToMany, BeforeCreate } from 'sequelize-typescript';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';
import { ObjectLevel } from './object-level.model';

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
  type: DataType.INTEGER,
  allowNull: false,
})
userId: string;

@BelongsTo(() => User)
user: User;


@Column({
  type: DataType.INTEGER,
})
progress: number;

@ForeignKey(() => ObjectLevel)
@Column({
  type: DataType.STRING,
  
})
currentLevelId: string;

@BelongsTo(() => ObjectLevel)
currentLevel: ObjectLevel;


@BeforeCreate
static generateUuid(instance: ObjectCard) {
  if (!instance.id) {
    instance.id = uuidv4();
  }
}
}
