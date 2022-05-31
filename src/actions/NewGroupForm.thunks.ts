import { Dispatch } from 'react';
import { CourseSimpleResponse } from '../models/responses/CourseSimpleResponse';
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
import { UserSimpleResponseWithRoles } from '../models/responses/UserResponse';

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
              const role: UserRole[] = (user.roles as string[]).map((item) =>
                userRoleForEnum(item)
              );
              user.roles = role;
              return user as UserSimpleResponseWithRoles[];
            });
            dispatch(loadUsersSuccess(usersList as UserSimpleResponseWithRoles[]));
            dispatch(loadCoursesSuccess(data as CourseSimpleResponse[]));
          })
          .catch((error) => dispatch(loadFail(error.message)));
      });
  };
};
