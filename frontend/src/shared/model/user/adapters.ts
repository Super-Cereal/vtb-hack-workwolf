import { IUser, IUserDTO } from "./types";

export const adapter_userQuery = ({
  AccountImg,
  ActiveSpecialOffers,
  bankAccount,
  email,
  gameCoins,
  id,
  multiBonusAccount,
  name,
  surname,
}: IUserDTO): IUser => ({
  id,
  email,
  gameCoins,
  activeSpecialOffers: ActiveSpecialOffers,
  name: `${name} ${surname}`,
  accountImage: AccountImg,
  bankAccount,
  multibonusAccount: multiBonusAccount,
});
