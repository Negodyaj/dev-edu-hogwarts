import { GroupResponse } from "../models/responses/GroupResponse";
import { LessonResponse } from "../models/responses/LessonResponse";

export const LOAD_TABS = 'lessons/LOAD_TABS' as const;
export const SELECT_TAB = 'lessons/SELECT_TAB' as const;

export const LOAD_LESSONS = 'lessons/LOAD_LESSONS' as const;


export const loadLessonPageTabs = (groups: GroupResponse[]) => ({
  type: LOAD_TABS,
  payload: groups
});

export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  payload: id,
});

export const loadLessons = (lessons: LessonResponse[]) => ({
  type: LOAD_LESSONS,
  payload: lessons
});

export type LessonPageAction = 
  ReturnType<typeof loadLessonPageTabs> | 
  ReturnType<typeof selectTab> | 
  ReturnType<typeof loadLessons>;
