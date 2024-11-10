import React, { useState } from "react";

import { getPluralForm } from "@/shared/lib/plurals";
import { appConfig } from "@/shared/model/appConfig";
import { useObject } from "@/shared/model/object";
import type { ISpecialOffer } from "@/shared/model/specialOffers";
import { useUserQuery } from "@/shared/model/user";
import { CardTemplate } from "@/shared/ui/card-template";
import { Checkbox } from "@/shared/ui/checkbox";

import styles from "./card-special-offers.module.css";

interface Props {
  objectId: number;
}

/** Карточка со списком спецпредложений */
export const CardSpecialOffers = ({ objectId }: Props) => {
  const { isLoading: isUserLoading, data: user } = useUserQuery();
  const { isLoading: isObjectLoading, data: object } = useObject(objectId);

  const [checkedItems, setCheckedItems] = useState<Record<ISpecialOffer["id"], true>>({});

  if (isUserLoading || isObjectLoading || !user || !object) {
    return <CardTemplate loading={true} />;
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newCheckedItems = { ...checkedItems };

    const checkboxId = event.target.id;

    if (checkedItems[checkboxId]) {
      delete newCheckedItems[checkboxId];
      setCheckedItems({ ...newCheckedItems });
    } else {
      setCheckedItems({ ...newCheckedItems, [checkboxId]: true });
    }
  };

  const availableSpecialOffersCount =
    appConfig.maxSpecialOffers - user.activeSpecialOffers.length - Object.keys(checkedItems).length;

  const title =
    `${object.objectInfo.name} растет – это ${object.objectInfo.category.toLowerCase()} ` +
    `${object.objectLevel.level} уровня, он дарит вам:`;

  const hint = !availableSpecialOffersCount
    ? "Нужно отказаться от какого-нибудь предложения, чтобы выбрать новые"
    : `Вы можете выбрать еще ${availableSpecialOffersCount} ` +
      getPluralForm(availableSpecialOffersCount, "предложение", "предложения", "предложений");

  return (
    <CardTemplate title={title} titleTag="h2" separatedTitle view="secondary">
      <div className={styles.checkboxes}>
        {object.objectLevel.specialOffers.map(({ id, description }) => (
          <Checkbox
            disabled={!checkedItems[id] && availableSpecialOffersCount === 0}
            checked={Boolean(checkedItems[id])}
            onChange={handleChange}
            key={id}
            id={id}
            value={id}
          >
            {description}
          </Checkbox>
        ))}
      </div>

      <div className={styles.hint}>{hint}</div>
    </CardTemplate>
  );
};
