import { HomeworkCardResponse } from "../models/responses/HomeworkCardResponse";

export const LOAD_TABS = 'homeworks/LOAD_TABS' as const;
export const SELECT_TAB = 'homeworks/SELECT_TAB' as const;

export const LOAD_HOMEWORKS = 'homeworks/LOAD_HOMEWORKS' as const;


export const loadTabs = () => ({
  type: LOAD_TABS
});

export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  payload: id,
});

export const loadHomeworks = (homeworks: HomeworkCardResponse[]) => ({
  type: LOAD_HOMEWORKS,
  response: homeworks
});

export type HomeworkPageAction =
  ReturnType<typeof loadTabs> |
  ReturnType<typeof selectTab> |
  ReturnType<typeof loadHomeworks>;