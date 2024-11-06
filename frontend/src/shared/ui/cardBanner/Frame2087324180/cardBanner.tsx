import React, { memo } from "react";
import { FC } from "react";

import { Ellipse17Icon } from "../ui/components/Frame2087324180/Ellipse17Icon";
import { Ellipse22Icon } from "../ui/components/Frame2087324180/Ellipse22Icon";
import { Ellipse29Icon } from "../ui/components/Frame2087324180/Ellipse29Icon";
import { Ellipse31Icon } from "../ui/components/Frame2087324180/Ellipse31Icon";
import { Ellipse33Icon } from "../ui/components/Frame2087324180/Ellipse33Icon";
import { Ellipse35Icon } from "../ui/components/Frame2087324180/Ellipse35Icon";
import { Ellipse36Icon } from "../ui/components/Frame2087324180/Ellipse36Icon";
import { Ellipse37Icon } from "../ui/components/Frame2087324180/Ellipse37Icon";
import { Ellipse38Icon } from "../ui/components/Frame2087324180/Ellipse38Icon";
import { Ellipse39Icon } from "../ui/components/Frame2087324180/Ellipse39Icon";
import { Ellipse40Icon } from "../ui/components/Frame2087324180/Ellipse40Icon";
import { Ellipse41Icon } from "../ui/components/Frame2087324180/Ellipse41Icon";
import { Ellipse42Icon } from "../ui/components/Frame2087324180/Ellipse42Icon";
import { Ellipse43Icon } from "../ui/components/Frame2087324180/Ellipse43Icon";

import classes from "../../cardBanner.module.css";
import resets from "../_resets.module.css";

interface Props {
  title?: string;
  description?: string;
  className?: string;
}

export const CardWithCircles: FC<Props> = memo(function CardWithCircles({ title, description, className }) {
  return (
    <div className={`${resets.clapyResets} ${classes.root} ${className}`}>
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
      {title && <h2 className={classes.unnamed}>{title}</h2>}
      {description && <div className={classes.unnamed2}>{description}</div>}

      {/* Иконка */}
      <div className={classes.ellipse22}>
        <Ellipse22Icon className={classes.icon14} />
      </div>
    </div>
  );
});
