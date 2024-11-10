import type { IObjectCard } from "./types";

export interface IObjectCardDTO {
  id: string;
  progress: number;

  /** не используем */
  weeklyTransferredCoins: unknown;

  objectCategory: {
    id: string;
    name: string;
    description: string;
    ObjectImg?: string;
    category: string;
    partnerBannerId?: string;
  };
  currentLevel: {
    id: string;
    objectId: string;
    level: 1;
    gamecoins: 10;
    nextLevelCost: 0;
    specialOffers?: {
      id: string;
      sale: string;
      objectLevelId: string;
    }[];
  };
}

const adapter_objectInfo = ({
  id,
  name,
  description,
  ObjectImg,
  category,
  partnerBannerId,
}: IObjectCardDTO["objectCategory"]): IObjectCard["objectInfo"] => ({
  id,
  name,
  description,
  shortDecsiption: description,
  partnerBannerId,
  category,
  image:
    ObjectImg || "https://avatars.mds.yandex.net/i?id=6f064b1de4ef81dc467c6e68fda0c46f_l-5480371-images-thumbs&n=13",
});

const adapter_objectLevel = ({
  id,
  level,
  nextLevelCost,
  gamecoins,
  specialOffers,
}: IObjectCardDTO["currentLevel"]): IObjectCard["objectLevel"] => ({
  id,
  level,
  nextLevelCost,
  gamecoins,
  specialOffers: specialOffers?.map(({ id, sale }) => ({ id, description: sale })),
});

export const adapter_objectCard = ({ id, progress, objectCategory, currentLevel }: IObjectCardDTO): IObjectCard => ({
  id,
  progress,
  objectInfo: adapter_objectInfo(objectCategory),
  objectLevel: adapter_objectLevel(currentLevel),
});
