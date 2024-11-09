import React from "react";
import cx from "classnames";

import { CardTemplate } from "@/shared/ui/card-template";

import styles from "./partnerBanner.module.css";

// @ts-expect-error webpack не доработан
import bg from "./bg.png";

interface Props {
  title?: string;
  description?: string;
  className?: string;
  href?: string;
}

export const PartnerBanner = ({ title, description, className, href }: Props) => (
  <CardTemplate
    className={cx(styles.card, className)}
    title={<span className={styles.text}>{title}</span>}
    subtitle={<span className={styles.text}>{description}</span>}
    titleSize="l"
    titleTag="h2"
    view="secondary"
    href={href}
    backgroundSrc={bg}
  />
);
