import React, { type ElementType, type PropsWithChildren, type ReactNode } from "react";
import cx from "classnames";

import { Loader } from "../../loader";

import styles from "./card-template.module.css";

interface Props extends PropsWithChildren {
  title?: string;
  titleTag?: ElementType;
  subtitle?: ReactNode;

  /** Отрендерить заголовок над карточкой */
  separatedTitle?: boolean;

  loading?: boolean;
  view?: "secondary" | "primary";
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
  title: titleFromProps,
  titleTag: TitleTag = "span",
  separatedTitle,
  subtitle,

  loading,
  view = "primary",
  className,
  children,
}: Props) => {
  const title = titleFromProps && (
    <div className={cx(styles.titleWrapper, separatedTitle && styles.titleWrapper_separated)}>
      <TitleTag className={styles.title}>{titleFromProps}</TitleTag>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  );

  return (
    <div className={cx(styles.card, styles[`card_${view}`], className)}>
      {!loading && separatedTitle && title}

      <div className={styles.innerWrapper}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {!separatedTitle && title}

            <div className={styles.content}>{children}</div>
          </>
        )}
      </div>
    </div>
  );
};
