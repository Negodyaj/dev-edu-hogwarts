import { UserResponse } from "../models/responses/UserResponse";

export const LOAD_TABS = 'notifications/LOAD_TABS' as const;
export const SET_CURRENT_USER = 'notifications/SET_CURRENT_USER' as const;
export const SELECT_TAB = 'notifications/SELECT_TAB' as const;

export const loadTabs = () => ({
  type: LOAD_TABS
});

export const setCurrentUser = (user: UserResponse) => ({
  type: SET_CURRENT_USER,
  payload: user
});

export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  payload: id,
});

export type NotificationsPageAction = 
  ReturnType<typeof loadTabs> | 
  ReturnType<typeof selectTab> | 
  ReturnType<typeof setCurrentUser>;
