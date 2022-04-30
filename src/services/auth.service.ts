import { Dispatch } from 'react';
import { loadHomeworkPageTabs } from '../actions/homeworks.actions';
import { loadLessonPageTabs } from '../actions/lessons.actions';
import { setCurrentUser, setCurrentUserRole } from '../actions/login.actions';
import { loadGroups } from '../actions/newHomeworkForm.action';
import { UserResponse } from '../models/responses/UserResponse';
//import { UserRole } from '../shared/enums/UserRole';
import { baseWretch } from './base-wretch.service';
import {
  getFromStorage,
  removeFromStorage,
  store,
} from './local-storage.service';

// token
export const getToken = (): string => getFromStorage('token');

export const setToken = (token: string) => {
  store('token', token);
};
// const rolesMock = [UserRole.Admin, UserRole.Manager, UserRole.Student];

// const usersMock: UserResponse = {
//   id: 111,
//   firstName: 'string',
//   lastName: 'string',
//   email: 'string',
//   photo: 'string',
//   roles: rolesMock,
//   patronymic: 'string',
//   username: 'string',
//   registrationDate: 'string',
//   birthDate: 'string',
//   phoneNumber: 'string',
//   exileDate: 'string',
//   gitHubAccount: 'string',
//   city: 1,
//   groups: [
//     {
//       id: 111,
//       name: 'Backend',
//       course: {
//         id: 2222,
//         name: 'Специализация Backend',
//         isDeleted: false,
//       },
//       groupStatus: 'string',
//       startDate: 'string',
//       endDate: 'string',
//       timetable: 'string',
//       paymentPerMonth: 7500,
//     },
//   ],
// };

export const getCurrentUser = (dispatch: Dispatch<any>) => {
  baseWretch()
    .url(`api/Users/self`)
    .get()
    .json((data) => {
      const user = data as UserResponse;
      dispatch(setCurrentUser(user));
      dispatch(loadGroups(user.groups));
      dispatch(loadHomeworkPageTabs(user.groups));
      dispatch(loadLessonPageTabs(user.groups));
      dispatch(setCurrentUserRole(user.roles[0]));
    });
  // const user = usersMock as UserResponse;
  // dispatch(setCurrentUser(user));
  // dispatch(loadGroups(user.groups));
  // dispatch(loadHomeworkPageTabs(user.groups));
  // dispatch(loadLessonPageTabs(user.groups));
  // dispatch(setCurrentUserRole(user.roles[0]));
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
