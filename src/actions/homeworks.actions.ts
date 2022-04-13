import { HomeworkCardResponse } from "../models/responses/HomeworkCardResponse";

export const LOAD_TABS ='homeworks/LOAD_TABS' as const;
export const SELECT_TAB ='homeworks/SELECT_TAB' as const;
export const LOAD_HWCARDS = 'homeworks/LOAD_HWCARDS' as const;


export const loadHWCards = (hws: HomeworkCardResponse []) => ({
  type: LOAD_HWCARDS,
  response: hws
});
export const loadTabs = () => ({
  type: LOAD_TABS
});

export const selectTabs = (id: number) => ({
  type: SELECT_TAB,
  payload: id
});
export type HomeworkPageAction = 
  ReturnType<typeof loadHWCards>|
  ReturnType<typeof loadTabs>|
  ReturnType<typeof selectTabs>;