import React, { type ElementType, type PropsWithChildren } from "react";
import cx from "classnames";

import { Loader } from "../../loader";

import styles from "./card-template.module.css";

interface Props extends PropsWithChildren {
  title?: string;
  titleTag?: ElementType;
  loading?: boolean;
  color?: "secondary" | "special";
  className?: string;
}

/**
 * Шаблонная карточка, в которой уже есть заголовок и стили для отступов и шрифтов
 *
 * @example
 *  <CardTemplate title="ВТБ-Гурман растет – это ресторан второго уровня, он дарит вам:" titleTag="h1">
 *    <input id="one" type="checkbox" name="one" /> <label for="one">one</label>
 *    <input id="two" type="checkbox" name="two" /> <label for="two">two</label>
 *  </CardTemplate>
 * */
export const CardTemplate = ({
  title,
  titleTag: TitleTag = "span",
  loading,
  color = "secondary",
  className,
  children,
}: Props) => (
  <div className={cx(styles.card, styles[`card_${color}`], className)}>
    {loading ? (
      <Loader />
    ) : (
      <>
        {title && <TitleTag className={styles.title}>{title}</TitleTag>}

        <div className={styles.content}>{children}</div>
      </>
    )}
  </div>
);
