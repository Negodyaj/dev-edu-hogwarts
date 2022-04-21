import { LessonModel } from '../pages/LessonsPage/components/Lesson';

export const SET_LESSONS = 'lessons/SET_LESSONS' as const;
export const FILTER_LESSONS = 'lessons/FILTER_LESSONS' as const;

export const setLessons = (lessons: LessonModel[]) => ({
  type: SET_LESSONS,
  payload: lessons,
});

export const filterLessons = (lessons: LessonModel[]) => ({
  type: FILTER_LESSONS,
  payload: lessons,
});

export type LessonsPageActions =
  | ReturnType<typeof setLessons>
  | ReturnType<typeof filterLessons>;
