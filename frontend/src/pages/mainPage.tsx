import React from "react";

import { CardMore, CardProgress } from "@/components/card";
import { CardSpecialOffers } from "@/components/card-special-offers";
import { LessonBanner } from "@/components/lessonBanner";
import { PageTemplate } from "@/components/page-template";
import { PartnerBanner } from "@/components/partnerBanner";

/** Главная страница */
export const MainPage = () => (
  <PageTemplate>
    <h1>MainPage</h1>

    <PartnerBanner
      title="Откройте счёт для бизнеса в ВТБ"
      description="ВТБ — надёжный партнёр для вашего бизнеса"
      href="#"
    />

    <LessonBanner
      title="Пример карточки"
      description="Описание карточки"
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
