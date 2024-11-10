import { del, post } from "@/shared/lib/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ISpecialOffer } from "./types";

import { userQueryKeys } from "../user";

export const useSpecialOffersMutation = () => {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: [userQueryKeys.get] });

  return useMutation({
    mutationFn: (ids: Record<ISpecialOffer["id"], boolean>) =>
      Promise.all(
        Object.keys(ids).map((specialOfferId) =>
          ids[specialOfferId]
            ? post("/object-cards/special-offers", JSON.stringify({ specialOfferId }))
            : del("/object-cards/special-offers", JSON.stringify({ specialOfferId })),
        ),
      ),
  });
};
