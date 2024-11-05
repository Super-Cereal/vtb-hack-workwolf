import React, { type ReactNode } from "react";

import styles from "./info-block.module.css";

interface Props {
  "aria-label": string;
  text: ReactNode;
  description: string | undefined;
  icon: ReactNode;
}

export const InfoBlock = ({ "aria-label": ariaLabel, text, description, icon }: Props) => (
  <div className={styles.infoBlock}>
    <span aria-label={ariaLabel}>{text}</span>

    {description && (
      <span aria-hidden="true" className={styles.infoText}>
        {description}
      </span>
    )}

    <div className={styles.iconWrapper}>{icon}</div>
  </div>
);
