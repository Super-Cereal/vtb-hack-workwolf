import type { ISpecialOffer } from "../specialOffers";

export interface IUser {
  id: number;
  email: string;
  password: string;
  gameCoins: number;
  activeSpecialOffers: ISpecialOffer[];

  name: string;
  accountImage: string;

  bankAccount: unknown; // FIXME

  /** Кол-во мультибонусов */
  multibonusAccount: number;
}
