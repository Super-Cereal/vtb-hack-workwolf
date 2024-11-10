import React from "react";
import cx from "classnames";
import { useNavigate } from "react-router-dom";

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
  lessonId: string;
}

export const LessonBanner = ({
  title,
  description,
  className,
  lessonId,
  coinCount,
  /* currentStep,
  totalSteps, */
}: Props) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <CardTemplate
      className={cx(styles.card, className)}
      title={title}
      subtitle={description}
      titleSize="l"
      titleTag="h2"
      view="secondary"
      backgroundSrc={bg}
    >
      <div className={styles.footer}>
        <Button onClick={handleButtonClick}>К прохождению</Button>

        {coinCount !== undefined && <CoinsBadge coins={coinCount} />}
      </div>
    </CardTemplate>
  );
};
