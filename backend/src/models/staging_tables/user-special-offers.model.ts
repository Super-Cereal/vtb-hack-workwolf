import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../user.model';
import { SpecialOffer } from '../special-offer.model';

@Table
export class UserSpecialOffers extends Model<UserSpecialOffers> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => SpecialOffer)
  @Column({
    type: DataType.UUID,
  })
  specialOfferId: string;

  @BelongsTo(() => SpecialOffer)
  specialOffer: SpecialOffer;
}
