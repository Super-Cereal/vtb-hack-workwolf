import React from "react";

import { CardProgress } from "@/components/card";
import { PageTemplate } from "@/components/page-template";
import { useObjects } from "@/shared/model/object";
import { Loader } from "@/shared/ui/loader";

import styles from "./mainPage.module.css";

/** Главная страница */
export const MainPage = () => {
  const { isLoading, data: objects } = useObjects();

  return (
    <PageTemplate>
      {isLoading || !objects ? (
        <Loader />
      ) : (
        <div className={styles.list}>
          {objects.map((object) => (
            <CardProgress key={object.id} object={object} />
          ))}
        </div>
      )}
    </PageTemplate>
  );
};
