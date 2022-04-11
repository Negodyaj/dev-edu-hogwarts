import { LessonResponse } from "../models/responses/LessonResponse";

export const LOAD_TABS = 'notifications/LOAD_TABS' as const;
export const SELECT_TAB = 'notifications/SELECT_TAB' as const;

export const LOAD_LESSONS = 'lessons/LOAD_LESSONS' as const;


export const loadTabs = () => ({
  type: LOAD_TABS
});

export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  payload: id,
});

export const loadLesson = () => ({
  type: LOAD_LESSONS
});

export type LessonPageAction = 
  ReturnType<typeof loadTabs> | 
  ReturnType<typeof selectTab> | 
  ReturnType<typeof loadLesson>;
