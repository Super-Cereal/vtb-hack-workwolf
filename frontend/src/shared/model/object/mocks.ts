import type { IObjectCard, IObjectInfo, IObjectLevel } from "./types";

import { partnerBannerMocks } from "../partnerBanner";
import { specialOfferMocks } from "../specialOffers";

export const level: IObjectLevel = {
  id: "1",
  level: 1,
  levelCost: 1000,
  nextLevelCost: 10000,
  specialOffers: specialOfferMocks.list,
};

export const info: IObjectInfo = {
  id: "1",
  name: "ВТБ-Гурман",
  shortDecsiption: "Это место, где можно насладиться изысканными блюдами в комфортной и элегантной обстановке",
  description:
    "Это место, где можно насладиться изысканными блюдами в комфортной и элегантной обстановке. Это не просто сеть ресторанов, а настоящее гастрономическое приключение! Здесь вы сможете попробовать разнообразные блюда и напитки, приготовленные из свежих и качественных продуктов.",
  category: "Ресторан",
  partnerBanner: partnerBannerMocks.partnerBanner,
  image: "https://avatars.mds.yandex.net/i?id=6f064b1de4ef81dc467c6e68fda0c46f_l-5480371-images-thumbs&n=13",
};

export const card: IObjectCard = {
  id: 1,
  progress: 4675,
  objectInfo: info,
  objectLevel: level,
};

export const cardsList: IObjectCard[] = Array.from(Array(10)).map((_, idx) => ({
  ...card,
  id: idx + 1,
  objectInfo: { ...card.objectInfo, id: String(idx + 1) },
  objectLevel: { ...card.objectLevel, id: String(idx + 1) },
}));
