import { Dispatch } from 'react';
import { CourseResponse } from '../models/responses/CourseResponse';
import { UserResponseShort } from '../models/responses/UserResponseShort';
import { baseWretch } from '../services/base-wretch.service';
import { coursesUrl, usersUrl } from '../shared/consts';
import { UserRole } from '../shared/enums/UserRole';
import { userRoleForEnum } from '../shared/helpers/userRoleForEnum';
import {
  loadCoursesSuccess,
  loadFail,
  loadStarted,
  loadUsersSuccess,
  NewGroupFormAction,
} from './NewGroupForm.actions';

export const loadCoursesAndUsers = () => {
  return (dispatch: Dispatch<NewGroupFormAction>) => {
    dispatch(loadStarted());

    baseWretch()
      .url(coursesUrl)
      .get()
      .json((data) => {
        baseWretch()
          .url(usersUrl)
          .get()
          .json((usersList) => {
            usersList.map((user: any) => {
              const role: UserRole[] = (user.roles as string[]).map((item) => {
                const newRole: UserRole = userRoleForEnum(item);
                return newRole;
              });
              user.roles = role;
              return user as UserResponseShort[];
            });
            dispatch(loadUsersSuccess(usersList as UserResponseShort[]));
            dispatch(loadCoursesSuccess(data as CourseResponse[]));
          })
          .catch((error) => dispatch(loadFail(error.message)));
      });
  };
};
