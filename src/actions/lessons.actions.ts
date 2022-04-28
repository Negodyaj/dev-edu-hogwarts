import { GroupResponse } from '../models/responses/GroupResponse';
import { LessonResponse } from '../models/responses/LessonResponse';

export const SET_LESSONS = 'lessons/SET_LESSONS' as const;
export const FILTER_LESSONS = 'lessons/FILTER_LESSONS' as const;
export const LOAD_TABS = 'lessons/LOAD_TABS' as const;
export const SELECT_TAB = 'lessons/SELECT_TAB' as const;
export const LOAD_LESSONS = 'lessons/LOAD_LESSONS' as const;

export const filterLessons = (lessons: LessonResponse[]) => ({
  type: FILTER_LESSONS,
  payload: lessons,
});

export const loadLessonPageTabs = (groups: GroupResponse[]) => ({
  type: LOAD_TABS,
  payload: groups,
});

export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  payload: id,
});

export const loadLessons = (lessons: LessonResponse[]) => ({
  type: LOAD_LESSONS,
  payload: lessons,
});

export type LessonsPageActions =
  | ReturnType<typeof filterLessons>
  | ReturnType<typeof loadLessonPageTabs>
  | ReturnType<typeof selectTab>
  | ReturnType<typeof loadLessons>;
