import React, { type ElementType, type PropsWithChildren, type ReactNode } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

import { Loader } from "../../loader";

import styles from "./card-template.module.css";

interface Props extends PropsWithChildren {
  title?: ReactNode;
  titleTag?: ElementType;
  subtitle?: ReactNode;
  titleSize?: "m" | "l";

  /** Отрендерить заголовок над карточкой */
  separatedTitle?: boolean;

  loading?: boolean;
  view?: "secondary" | "primary";
  className?: string;

  /** Если передана, то отображается как ссылка */
  href?: string;

  /** Если передана, то отображается как подложка */
  backgroundSrc?: string;
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
  titleSize = "m",

  loading,
  view = "primary",
  className,
  children,

  href,
  backgroundSrc,
}: Props) => {
  const title = titleFromProps && (
    <div
      className={cx(
        styles.titleWrapper,
        titleSize && styles[`titleWrapper_${titleSize}`],
        separatedTitle && styles.titleWrapper_separated,
      )}
    >
      <TitleTag className={styles.title}>{titleFromProps}</TitleTag>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  );

  const content = (
    <>
      {!loading && separatedTitle && title}

      <div className={styles.innerWrapper}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.fixZIndex}>
              {!separatedTitle && title}
              <div className={styles.content}>{children}</div>
            </div>

            {backgroundSrc && <img alt="" className={styles.bg} src={backgroundSrc} />}
          </>
        )}
      </div>
    </>
  );

  const classNames = cx(styles.card, styles[`card_${view}`], className);

  return href ? (
    <Link className={classNames} to={href} target="_blank" rel="noopener noreferrer">
      {content}
    </Link>
  ) : (
    <div className={classNames}>{content}</div>
  );
};
