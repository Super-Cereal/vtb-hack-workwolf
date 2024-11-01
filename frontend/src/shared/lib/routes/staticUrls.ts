/** Список всех урлов приложения */
export const staticUrls = {
  /** Главная страница */
  main: "/",

  /** Страница обьекта */
  object: "/objects/:objectId",

  /** Список уроков фин грамотности */
  lessonsList: "/lessons",

  /** Урок фин грамотности */
  lesson: "/lessons/:lessonId",

  /** Тестирование по уроку фин грамотности */
  lessonTest: "/lessons/:lessonId/test/:testId",

  /** Список мини-игр */
  gamesList: "/games",

  /** Игра "Три в ряд" */
  game_ThreeInRow: "/games/three-in-row/:levelId",

  /** Игра "Слияние" */
  game_Merge: "/games/merge/:levelId",
} as const;
