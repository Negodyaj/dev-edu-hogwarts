import { Dispatch } from 'react';
import { loadHomeworkPageTabs } from '../actions/homeworks.actions';
import { loadLessonPageTabs } from '../actions/lessons.actions';
import { setCurrentUser } from '../actions/login.actions';
import { loadGroups } from '../actions/newHomeworkForm.action';
import { UserResponse } from '../models/responses/UserResponse';
import { UserRole } from '../shared/enums/UserRole';
import { userRoleForEnum } from '../shared/helpers/userRoleForEnum';
//import { UserRole } from '../shared/enums/UserRole';
import { baseWretch } from './base-wretch.service';
import { getFromStorage, removeFromStorage, store } from './local-storage.service';
import { loadAttendanceTabs } from '../actions/attendanceJournal.actions';
import { loadGeneralProgressTabs } from '../actions/generalProgress.actions';

// token
export const getToken = (): string => getFromStorage('token');

export const setToken = (token: string) => {
  store('token', token);
};

// const rolesMock = [
//   UserRole.Tutor,
//   UserRole.Admin,
//   UserRole.Manager,
//   UserRole.Student,
// ];

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
      const userRoles: UserRole[] = (data.roles as string[]).map((role) => {
        const userRole: UserRole = userRoleForEnum(role);
        return userRole;
      });
      const user = data as UserResponse;
      const groups = user.groups;
      user.roles = userRoles;
      dispatch(setCurrentUser(user));
      dispatch(loadGroups(groups));
      dispatch(loadHomeworkPageTabs(groups));
      dispatch(loadLessonPageTabs(groups));
      dispatch(loadAttendanceTabs(groups));
      dispatch(loadGeneralProgressTabs(groups));
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
