import React, { useEffect, useState } from "react";
import cx from "classnames";

import { useUser } from "@/shared/model/user";
import { IconCoins, IconSpecialOffers } from "@/shared/ui/icons";

import styles from "./header.module.css";

interface Props {
  className?: string;
}

export const Header = ({ className }: Props) => {
  const { isLoading, data } = useUser();

  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading || !data) {
    return <header className={cx(styles.header, className)}>загрузка...</header>;
  }

  return (
    <header className={cx(styles.header, isScrolled && styles.header_scrolled, className)}>
      <div className={styles.userWrapper}>
        <div className={styles.imgWrapper}>
          <img src="#" alt="" />
        </div>

        {!isScrolled && <span className={styles.userName}>{data.name}</span>}
      </div>

      <div className={styles.infoBlocksList}>
        <div className={styles.infoBlock}>
          <span aria-label="Коллличество активированных спецпредложений">{data.specialOffers}/10</span>

          {!isScrolled && (
            <span aria-hidden="true" className={styles.infoText}>
              спецпредложений активировано
            </span>
          )}

          <div className={styles.iconWrapper}>
            <IconSpecialOffers />
          </div>
        </div>

        <div className={styles.infoBlock}>
          <span aria-label="Колличество валюты">{data.coins}</span>

          {!isScrolled && (
            <span aria-hidden="true" className={styles.infoText}>
              валюта
            </span>
          )}

          <div className={styles.iconWrapper}>
            <IconCoins />
          </div>
        </div>
      </div>
    </header>
  );
};
