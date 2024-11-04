import React from "react";
import { useParams } from "react-router-dom";

import { CardSpecialOffers } from "@/components/card-special-offers";

/** Страница обьекта */
export const ObjectPage = () => {
  const objectId = Number(useParams().objectId!);

  return (
    <div>
      <h1>ObjectPage</h1>

      <CardSpecialOffers objectId={objectId} />
    </div>
  );
};
