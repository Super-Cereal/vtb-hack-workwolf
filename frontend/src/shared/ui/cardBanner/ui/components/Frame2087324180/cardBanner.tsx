import React, { FC, memo } from "react";

import { Ellipse17Icon } from "./Ellipse17Icon";
import { Ellipse22Icon } from "./Ellipse22Icon";
import { Ellipse29Icon } from "./Ellipse29Icon";
import { Ellipse31Icon } from "./Ellipse31Icon";
import { Ellipse33Icon } from "./Ellipse33Icon";
import { Ellipse35Icon } from "./Ellipse35Icon";
import { Ellipse36Icon } from "./Ellipse36Icon";
import { Ellipse37Icon } from "./Ellipse37Icon";
import { Ellipse38Icon } from "./Ellipse38Icon";
import { Ellipse39Icon } from "./Ellipse39Icon";
import { Ellipse40Icon } from "./Ellipse40Icon";
import { Ellipse41Icon } from "./Ellipse41Icon";
import { Ellipse42Icon } from "./Ellipse42Icon";
import { Ellipse43Icon } from "./Ellipse43Icon";

import classes from "../../cardBanner.module.css";
import resets from "../_resets.module.css";

interface Props {
  title?: string;
  description?: string;
  className?: string;
  href?: string; // Обновленный интерфейс Props с href
}

export const CardBanner: FC<Props> = memo(function CardBanner({ title, description, className, href }) {
  return (
    <a
      href={href} // Используем href из props
      target="_blank" // Открыть в новой вкладке
      rel="noopener noreferrer" // Для безопасности при открытии внешних ссылок
      className={`${resets.clapyResets} ${classes.root} ${classes.card} ${className}`}
    >
      <div className={`${resets.clapyResets} ${classes.root} ${classes.card} ${className}`}>
        <div className={classes.ellipse29}>
          <Ellipse29Icon className={classes.icon} />
        </div>
        <div className={classes.rectangle51}></div>
        <div className={classes.ellipse17}>
          <Ellipse17Icon className={classes.icon2} />
        </div>
        <div className={classes.ellipse35}>
          <Ellipse35Icon className={classes.icon3} />
        </div>
        <div className={classes.ellipse41}>
          <Ellipse41Icon className={classes.icon4} />
        </div>
        <div className={classes.ellipse39}>
          <Ellipse39Icon className={classes.icon5} />
        </div>
        <div className={classes.ellipse31}>
          <Ellipse31Icon className={classes.icon6} />
        </div>
        <div className={classes.ellipse36}>
          <Ellipse36Icon className={classes.icon7} />
        </div>
        <div className={classes.ellipse33}>
          <Ellipse33Icon className={classes.icon8} />
        </div>
        <div className={classes.ellipse37}>
          <Ellipse37Icon className={classes.icon9} />
        </div>
        <div className={classes.ellipse38}>
          <Ellipse38Icon className={classes.icon10} />
        </div>
        <div className={classes.ellipse43}>
          <Ellipse43Icon className={classes.icon11} />
        </div>
        <div className={classes.ellipse42}>
          <Ellipse42Icon className={classes.icon12} />
        </div>
        <div className={classes.ellipse40}>
          <Ellipse40Icon className={classes.icon13} />
        </div>

        {/* Заголовок и описание */}
        {title && <h2 className={classes.title}>{title}</h2>}
        {description && <div className={classes.description}>{description}</div>}

        {/* Иконка */}
        <div className={classes.ellipse22}>
          <Ellipse22Icon className={classes.icon14} />
        </div>
      </div>
    </a>
  );
});
