import { Dispatch } from 'react';
import { CourseSimpleResponse } from '../models/responses/CourseSimpleResponse';
import { GroupResponseWithUsers } from '../models/responses/GroupResponseWithUsers';
import { baseWretch } from '../services/base-wretch.service';
import { coursesUrl, groupByIdUrl, usersUrl } from '../shared/consts';
import { UserRole } from '../shared/enums/UserRole';
import { groupStatusForEnum } from '../shared/helpers/groupStatusForEnum';
import { userRoleForEnum } from '../shared/helpers/userRoleForEnum';
import {
  getTeachersForGroup,
  getTutorsForGroup,
  loadCoursesSuccess,
  loadFail,
  loadGroupForChange,
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

export const loadGroup = (groupId: number) => {
  return (dispatch: Dispatch<NewGroupFormAction>) => {
    dispatch(loadStarted());

    baseWretch()
      .url(groupByIdUrl(groupId))
      .get()
      .json((GroupInfo) => {
        (GroupInfo as GroupResponseWithUsers).groupStatus = groupStatusForEnum(
          GroupInfo.groupStatus as string
        );
        const teachers: number[] = (GroupInfo as GroupResponseWithUsers).teachers.map((teacher) => {
          const teacherId = teacher.id;
          return teacherId;
        });
        dispatch(getTeachersForGroup(teachers));
        const tutors: number[] = (GroupInfo as GroupResponseWithUsers).tutors.map((tutor) => {
          const tutorId = tutor.id;
          return tutorId;
        });
        dispatch(getTutorsForGroup(tutors));
        dispatch(loadGroupForChange(GroupInfo as GroupResponseWithUsers));
      })
      .catch((error) => dispatch(loadFail(error.message)));
  };
};
