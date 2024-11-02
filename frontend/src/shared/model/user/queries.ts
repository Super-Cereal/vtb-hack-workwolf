import { useQuery } from "@tanstack/react-query";

import type { IUser } from "./types";

import { userQueryKeys } from "./queryKeys";

export const useUser = () =>
  useQuery({
    queryKey: [userQueryKeys.get],
    queryFn: (): Promise<IUser> =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: 1, name: "Антон Рудольфович", coins: 5600 });
        }, 2000);
      }),
  });
