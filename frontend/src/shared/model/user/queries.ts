import { useQuery } from "@tanstack/react-query";

import type { IUser } from "./types";

import { userQueryKeys } from "./queryKeys";
import { userMocks } from ".";

export const useUser = () =>
  useQuery({
    queryKey: [userQueryKeys.get],
    queryFn: (): Promise<IUser> =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(userMocks.user);
        }, 2000);
      }),
  });
