import type { IPartnerBanner } from "../partnerBanner";
import type { ISpecialOffer } from "../specialOffers";

export interface IObjectCard {
  id: string;
  progress: number;
  objectInfo: IObjectInfo;
  objectLevel: IObjectLevel;
}

export interface IObjectInfo {
  id: string;
  name: string;
  description: string;
  shortDecsiption: string;
  partnerBannerId?: string;
  partnerBanner?: IPartnerBanner;
  category: string;
  image?: string;
}

export interface IObjectLevel {
  id: string;
  level: number;

  /** сколько валюты надо потратить для перехода на новый уровень */
  gamecoins?: number;
  nextLevelCost: number;
  specialOffers?: ISpecialOffer[];
}
