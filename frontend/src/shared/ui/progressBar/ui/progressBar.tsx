import React from "react";

import { IObjectCard } from "@/shared/model/object";

import styles from "./progressBar.module.css";

interface Props {
  object: IObjectCard | undefined;
  showNumericProgress?: boolean;
}

export function ProgressBar({ object, showNumericProgress }: Props) {
  if (!object) {
    return null;
  }

  const { levelCost, nextLevelCost } = object.objectLevel;
  const progressWidth = Math.max(0, (object.progress - levelCost) / (nextLevelCost - levelCost || 1));

  return (
    <div className={styles.wrapper}>
      <div className={styles.emptyLine}>
        <div className={styles.filledPart} style={{ width: `${progressWidth}%` }} />
      </div>

      {showNumericProgress && (
        <div className={styles.numericProgress}>
          <span>{object.progress}</span>
          <span>{nextLevelCost}</span>
        </div>
      )}
    </div>
  );
}
