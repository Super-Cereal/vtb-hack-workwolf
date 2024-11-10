import React from "react";
import { useParams } from "react-router-dom";

import { CardSpecialOffers } from "@/components/card-special-offers";

export const ObjectDescription = () => {
  const objectId = useParams().objectId!;

  return (
    <div>
      <CardSpecialOffers objectId={objectId} />
    </div>
  );
};
