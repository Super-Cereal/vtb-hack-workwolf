import { IUser } from "./types";

import { specialOfferMocks } from "../specialOffers";

export const user: IUser = {
  id: 0,
  email: "email@email.ru",
  password: "bhesinodfkmlv",
  gameCoins: 18508,
  activeSpecialOffers: specialOfferMocks.list,
  name: "Рудольф Анатольевич",
  accountImage: "https://avatars.mds.yandex.net/i?id=872cac56431682bb67072fe074acab87_l-5876563-images-thumbs&n=13",
  bankAccount: undefined,
  multibonusAccount: 50,
};
