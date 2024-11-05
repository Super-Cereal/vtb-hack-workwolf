import type { IPartnerBanner } from "../partnerBanner";
import type { ISpecialOffer } from "../specialOffers";

export interface IObjectCard {
  id: number;
  progress: number;
  objectInfo: IObjectInfo;
  objectLevel: IObjectLevel;
}

export interface IObjectInfo {
  id: string;
  name: string;
  smallDecsiption: string;
  description: string;
  partnerBanner?: IPartnerBanner;
  category: string;
  image: string;
}

export interface IObjectLevel {
  id: string;
  level: number;
  multibonus?: number;
  nextLevelCost: number;
  specialOffers: ISpecialOffer[];
}
