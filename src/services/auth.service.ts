import { Dispatch } from 'react';
import { getGroups, selectGroup, selectTab } from '../actions/groups.actions';
import { loadHomeworkPageTabs } from '../actions/homeworks.actions';
import { loadLessonPageTabs } from '../actions/lessons.actions';
import { setCurrentUser, setCurrentUserRole } from '../actions/login.actions';
import { loadGroups } from '../actions/newHomeworkForm.action';
import { GroupResponse } from '../models/responses/GroupResponse';
import { GroupResponseById } from '../models/responses/GroupResponseById';
import { UserResponse } from '../models/responses/UserResponse';
import { getGroupById, groupUrl } from '../shared/consts';
import { UserRole } from '../shared/enums/UserRole';
import { userRoleForEnum } from '../shared/helpers/userRoleForEnum';
//import { UserRole } from '../shared/enums/UserRole';
import { baseWretch } from './base-wretch.service';
import { getFromStorage, removeFromStorage, store } from './local-storage.service';

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
      user.roles = userRoles;
      dispatch(setCurrentUser(user));
      dispatch(loadGroups(user.groups));
      dispatch(loadHomeworkPageTabs(user.groups));
      dispatch(loadLessonPageTabs(user.groups));
      dispatch(setCurrentUserRole(user.roles[0]));
    });
  baseWretch()
    .url(groupUrl)
    .get()
    .json((data) => {
      const groupsList = data as GroupResponse[];
      const id: number = groupsList[0].id;
      baseWretch()
        .url(getGroupById(id))
        .get()
        .json((dataGroup) => {
          dispatch(selectGroup(dataGroup as GroupResponseById));
        });
      dispatch(getGroups(groupsList));
      dispatch(selectTab(id));
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
