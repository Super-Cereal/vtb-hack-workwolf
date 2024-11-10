import { IFinancialLesson, IFinancialLessonDTO } from "./types";

const adapter_financialLesson = ({
    id,
    title,
    description,
    gamecoins,
    createdAt,
    updatedAt,
    content,
    test,
  }: IFinancialLessonDTO): IFinancialLesson => ({
    id,
    title,
    description,
    gamecoins,
    content,
    test,
  });
  
  export { adapter_financialLesson };
  