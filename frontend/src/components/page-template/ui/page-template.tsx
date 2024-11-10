import React, { type PropsWithChildren, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import cx from "classnames";

import { Header } from "@/components/header";
import { staticUrls } from "@/shared/lib/routes";
import { useUserQuery } from "@/shared/model/user";

import styles from "./page-template.module.css";

interface Props extends PropsWithChildren {
  /** @default false */
  noHeader?: boolean;

  /** @default false */
  noAuth?: boolean;
}

type OwnProps = Omit<Props, "withAuth">;

const PageTemplateWithoutAuth = ({ noHeader = false, children }: OwnProps) => {
  const isMainPage = Boolean(useMatch(staticUrls.main));

  const [showBigHeader, setshowBigHeader] = useState(isMainPage);

  useEffect(() => {
    if (!noHeader && isMainPage) {
      const updateScrollDirection = () => setshowBigHeader(window.scrollY < 25);

      window.addEventListener("scroll", updateScrollDirection);

      return () => {
        window.removeEventListener("scroll", updateScrollDirection);
      };
    }
  }, [isMainPage, noHeader]);

  return (
    <div className={cx(styles.page, isMainPage && styles.page_bigHeader, noHeader && styles.page_noHeader)}>
      {!noHeader && (
        <div className={styles.header}>
          <Header shouldShowBigHeader={showBigHeader} withGoBackButton={!isMainPage} />
        </div>
      )}

      <div className={styles.layout}>{children}</div>
    </div>
  );
};

const PageTemplateWithAuth = (props: OwnProps) => {
  const { isLoading, isError } = useUserQuery();

  const navigate = useNavigate();

  if (isLoading) {
    return null;
  }

  if (isError) {
    navigate(staticUrls.authorization);

    return;
  }

  return <PageTemplateWithoutAuth {...props} />;
};

export const PageTemplate = ({ noAuth = false, ...props }: Props) =>
  noAuth ? <PageTemplateWithoutAuth {...props} /> : <PageTemplateWithAuth {...props} />;
