import { Dispatch } from 'react';
import { loadHomeworkPageTabs } from '../actions/homeworks.actions';
import { loadLessonPageTabs } from '../actions/lessons.actions';
import { setCurrentUser, setCurrentUserRole } from '../actions/login.actions';
import { loadGroups } from '../actions/newHomeworkForm.action';
import { UserResponse } from '../models/responses/UserResponse';
import { UserRole } from '../shared/enums/UserRole';
import { userRoleForEnum } from '../shared/helpers/userRoleForEnum';
import { baseWretch } from './base-wretch.service';
import { getFromStorage, removeFromStorage, store } from './local-storage.service';

// token
export const getToken = (): string => getFromStorage('token');

export const setToken = (token: string) => {
  store('token', token);
};

export const getCurrentUser = (dispatch: Dispatch<any>) => {
  baseWretch()
    .url(`api/Users/self`)
    .get()
    .json((data) => {
      const userRoles: UserRole[] = (data.roles as string[]).map((role) => userRoleForEnum(role));
      const user = data as UserResponse;
      user.roles = userRoles;
      dispatch(setCurrentUser(user));
      dispatch(loadGroups(user.groups));
      dispatch(loadHomeworkPageTabs(user.groups));
      dispatch(loadLessonPageTabs(user.groups));
      dispatch(setCurrentUserRole(user.roles[0]));
    });
};

const parseToken = (token: string) => {
  if (!token) {
    return;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

export const getIdFromToken = (token: string) => {
  const tokenPayload = parseToken(token);
  return tokenPayload.nameid;
};

export const removeToken = () => {
  removeFromStorage('token');
};
