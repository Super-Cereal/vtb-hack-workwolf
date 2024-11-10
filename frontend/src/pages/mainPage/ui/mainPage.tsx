import React from "react";

import { PageTemplate } from "@/components/page-template";

import { ObjectsList } from "./objectsList";

/** Главная страница */
export const MainPage = () => (
  <PageTemplate>
    <ObjectsList />
  </PageTemplate>
);
