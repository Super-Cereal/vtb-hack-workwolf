import React from "react";

import { useUser } from "@/shared/model/user";
import { IconCoins } from "@/shared/ui/icons";

import styles from "./header.module.css";

export const Header = () => {
  const { isLoading, data } = useUser();

  if (isLoading || !data) {
    return <header className={styles.header}>загрузка...</header>;
  }

  return (
    <header className={styles.header}>
      <span className={styles.name}>{data.name}</span>

      <div className={styles.coins}>
        <span aria-label="Колличество валюты">{data.coins}</span>
        <IconCoins className={styles.iconCoins} />
      </div>
    </header>
  );
};
