import { ISpecialOffer } from "./types";

export const list: ISpecialOffer[] = [
  "скидка 15% на десерты",
  "5% кешбека на все заказы",
  "мультибонусы за каждое посещение",
  "бесплатная доставка",
].map((description, idx) => ({ id: idx.toString(), description }));
