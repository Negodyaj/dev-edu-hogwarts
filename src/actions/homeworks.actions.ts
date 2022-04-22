import { HomeworkCardResponse } from '../models/responses/HomeworkCardResponse';
import { GroupResponse } from '../models/responses/GroupResponse';
import { HomeworkStudentAnswer } from '../models/responses/HomeworkStudentAnswer';
export const LOAD_TABS = 'homeworks/LOAD_TABS' as const;
export const SELECT_TAB = 'homeworks/SELECT_TAB' as const;
export const LOAD_HWANSWER = 'homeworks/LOAD_HWANSWER' as const;
export const LOAD_HOMEWORKS = 'homeworks/LOAD_HOMEWORKS' as const;

export const loadHomeworkPageTabs = (groups: GroupResponse[]) => ({
  type: LOAD_TABS,
  payload: groups,
});

export const loadHomeworkAnswers = (answers: HomeworkStudentAnswer[]) => ({
  type: LOAD_HWANSWER,
  payload: answers,
});

export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  payload: id,
});

export const loadHomeworks = (homeworks: HomeworkCardResponse[]) => ({
  type: LOAD_HOMEWORKS,
  payload: homeworks,
});

export type HomeworkPageAction =
  | ReturnType<typeof loadHomeworkPageTabs>
  | ReturnType<typeof selectTab>
  | ReturnType<typeof loadHomeworks>
  | ReturnType<typeof loadHomeworkAnswers>;
