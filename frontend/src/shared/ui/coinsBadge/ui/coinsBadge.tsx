import React from "react";
import cx from "classnames";

import { IconCoins } from "@/shared/ui/icons";

import styles from "./coinsBadge.module.css";

interface Props {
  className?: string;
  coins: number;
  view?: "primary" | "secondary";
}

export const CoinsBadge = ({ className, coins, view = "primary" }: Props) => (
  <div className={cx(styles.coinWrapper, styles[`coinWrapper_${view}`], className)}>
    <span className={styles.coinValue}>{coins}</span>
    <div className={styles.coinCircle}>
      <IconCoins />
    </div>
  </div>
);
