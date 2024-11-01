import { generatePath, type PathParam } from "react-router-dom";

import { staticUrls } from "./staticUrls";

/**
 * Форматирует шаблонный урл
 *
 * @example formatUrl('lessons/:lessonId', { lessonId: 123 }) => 'lessons/123'
 */
export const formatUrl = <TUrl extends (typeof staticUrls)[keyof typeof staticUrls]>(
  url: TUrl,
  params?: { [key in PathParam<TUrl>]: string },
) => generatePath(url, params);
