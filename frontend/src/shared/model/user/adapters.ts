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
  accountImage:
    AccountImg ||
    "https://avatars.mds.yandex.net/i?id=ae539a6d4a7590ff2d0a985e0a032f64e4fa3009-4120868-images-thumbs&n=13",
  bankAccount,
  multibonusAccount: multiBonusAccount,
});
