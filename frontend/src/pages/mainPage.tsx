import React from "react";

import { CardSpecialOffers } from "@/components/card-special-offers";
import { PageTemplate } from "@/components/page-template";
import { Card, CardMore, CardProgress } from "@/shared/ui/card";
import { CardBanner } from "@/shared/ui/cardBanner/ui/components/Frame2087324180/cardBanner";

/** Главная страница */
export const MainPage = () => (
  <PageTemplate>
    <h1>MainPage</h1>

    <CardBanner title="Пример карточки" description="Описание карточки" href="#" />

    <CardBanner
      title="Пример карточки"
      description="Описание карточки"
      href="#"
      coinCount={5}
      currentStep={2}
      totalSteps={6}
    />

    <CardMore
      paragraph="Это место, где можно насладиться изысканными блюдами в комфортной и элегантной обстановке"
      lvl_card="2 Уровень"
      card_image="https://avatars.mds.yandex.net/i?id=6f064b1de4ef81dc467c6e68fda0c46f_l-5480371-images-thumbs&n=13"
      title="ВТБ-Гурман"
    />

    <CardProgress
      progress={30}
      paragraph="Это место, где можно насладиться изысканными блюдами в комфортной и элегантной обстановке"
      lvl_card="2 Уровень"
      card_image="https://avatars.mds.yandex.net/i?id=6f064b1de4ef81dc467c6e68fda0c46f_l-5480371-images-thumbs&n=13"
      title="ВТБ-Гурман"
    />

    <CardProgress
      progress={10}
      start={39000}
      end={40000}
      // paragraph="Это место, где можно насладиться изысканными блюдами в комфортной и элегантной обстановке"
      // lvl_card="2 Уровень"
      // card_image="https://avatars.mds.yandex.net/i?id=6f064b1de4ef81dc467c6e68fda0c46f_l-5480371-images-thumbs&n=13"
      title="ВТБ-Гурман"
    />

    <CardSpecialOffers objectId={123} />
  </PageTemplate>
);
