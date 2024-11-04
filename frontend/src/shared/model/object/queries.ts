import { useQuery } from "@tanstack/react-query";

import type { IObject } from "./types";

import { objectQueryKeys } from "./queryKeys";

export const useObject = (objectId: number) =>
  useQuery({
    queryKey: [objectQueryKeys.get, objectId],
    queryFn: (): Promise<IObject> =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: objectId, name: "ВТБ-Гурман", level: 2, type: "Ресторан" });
        }, 2000);
      }),
  });
