import { get, post } from "@/shared/lib/requests";
import { useMutation, useQuery } from "@tanstack/react-query";

import type { IRegisterUserDTO, IUserDTO } from "./types";

import { adapter_userQuery } from "./adapters";
import { userQueryKeys } from "./queryKeys";

export const useUserQuery = () =>
  useQuery({
    queryKey: [userQueryKeys.get],
    queryFn: () => get<IUserDTO>("/auth/profile"),
    select: adapter_userQuery,
    retry: false,
  });

export const useRegisterUserMutation = () =>
  useMutation({
    mutationKey: [userQueryKeys.register],
    mutationFn: (body: IRegisterUserDTO) => post<{ access_token: string }>("/auth/register", JSON.stringify(body)),
    onSuccess: ({ access_token }) => {
      localStorage.setItem("accessToken", access_token);
    },
  });
