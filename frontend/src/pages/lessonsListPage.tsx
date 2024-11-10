import React from "react";

import { PageTemplate } from "@/components/page-template";
import { LessonBanner } from "@/components/lessonBanner";
import { IFinancialLesson } from "@/shared/model/lessons/types";
import { useFinancialLessons } from "@/shared/model/lessons/queries";

/** Список уроков фин грамотности */
export const LessonsListPage = () => {
  const { data: financialLessons, isLoading, error } = useFinancialLessons();

  if (isLoading) {
    return (
      <PageTemplate>
        <h1>Loading...</h1>
      </PageTemplate>
    );
  }

  if (error) {
    return (
      <PageTemplate>
        <h1>Error loading lessons</h1>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      {financialLessons?.map((lesson: IFinancialLesson) => (
        <LessonBanner
          key={lesson.id}
          lessonId={lesson.id}
          title={lesson.title}
          description={lesson.description}
          coinCount={lesson.gamecoins}
          // currentStep и totalSteps можно добавить, если они есть в данных
          // currentStep={lesson.currentStep}
          // totalSteps={lesson.totalSteps}
        />
      ))}
    </PageTemplate>
  );
};
