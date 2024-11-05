import React, { type PropsWithChildren, useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import cx from "classnames";

import { Header } from "@/components/header";
import { staticUrls } from "@/shared/lib/routes";

import styles from "./page-template.module.css";

export const PageTemplate = ({ children }: PropsWithChildren) => {
  const isMainPage = Boolean(useMatch(staticUrls.main));

  const [showBigHeader, setshowBigHeader] = useState(isMainPage);

  useEffect(() => {
    if (isMainPage) {
      const updateScrollDirection = () => setshowBigHeader(window.scrollY < 25);

      window.addEventListener("scroll", updateScrollDirection);

      return () => {
        window.removeEventListener("scroll", updateScrollDirection);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMainPage]);

  return (
    <div className={cx(styles.page, isMainPage && styles.page_main)}>
      <div className={styles.header}>
        <Header shouldShowBigHeader={showBigHeader} withGoBackButton={!isMainPage} />
      </div>

      <div className={styles.layout}>{children}</div>
    </div>
  );
};
