import React from "react";
import cx from "classnames";

import { Button } from "@/shared/ui/button";
import { CardTemplate } from "@/shared/ui/card-template";
import { CoinsBadge } from "@/shared/ui/coinsBadge";

import styles from "./lessonBanner.module.css";

// @ts-expect-error webpack не доработан
import bg from "./bg.png";

interface Props {
  title?: string;
  description?: string;
  className?: string;

  onButtonClick?: () => void;
  disabled?: boolean;

  coinCount?: number;
  currentStep?: number;
  totalSteps?: number;
}

export const LessonBanner = ({
  title,
  description,
  className,
  onButtonClick,
  coinCount,
  currentStep,
  totalSteps,
}: Props) => (
  <CardTemplate
    className={cx(styles.card, className)}
    title={title}
    subtitle={description}
    titleSize="l"
    titleTag="h2"
    view="secondary"
    backgroundSrc={bg}
  >
    {/* Синяя плашка с текстом, отображается только если указаны currentStep и totalSteps */}
    {currentStep !== undefined && totalSteps !== undefined && (
      <div className={styles.footer}>
        <Button onClick={onButtonClick}>К прохождению</Button>

        {coinCount !== undefined && <CoinsBadge coins={coinCount} />}
      </div>
    )}

    {/* Прогресс, отображается только если указаны currentStep и totalSteps */}
    {currentStep !== undefined && totalSteps !== undefined && (
      <div className={styles.progress}>{`${currentStep} / ${totalSteps}`}</div>
    )}
  </CardTemplate>
);
