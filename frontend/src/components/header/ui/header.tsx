import React from "react";
import { useNavigate } from "react-router-dom";
import cx from "classnames";

import { useUser } from "@/shared/model/user";
import { A11yButton } from "@/shared/ui/a11yButton";
import { IconCoins, IconShortArrowLeft, IconSpecialOffers } from "@/shared/ui/icons";

import { InfoBlock } from "./info-block";

import styles from "./header.module.css";

interface Props {
  shouldShowBigHeader?: boolean;
  withGoBackButton?: boolean;

  className?: string;
}

export const Header = ({ shouldShowBigHeader, withGoBackButton = false, className }: Props) => {
  const { isLoading, data } = useUser();
  const navigate = useNavigate();

  if (isLoading || !data) {
    return <header className={cx(styles.header, className)}>загрузка...</header>;
  }

  const onGoBack = () => navigate(-1);

  return (
    <header className={cx(styles.header, !shouldShowBigHeader && styles.header_scrolled, className)}>
      <div className={styles.leftCornerSlot}>
        {withGoBackButton ? (
          <A11yButton
            aria-label="Вернуться на предыдущую страницу"
            className={cx(styles.circle, styles.goBackButton)}
            onClick={onGoBack}
          >
            <IconShortArrowLeft />
          </A11yButton>
        ) : (
          <img alt="" className={cx(styles.circle, styles.userImg)} src="#" />
        )}

        {shouldShowBigHeader && !withGoBackButton && <span className={styles.userName}>{data.name}</span>}
      </div>

      <div className={styles.infoBlocksList}>
        <InfoBlock
          aria-label="Коллличество активированных спецпредложений"
          text={`${data.specialOffers}/10`}
          description={shouldShowBigHeader ? "спецпредложений активировано" : undefined}
          icon={<IconSpecialOffers />}
        />

        <InfoBlock
          aria-label="Колличество валюты"
          text={data.coins}
          description={shouldShowBigHeader ? "валюта" : undefined}
          icon={<IconCoins />}
        />
      </div>
    </header>
  );
};
