import React from "react";
import { generatePath, Link } from "react-router-dom";
import cx from "classnames";

import { staticUrls } from "@/shared/lib/routes";
import { IObjectCard } from "@/shared/model/object";
import { CardTemplate } from "@/shared/ui/card-template";

import styles from "./cardProgress.module.css";

interface Props {
  object: IObjectCard | undefined;
  noProgress?: boolean;
  withLinkToObjectPage?: boolean;
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

export function CardProgress({ object, noProgress = false, withLinkToObjectPage = false }: Props) {
  if (!object) {
    return <CardTemplate loading view="primary" />;
  }

  const { id: objectId, objectInfo, objectLevel, progress } = object;

  const start = objectLevel.levelCost;
  const end = objectLevel.nextLevelCost;
  const paragraph = objectInfo.shortDecsiption;
  const lvl_card = `${objectLevel.level} уровень`;
  const card_image = objectInfo.image;
  const title = objectInfo.name;

  const isCollapsed = !paragraph && !card_image && lvl_card === "Уровень";

  // Вычисление прогресса, если заданы `start` и `end`
  const calculatedProgress = start !== undefined && end !== undefined ? (start / end) * 100 : progress;

  const link = generatePath(staticUrls.object, { objectId: String(objectId) });

  const content = (
    <>
      <div className={styles.card_header} style={{ display: card_image ? "block" : "none" }}>
        {card_image && (
          <div className={styles.card_image}>
            <img src={card_image} alt="card_image" />
          </div>
        )}
        {lvl_card !== "Уровень" && <div className={styles.lvl_card}>{lvl_card}</div>}
      </div>
      <div className={isCollapsed ? styles.block_description_card_noneBorder : styles.block_description_card}>
        <h3>{title}</h3>
        {paragraph && <p className={styles.paragraph}>{paragraph}</p>}

        {!noProgress && (
          <>
            <div className={isCollapsed ? styles.progress_bar_lil : styles.progress_bar}>
              <div
                className={isCollapsed ? styles.progress_fill_lil : styles.progress_fill}
                style={{ width: `${calculatedProgress}%` }}
              ></div>
            </div>

            {/* Отображение start и end только если они определены */}
            {start !== undefined && end !== undefined && (
              <div className={styles.progress_status}>
                <div className={styles.start}>{start}</div>
                <div className={styles.end}>{end}</div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );

  const classNames = cx(styles.card_progress, isCollapsed ? styles.collapsed : "");

  return withLinkToObjectPage ? (
    <Link to={link} className={cx(styles.card_link, classNames)}>
      {content}
    </Link>
  ) : (
    <div className={classNames}>{content}</div>
  );
}
