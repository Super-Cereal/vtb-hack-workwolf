import React, { type ElementType, type PropsWithChildren } from "react";
import cx from "classnames";

import styles from "./card.module.css";

interface Props extends PropsWithChildren {
  title?: string;
  titleTag?: ElementType;
  className?: string;
}

/**
 * Шаблонная карточка, в которой уже есть заголовок и стили для отступов и шрифтов
 *
 * @example
 *  <Card title="ВТБ-Гурман растет – это ресторан второго уровня, он дарит вам:" titleTag="h1">
 *    <input id="one" type="checkbox" name="one" /> <label for="one">one</label>
 *    <input id="two" type="checkbox" name="two" /> <label for="two">two</label>
 *  </Card>
 * */
export const Card = ({ title, titleTag: TitleTag = "span", className, children }: Props) => (
  <div className={cx(styles.card, className)}>
    {title && <TitleTag className={styles.title}>{title}</TitleTag>}

    <div className={styles.content}>{children}</div>
  </div>
);
