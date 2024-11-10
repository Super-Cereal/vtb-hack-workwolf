import type { IUser } from "./types";

import type { ISpecialOffer } from "../specialOffers";

export interface IUserDTO {
  AccountImg?: string;
  ActiveSpecialOffers: ISpecialOffer[];
  bankAccount: string;
  email: string;
  gameCoins: number;
  id: string;
  lessons: {}[];
  multiBonusAccount: number;
  name: string;
  surname: string;
}

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
