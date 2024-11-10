import { request } from "./base";

export const del = <Returns>(path: string, body?: BodyInit, params?: RequestInit) =>
  request<Returns>(path, {
    method: "DELETE",
    body,
    ...params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...params?.headers,
    },
  });
