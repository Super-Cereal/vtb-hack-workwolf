import { request } from "./base";

export const get = <Returns>(path: string, params?: RequestInit) =>
  request<Returns>(path, { method: "GET", ...params });
