import React, { useEffect, useState } from "react";

import { getPluralForm } from "@/shared/lib/plurals";
import { appConfig } from "@/shared/model/appConfig";
import type { IObjectCard } from "@/shared/model/object";
import type { ISpecialOffer } from "@/shared/model/specialOffers";
import { useSpecialOffersMutation } from "@/shared/model/specialOffers/queries";
import { useUserQuery } from "@/shared/model/user";
import { Button } from "@/shared/ui/button";
import { CardTemplate } from "@/shared/ui/card-template";
import { Checkbox } from "@/shared/ui/checkbox";

import styles from "./card-special-offers.module.css";

interface Props {
  object: IObjectCard | undefined;
}

/** Карточка со списком спецпредложений */
export const CardSpecialOffers = ({ object }: Props) => {
  const { data: user } = useUserQuery();
  const { mutate: saveSpecialOffers } = useSpecialOffersMutation();

  const [checkedItems, setCheckedItems] = useState<Record<ISpecialOffer["id"], true>>({});

  useEffect(() => {
    if (user) {
      const updatedCheckedItems = { ...checkedItems };

      for (const activeSpecialOffer of user.activeSpecialOffers) {
        updatedCheckedItems[activeSpecialOffer.id] = true;
      }

      setCheckedItems(updatedCheckedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user || !object) {
    return <CardTemplate loading={true} />;
  }

  if (!object.objectLevel.specialOffers?.length) {
    return null;
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
    appConfig.maxSpecialOffers -
    user.activeSpecialOffers.length -
    Object.keys(checkedItems).filter((id) => !user.activeSpecialOffers.find((v) => v.id === id)).length;

  const title =
    `"${object.objectInfo.name}" растет – это ${object.objectInfo.category.toLowerCase().slice(0, object.objectInfo.category.length - 1)} ` +
    `${object.objectLevel.level} уровня, он дарит вам:`;

  const hint = !availableSpecialOffersCount
    ? "Нужно отказаться от какого-нибудь предложения, чтобы выбрать новые"
    : `Вы можете выбрать еще ${availableSpecialOffersCount} ` +
      getPluralForm(availableSpecialOffersCount, "предложение", "предложения", "предложений");

  const handleSave = () => {
    const data: Record<ISpecialOffer["id"], boolean> = {};

    Object.keys(checkedItems).forEach((id) => {
      if (!user.activeSpecialOffers.find((v) => v.id === id)) {
        data[id] = true;
      }
    });
    user.activeSpecialOffers.forEach(({ id }) => {
      if (!checkedItems[id]) {
        data[id] = false;
      }
    });

    if (Object.keys(data).length) {
      saveSpecialOffers(data);
    }
  };

  return (
    <CardTemplate title={title} titleTag="h2" separatedTitle view="secondary">
      <div className={styles.checkboxes}>
        {object.objectLevel.specialOffers?.map(({ id, description }) => (
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

      <Button className={styles.btn} onClick={handleSave} disabled={!availableSpecialOffersCount}>
        Сохранить
      </Button>
    </CardTemplate>
  );
};
