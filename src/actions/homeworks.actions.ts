import { GroupResponse } from '../models/responses/GroupResponse';
import { Homework, StudentHomework } from '../models/responses/HomeworksResponse';
export const LOAD_TABS = 'homeworks/LOAD_TABS' as const;
export const SELECT_TAB = 'homeworks/SELECT_TAB' as const;
export const LOAD_HOMEWORKS = 'homeworks/LOAD_HOMEWORKS' as const;
export const LOAD_HOMEWORKS_STARTED = 'homeworks/LOAD_HOMEWORKS_STARTED' as const;
export const LOAD_HOMEWORKS_SUCCESS = 'homeworks/LOAD_HOMEWORKS_SUCCESS' as const;
export const LOAD_HOMEWORKS_FAIL = 'homeworks/LOAD_HOMEWORKS_FAIL' as const;
export const EDIT_HOMEWORK_STATUS = 'homeworks/EDIT_HOMEWORK_STATUS' as const;

export const loadHomeworkPageTabs = (groups: GroupResponse[]) => ({
  type: LOAD_TABS,
  payload: groups,
});

export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  payload: id,
});

export const loadHomeworksStarted = () => ({
  type: LOAD_HOMEWORKS_STARTED,
});

export const loadHomeworksSuccess = (homeworks: Homework[]) => ({
  type: LOAD_HOMEWORKS_SUCCESS,
  payload: homeworks,
});

export const loadHomeworksFail = (message: string) => ({
  type: LOAD_HOMEWORKS_FAIL,
  payload: message,
});

export const editHomeworkStatus = (homework: StudentHomework) => ({
  type: EDIT_HOMEWORK_STATUS,
  payload: homework,
});

export type HomeworksPageAction =
  | ReturnType<typeof loadHomeworkPageTabs>
  | ReturnType<typeof selectTab>
  | ReturnType<typeof loadHomeworksStarted>
  | ReturnType<typeof loadHomeworksSuccess>
  | ReturnType<typeof loadHomeworksFail>
  | ReturnType<typeof editHomeworkStatus>;
