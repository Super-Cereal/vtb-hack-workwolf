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
  multibonus?: number;
  levelCost: number;
  nextLevelCost: number;
  specialOffers: ISpecialOffer[];
}
