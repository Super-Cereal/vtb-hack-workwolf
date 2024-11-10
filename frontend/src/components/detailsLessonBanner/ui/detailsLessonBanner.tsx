import React from "react";

// Дополнительные импорты
import { IconCoins } from "@/shared/ui/icons";

import styles from "./detailsLessonBanner.module.css";

// Импортируем изображение фона
// @ts-expect-error webpack не доработан
import bg from "./bg.png";

interface DetailsLessonBannerProps {
  paragraph?: string;
  lvl_card?: string;
  card_image?: string;
  title?: string;
  progress?: number;
  backgroundSrc?: string;
  coinCount?: number; // Только количество монет
}

export function DetailsLessonBanner({
  paragraph = "Описание по умолчанию",
  lvl_card = "Уровень",
  card_image = "",
  title = "Заголовок",
  progress,
  backgroundSrc = bg,
  coinCount,
}: DetailsLessonBannerProps) {
  return (
    <div
      className={styles.card_progress}
      style={{
        backgroundImage: `url(${backgroundSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.card_header}>
        {card_image && (
          <div className={styles.card_image}>
            <img src={card_image} alt="card_image" />
          </div>
        )}
        {lvl_card !== "Уровень" && <div className={styles.lvl_card}>{lvl_card}</div>}
        {/* Отображение количества монет */}
        {coinCount !== undefined && (
          <div className={styles.coinWrapper}>
            <span className={styles.coinValue}>{coinCount}</span>
            <div className={styles.coinCircle}>
              <IconCoins />
            </div>
          </div>
        )}
      </div>

      <div className={styles.block_description_card}>
        <h3>{title}</h3>
        <p className={styles.paragraph}>{paragraph}</p>

        {/* Полоса прогресса */}
        {progress !== undefined && (
          <div className={styles.progress_bar}>
            <div className={styles.progress_fill} style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
    </div>
  );
}
