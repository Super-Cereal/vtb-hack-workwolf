import { backendUrl } from "./constants";

export const request = <T = unknown>(path: string, params?: RequestInit) =>
  fetch(backendUrl + path, {
    ...params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      ...params?.headers,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error("401");
    }

    return response.json() as T;
  });
