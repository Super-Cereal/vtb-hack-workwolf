import React from "react";

import type { IObjectCard } from "@/shared/model/object";
import { useObjectLevelUpdateMutation } from "@/shared/model/object/queries";
import { CoinsBadge } from "@/shared/ui/coinsBadge";

import { Button } from "../../../shared/ui/button";

import styles from "./progressBar.module.css";

interface Props {
  object: IObjectCard | undefined;
  showNumericProgress?: boolean;
  canShowUpdateLevelBtn?: boolean;
}

export function ProgressBar({ object, showNumericProgress, canShowUpdateLevelBtn }: Props) {
  const { mutate: levelUpBtn } = useObjectLevelUpdateMutation();

  if (!object) {
    return null;
  }

  const { nextLevelCost } = object.objectLevel;
  const progressWidth = nextLevelCost ? (object.progress / nextLevelCost) * 100 : 100;

  const showUpdateLevelBtn = canShowUpdateLevelBtn && progressWidth === 100;

  const handleLevelUp = () => {
    levelUpBtn(object.id);
  };

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

      {showUpdateLevelBtn && (
        <div className={styles.updateLevelBtnWrapper}>
          <Button className={styles.updateLevelBtn} onClick={handleLevelUp}>
            Повысить уровень!
          </Button>

          {typeof object.objectLevel.gamecoins === "number" && (
            <CoinsBadge view="secondary" coins={object.objectLevel.gamecoins} />
          )}
        </div>
      )}
    </div>
  );
}
