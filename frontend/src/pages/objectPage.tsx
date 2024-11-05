import React from "react";
import { useParams } from "react-router-dom";

import { CardSpecialOffers } from "@/components/card-special-offers";
import { PageTemplate } from "@/components/page-template";

/** Страница обьекта */
export const ObjectPage = () => {
  const objectId = Number(useParams().objectId!);

  return (
    <PageTemplate>
      <h1>ObjectPage</h1>

      <CardSpecialOffers objectId={objectId} />
    </PageTemplate>
  );
};
