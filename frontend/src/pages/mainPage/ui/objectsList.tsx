import React from "react";

import { CardProgress } from "@/components/card";
import { useObjects } from "@/shared/model/object";
import { Loader } from "@/shared/ui/loader";

import styles from "./objectsList.module.css";

export const ObjectsList = () => {
  const { isLoading, data: objects } = useObjects();
  debugger;

  if (isLoading || !objects) {
    return <Loader />;
  }

  return (
    <div className={styles.list}>
      {objects.map((object) => (
        <CardProgress key={object.id} object={object} />
      ))}
    </div>
  );
};
