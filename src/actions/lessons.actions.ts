import { LessonResponse } from "../models/responses/LessonResponse";

export const LOAD_TABS = 'lessons/LOAD_TABS' as const;
export const SELECT_TAB = 'lessons/SELECT_TAB' as const;

export const LOAD_LESSONS = 'lessons/LOAD_LESSONS' as const;


export const loadTabs = () => ({
  type: LOAD_TABS
});

export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  payload: id,
});

export const loadLessons = (lessons: LessonResponse[]) => ({
  type: LOAD_LESSONS,
  response: lessons
});

export type LessonPageAction = 
  ReturnType<typeof loadTabs> | 
  ReturnType<typeof selectTab> | 
  ReturnType<typeof loadLessons>;
