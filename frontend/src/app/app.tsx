import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Header } from "@/components/header/ui/header";
import { LessonPage } from "@/pages/lessonPage";
import { LessonsListPage } from "@/pages/lessonsListPage";
import { LessonTestPage } from "@/pages/lessonTestPage";
import { MainPage } from "@/pages/mainPage";
import { ObjectPage } from "@/pages/objectPage";
import { staticUrls } from "@/shared/lib/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./app.css";
import styles from "./app.module.css";

export const browserRouter = createBrowserRouter([
  { path: staticUrls.main, element: <MainPage /> },
  { path: staticUrls.object, element: <ObjectPage /> },

  { path: staticUrls.lessonsList, element: <LessonsListPage /> },
  { path: staticUrls.lesson, element: <LessonPage /> },
  { path: staticUrls.lessonTest, element: <LessonTestPage /> },
]);

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className={styles.page}>
      <div className={styles.layout}>
        <Header className={styles.header} />

        <RouterProvider router={browserRouter} />
      </div>
    </div>
  </QueryClientProvider>
);
