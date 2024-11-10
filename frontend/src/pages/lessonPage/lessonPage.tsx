import React from "react";
import { useParams } from "react-router-dom";

import { PageTemplate } from "@/components/page-template";
import { DetailsLessonBanner } from "@/components/detailsLessonBanner";
import { useFinancialLessons } from "@/shared/model/lessons/queries";
import { IFinancialLesson } from "@/shared/model/lessons/types";
import { CardTemplate } from "@/shared/ui/card-template";

import styles from "./lessonPage.module.css";

/** Урок фин грамотности */
export const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { data: financialLessons, isLoading, error } = useFinancialLessons();

  if (isLoading) {
    return <PageTemplate><h1>Loading...</h1></PageTemplate>;
  }

  if (error) {
    return <PageTemplate><h1>Error loading lesson</h1></PageTemplate>;
  }

  const lesson = financialLessons?.find((lesson: IFinancialLesson) => lesson.id === lessonId);

  if (!lesson) {
    return <PageTemplate><h1>Lesson not found</h1></PageTemplate>;
  }

  return (
    <PageTemplate>
      <DetailsLessonBanner
        title={lesson.title}
        paragraph={lesson.description}
        coinCount={lesson.gamecoins}
      />
      <CardTemplate view="primary" >
        <h2>Статья</h2>
        <p>{lesson.content?.text}</p>

        <div className={styles.lessonTest}>
          <h2>Тест</h2>
          {lesson.test?.questions.map((question, index) => (
            <div key={index} className={styles.question}>
              <p>{question.text}</p>
              <ul>
                {question.answers.map((answer, idx) => (
                  <li key={idx}>{answer}</li>
                ))}
              </ul>
              <p>Правильный ответ: {question.rightAnswer}</p>
            </div>
          ))}
        </div>
      </CardTemplate>
    </PageTemplate>
  );
};
