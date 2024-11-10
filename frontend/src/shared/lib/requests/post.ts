import { request } from "./base";

export const post = <Returns>(path: string, body?: BodyInit, params?: RequestInit) =>
  request<Returns>(path, {
    method: "POST",
    body,
    ...params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...params?.headers,
    },
  });
