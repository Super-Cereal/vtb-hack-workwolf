import { get, post } from "@/shared/lib/requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adapter_objectCard, type IObjectCardDTO } from "./adapters";
import { objectQueryKeys } from "./queryKeys";

export const useObject = (objectId: string) =>
  useQuery({
    queryKey: [objectQueryKeys.get, objectId],
    queryFn: () => get<IObjectCardDTO>(`/object-cards/${objectId}`),
    select: adapter_objectCard,
  });

export const useObjects = () =>
  useQuery({
    queryKey: [objectQueryKeys.getList],
    queryFn: () => get<IObjectCardDTO[]>("/object-cards/user"),
    select: (objectCards) => objectCards.map(adapter_objectCard),
  });

export const useObjectLevelUpdateMutation = () => {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: [objectQueryKeys.get] });
  queryClient.invalidateQueries({ queryKey: [objectQueryKeys.getList] });

  return useMutation({
    mutationFn: (objectCardId: string) => post(`/object-cards/level-up/${objectCardId}`),
  });
};
