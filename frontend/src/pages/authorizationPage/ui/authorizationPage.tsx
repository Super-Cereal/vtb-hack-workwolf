import React from "react";

import { PageTemplate } from "@/components/page-template";

import { AuthorizationForm } from "./authorizationForm";

export const AuthorizationPage = () => (
  <PageTemplate noAuth noHeader>
    <AuthorizationForm />
  </PageTemplate>
);
