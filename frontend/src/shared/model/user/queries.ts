import { get, post } from "@/shared/lib/requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { IRegisterUserDTO } from "./types";

import { adapter_userQuery, type IUserDTO } from "./adapters";
import { userQueryKeys } from "./queryKeys";

export const useUserQuery = () =>
  useQuery({
    queryKey: [userQueryKeys.get],
    queryFn: () => get<IUserDTO>("/auth/profile"),
    select: adapter_userQuery,
    retry: false,
  });

export const useRegisterUserMutation = () => {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: [userQueryKeys.get] });

  return useMutation({
    mutationKey: [userQueryKeys.register],
    mutationFn: (body: IRegisterUserDTO) => post<{ access_token: string }>("/auth/register", JSON.stringify(body)),
    onSuccess: ({ access_token }) => {
      localStorage.setItem("accessToken", access_token);
    },
  });
};
