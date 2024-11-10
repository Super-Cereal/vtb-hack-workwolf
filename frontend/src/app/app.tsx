import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthorizationPage } from "@/pages/authorizationPage";
import { LessonPage } from "@/pages/lessonPage";
import { LessonsListPage } from "@/pages/lessonsListPage";
import { LessonTestPage } from "@/pages/lessonTestPage";
import { MainPage } from "@/pages/mainPage";
import { ObjectPage } from "@/pages/objectPage/ui/objectPage";
import { staticUrls } from "@/shared/lib/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./app.css";

export const browserRouter = createBrowserRouter([
  { path: staticUrls.main, element: <MainPage /> },
  { path: staticUrls.object, element: <ObjectPage /> },

  { path: staticUrls.lessonsList, element: <LessonsListPage /> },
  { path: staticUrls.lesson, element: <LessonPage /> },
  { path: staticUrls.authorization, element: <AuthorizationPage /> },
  { path: staticUrls.lessonTest, element: <LessonTestPage /> },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={browserRouter} />
  </QueryClientProvider>
);
