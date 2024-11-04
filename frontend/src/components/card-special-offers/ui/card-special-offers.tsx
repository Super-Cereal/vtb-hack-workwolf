import React from "react";

import { useObject } from "@/shared/model/object";
import { useUser } from "@/shared/model/user";
import { CardTemplate } from "@/shared/ui/card-template";
import { Checkbox } from "@/shared/ui/checkbox";

import styles from "./card-special-offers.module.css";

interface Props {
  objectId: number;
}

export const CardSpecialOffers = ({ objectId }: Props) => {
  const { isLoading: isUserLoading, data: user } = useUser();
  const { isLoading: isObjectLoading, data: object } = useObject(objectId);

  if (isUserLoading || isObjectLoading || !user || !object) {
    return <CardTemplate loading={true} />;
  }

  const title = `${object.name} растет – это ${object.type.toLowerCase()} ${object.level} уровня, он дарит вам:`;

  return (
    <CardTemplate title={title}>
      <div className={styles.checkboxes}>
        <Checkbox id="1" value="1">
          1
        </Checkbox>
        <Checkbox id="2" value="2">
          2
        </Checkbox>
        <Checkbox id="3" value="3">
          3
        </Checkbox>
      </div>
    </CardTemplate>
  );
};
