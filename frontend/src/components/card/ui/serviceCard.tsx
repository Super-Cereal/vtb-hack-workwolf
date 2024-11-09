import React from "react";

import styles from "./serviceCard.module.css";

interface ServiceCardProps {
  paragraph?: string;
  lvl_card?: string;
  card_image?: string;
  title?: string;
  progress?: number; // Добавляем проп для прогресса
}

/**
 * Компонент `ServiceCard` отображает карточку с изображением, уровнем и описанием, с возможной полосой прогресса.
 *
 * @example
 * <ServiceCard
 *    progress={30}
 *    paragraph="Это место, где можно насладиться изысканными блюдами в комфортной и элегантной обстановке"
 *    lvl_card="2 Уровень"
 *    card_image="/path/to/image.jpg"
 *    title="ВТБ-Гурман"
 * />
 */
export function ServiceCard({
  paragraph = "Описание по умолчанию",
  lvl_card = "Уровень",
  card_image = "",
  title = "Заголовок",
  progress, // Деструктурируем проп для прогресса
}: ServiceCardProps) {
  return (
    <div className={styles.card_progress}>
      <div className={styles.card_header}>
        {card_image && (
          <div className={styles.card_image}>
            <img src={card_image} alt="card_image" />
          </div>
        )}
        {lvl_card !== "Уровень" && <div className={styles.lvl_card}>{lvl_card}</div>}
      </div>
      <div className={styles.block_description_card}>
        <h3>{title}</h3>
        <p className={styles.paragraph}>{paragraph}</p>

        {/* Полоса прогресса - рендерится только при наличии прогресса */}
        {progress !== undefined && (
          <div className={styles.progress_bar}>
            <div className={styles.progress_fill} style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>
    </div>
  );
}
