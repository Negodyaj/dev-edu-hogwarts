import { GroupResponse } from '../models/responses/GroupResponse';
import { LessonResponse } from '../models/responses/LessonResponse';

export const SET_LESSONS = 'lessons/SET_LESSONS' as const;
export const FILTER_LESSONS = 'lessons/FILTER_LESSONS' as const;
export const LOAD_TABS = 'lessons/LOAD_TABS' as const;
export const SELECT_TAB = 'lessons/SELECT_TAB' as const;
export const LOAD_LESSONS = 'lessons/LOAD_LESSONS' as const;
export const LOAD_LESSONS_STARTED = 'lessons/LOAD_LESSONS_STARTED' as const;
export const LOAD_LESSONS_SUCCESS = 'lessons/LOAD_LESSONS_SUCCESS' as const;
export const LOAD_LESSONS_FAIL = 'lessons/LOAD_LESSONS_FAIL' as const;
export const SET_IS_EDIT = 'lessons/SET_IS_EDIT' as const;

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

export const loadLessonsStarted = () => ({
  type: LOAD_LESSONS_STARTED,
});

export const loadLessonsSuccess = (lessons: LessonResponse[]) => ({
  type: LOAD_LESSONS_SUCCESS,
  payload: lessons,
});

export const loadLessonsFail = (message: string) => ({
  type: LOAD_LESSONS_FAIL,
  payload: message,
});

export const setIsEdit = (isEditing: boolean) => ({
  type: SET_IS_EDIT,
  payload: isEditing,
});

export type LessonsPageActions =
  | ReturnType<typeof filterLessons>
  | ReturnType<typeof loadLessonPageTabs>
  | ReturnType<typeof selectTab>
  | ReturnType<typeof loadLessonsStarted>
  | ReturnType<typeof loadLessonsSuccess>
  | ReturnType<typeof loadLessonsFail>
  | ReturnType<typeof setIsEdit>;
