import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LessonPage } from "@/pages/lessonPage";
import { LessonsListPage } from "@/pages/lessonsListPage";
import { LessonTestPage } from "@/pages/lessonTestPage";
import { MainPage } from "@/pages/mainPage";
import { ObjectPage } from "@/pages/objectPage";
import { staticUrls } from "@/shared/lib/routes";

import "./app.css";

export const browserRouter = createBrowserRouter([
  { path: staticUrls.main, element: <MainPage /> },
  { path: staticUrls.object, element: <ObjectPage /> },

  { path: staticUrls.lessonsList, element: <LessonsListPage /> },
  { path: staticUrls.lesson, element: <LessonPage /> },
  { path: staticUrls.lessonTest, element: <LessonTestPage /> },
]);

export const App = () => <RouterProvider router={browserRouter} />;
