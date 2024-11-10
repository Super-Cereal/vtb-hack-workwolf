import React from "react";
import { useParams } from "react-router-dom";

import { CardProgress } from "@/components/card";
import { CardSpecialOffers } from "@/components/card-special-offers";
import { ProgressBar } from "@/components/progressBar";
import { useObject } from "@/shared/model/object";
import { CardTemplate } from "@/shared/ui/card-template";

import styles from "./objectDescription.module.css";

export const ObjectDescription = () => {
  const objectId = useParams().objectId!;

  const objectQuery = useObject(objectId);

  const { data: object } = objectQuery;
  const { name: objectName, category: objectCategory } = object?.objectInfo || {};

  return (
    <div>
      <CardProgress object={objectQuery.data} noProgress />

      <div className={styles.progressWrapper}>
        <h2 className={styles.progressTitle}>Прогресс</h2>

        <ProgressBar object={objectQuery.data} showNumericProgress canShowUpdateLevelBtn />
      </div>
      <CardTemplate loading={!object} view="primary" className={styles.progressDescription}>
        Чтобы повысить уровень &quot;{objectName}&quot; вам необходимо тратить деньги в любых заведениях категории
        &quot;{objectCategory}&quot; города. Тогда они будут развиваться и создавать полезную конкуренцию для &quot;
        {objectName}&quot;
      </CardTemplate>

      <CardSpecialOffers object={objectQuery.data} />
    </div>
  );
};
