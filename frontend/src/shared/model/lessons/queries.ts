import { get } from "@/shared/lib/requests";
import { useQuery } from "@tanstack/react-query";
import { financialLessonQueryKeys } from "./queryKeys";
import { IFinancialLessonDTO } from "./types";
import { adapter_financialLesson } from "./adapters";
/* 
export const useFinancialLesson = (lessonId: string) =>
  useQuery({
    queryKey: [financialLessonQueryKeys.get, lessonId],
    queryFn: () => get<IFinancialLessonDTO>(`/financial-lessons/${lessonId}`),
    select: adapter_financialLesson,
  }); */

export const useFinancialLessons = () =>
  useQuery({
    queryKey: [financialLessonQueryKeys.getList],
    queryFn: () => get<IFinancialLessonDTO[]>("/financial-lessons/user"),
    select: (financialLessons) => financialLessons.map(adapter_financialLesson),
  });
