import React from "react";

import styles from "./card.module.css";

interface CardProgressProps {
  progress?: number;
  paragraph?: string;
  lvl_card?: string;
  card_image?: string;
  title?: string;
}

/**
 * Компонент `CardProgress` отображает карточку с изображением, уровнем и прогрессом.
 *
 * @example
 * <CardProgress
 *    progress={50}
 *    paragraph="Это место, где можно насладиться изысканными блюдами в комфортной и элегантной обстановке"
 *    lvl_card="2 Уровень"
 *    card_image="/path/to/image.jpg"
 *    title="ВТБ-Гурман"
 * />
 */
export default function CardProgress({
  progress = 0,
  paragraph = "Описание по умолчанию",
  lvl_card = "Уровень",
  card_image = "",
  title = "Заголовок",
}: CardProgressProps) {
  return (
    <div className={styles.card_progress}>
      <div className={styles.card_header}>
        <div className={styles.card_image}>
          <img src={card_image} alt="card_image" />
        </div>
        <div className={styles.lvl_card}>{lvl_card}</div>
      </div>
      <div className={styles.block_description_card}>
        <h3>{title}</h3>
        <p className={styles.paragraph}>{paragraph}</p>
        <div className={styles.progress_bar}>
          <div className={styles.progress_fill} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}
