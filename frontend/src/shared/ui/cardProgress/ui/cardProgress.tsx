import React from "react";
import styles from "./cardProgress.module.css";

interface CardProgressProps {
  progress?: number;
  start?: number;
  end?: number;
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
 *    start={1000}
 *    end={40000}
 *    paragraph="Описание места"
 *    lvl_card="2 Уровень"
 *    card_image="/path/to/image.jpg"
 *    title="ВТБ-Гурман"
 * />
 */
export function CardProgress({
  progress = 0,
  start,
  end,
  paragraph = "",
  lvl_card = "Уровень",
  card_image = "",
  title = "Заголовок",
}: CardProgressProps) {
  const isCollapsed = !paragraph && !card_image && lvl_card === "Уровень";

  // Вычисление прогресса, если заданы `start` и `end`
  const calculatedProgress = start !== undefined && end !== undefined ? (start / end) * 100 : progress;

  return (
    <div className={`${styles.card_progress} ${isCollapsed ? styles.collapsed : ""}`}>
      <div className={styles.card_header} style={{ display: card_image ? "block" : "none" }}>
        {card_image && (
          <div className={styles.card_image}>
            <img src={card_image} alt="card_image" />
          </div>
        )}
        {lvl_card !== "Уровень" && <div className={styles.lvl_card}>{lvl_card}</div>}
      </div>
      <div className={styles.block_description_card}>
        <h3>{title}</h3>
        {paragraph && <p className={styles.paragraph}>{paragraph}</p>}

        {/* Полоса прогресса */}
        <div className={styles.progress_bar}>
          <div className={styles.progress_fill} style={{ width: `${calculatedProgress}%` }}></div>
        </div>

        {/* Отображение start и end только если они определены */}
        {start !== undefined && end !== undefined && (
          <div className={styles.progress_status}>
            <div className={styles.start}>{start}</div>
            <div className={styles.end}>{end}</div>
          </div>
        )}
      </div>
    </div>
  );
}
