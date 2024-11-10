import { get } from "@/shared/lib/requests";
import { useQuery } from "@tanstack/react-query";

import type { IObjectCard } from "./types";

import { objectQueryKeys } from "./queryKeys";
import { objectMocks } from ".";

export const useObject = (objectId: number) =>
  useQuery({
    queryKey: [objectQueryKeys.get, objectId],
    queryFn: (): Promise<IObjectCard> =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(objectMocks.card);
        }, 2000);
      }),
  });

export const useObjects = () =>
  useQuery({
    queryKey: [objectQueryKeys.getList],
    queryFn: () => get<IObjectCard[]>("/object-cards/user"),
  });
