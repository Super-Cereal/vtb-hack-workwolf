import React, { type ElementType, type PropsWithChildren } from "react";
import cx from "classnames";

import styles from "./card.module.css";

interface CardProps extends PropsWithChildren {
  title?: string;
  titleTag?: ElementType;
  className?: string;
  description?: string;
}

/**
 * Пример использования компонента `SummaryCard`.
 *
 * @example
        <SummaryCard title="Откройте счёт для бизнеса в ВТБ" description="ВТБ — надёжный партнёр для вашего бизнеса" titleTag="h2">
        </SummaryCard>
 * />
 */

export const SummaryCard = ({ title, titleTag: TitleTag = "span", className, description }: CardProps) => (
  <div className={cx(styles.card, className)}>
    {title && <TitleTag className={styles.title}>{title}</TitleTag>}
    {description && <div className={styles.description}>{description}</div>}
    {/* Добавление кругов */}
    <div className={styles.outerCircle}>
      <span className={styles.innerCircle} />
    </div>
    <div className={styles.outerCircle2}>
      <span className={styles.innerCircle2} />
    </div>
    {/* Добавление SVG в центре внизу */}
    <div className={styles.svgContainer}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_63_988)">
          <path
            d="M28.312 12.0654L30.9183 19.805C31.2145 20.6847 31.1492 21.6461 30.7366 22.4776C30.324 23.3091 29.598 23.9427 28.7183 24.2389L13.2391 29.4516C12.3594 29.7478 11.398 29.6824 10.5665 29.2699C9.73494 28.8573 9.10136 28.1313 8.80512 27.2516L6.19882 19.5119L28.312 12.0654ZM25.3787 17.9773L22.0617 19.0943C21.7685 19.1931 21.5265 19.4042 21.3889 19.6814C21.2514 19.9586 21.2296 20.2791 21.3284 20.5723C21.4271 20.8655 21.6383 21.1075 21.9155 21.2451C22.1927 21.3826 22.5131 21.4044 22.8064 21.3056L26.1233 20.1886C26.4166 20.0899 26.6586 19.8787 26.7961 19.6015C26.9336 19.3243 26.9554 19.0039 26.8567 18.7107C26.7579 18.4174 26.5467 18.1754 26.2696 18.0379C25.9924 17.9004 25.6719 17.8786 25.3787 17.9773ZM22.7611 6.5484C23.6408 6.25216 24.6021 6.31751 25.4337 6.73009C26.2652 7.14267 26.8988 7.86868 27.195 8.74839L27.5673 9.85405L5.45416 17.3006L5.08183 16.195C4.78559 15.3153 4.85094 14.3539 5.26352 13.5224C5.6761 12.6908 6.4021 12.0572 7.28182 11.761L22.7611 6.5484Z"
            fill="#0153F4"
          />
        </g>
        <defs>
          <clipPath id="clip0_63_988">
            <rect width="28" height="28" fill="white" transform="translate(0.26416 9.20001) rotate(-18.6109)" />
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>
);
