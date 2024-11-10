import type { ISpecialOffer } from "../specialOffers";

export interface IUser {
  id: string;
  email: string;
  gameCoins: number;
  activeSpecialOffers: ISpecialOffer[];

  name: string;
  accountImage?: string;

  bankAccount: unknown; // FIXME

  /** Кол-во мультибонусов */
  multibonusAccount: number;
}

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

export interface IRegisterUserDTO {
  name: string;
  surname: string;
  email: string;
  password: string;
  AccountImg?: string;
}
