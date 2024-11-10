
export interface IFinancialLessonDTO {
  id: string;
  title: string;
  description: string;
  gamecoins: number;
  createdAt: string;
  updatedAt: string;
  content?: IArticle;
  test?: IFinancialTest;
}

export interface IArticle {
  id: string;
  name: string;
  text: string;
  lessonId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFinancialTest {
  id: string;
  lessonId: string;
  createdAt: string;
  updatedAt: string;
  questions: IQuestion[];
}

export interface IQuestion {
  id: string;
  text: string;
  answers: string[];
  rightAnswer: string;
  financialTestId: string;
  createdAt: string;
  updatedAt: string;
}

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

export interface IFinancialLesson {
  id: string;
  title: string;
  description: string;
  gamecoins: number;
  content?: IArticle;
  test?: IFinancialTest;
}
