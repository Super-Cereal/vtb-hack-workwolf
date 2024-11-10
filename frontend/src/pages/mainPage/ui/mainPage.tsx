import React from "react";
import { useNavigate } from "react-router-dom";

import { PageTemplate } from "@/components/page-template";
import { ObjectsList } from "./objectsList";
import { Button } from "@/shared/ui/button";

/** Главная страница */
export const MainPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/lessons");
  };

  return (
    <PageTemplate>
         <Button onClick={handleButtonClick} fullWidth>Уроки финансовой грамотности</Button>
      <ObjectsList />
    </PageTemplate>
  );
};
