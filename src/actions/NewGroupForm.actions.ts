import { CourseSimpleResponse } from '../models/responses/CourseSimpleResponse';
import { UserSimpleResponseWithRoles } from '../models/responses/UserResponse';
//import { GroupFormData } from '../pages/NewGroupPage/NewGroupPage';
import { GroupResponseWithUsers } from '../models/responses/GroupResponseWithUsers';
export const LOAD_STARTED = 'NewGroupForm/LOAD_STARTED' as const;
export const LOAD_COURSES_SUCCESS = 'NewGroupForm/LOAD_COURSES_SUCCESS' as const;
export const LOAD_USERS_SUCCESS = 'NewGroupForm/LOAD_USERS_SUCCESS' as const;
export const LOAD_FAIL = 'NewGroupForm/LOAD_FAIL' as const;
export const GET_DATA_FROM_FORM = 'NewGroupForm/GET_DATA_FROM_FORM' as const;
export const GET_ID_FOR_GROUP = 'NewGroupForm/GET_ID_FOR_GROUP' as const;
export const LOAD_GROUP_FOR_CHANGE = 'NewGroupForm/LOAD_GROUP_FOR_CHANGE' as const;
export const GET_TUTORS_FOR_GROUP = 'NewGroupForm/GET_TUTORS_FOR_GROUP' as const;
export const GET_TEACHERS_FOR_GROUP = 'NewGroupForm/GET_TEACHERS_FOR_GROUP' as const;
export const RESET_NEW_GROUP_PAGE = 'NewGroupForm/RESET_NEW_GROUP_PAGE' as const;

export const loadStarted = () => ({
  type: LOAD_STARTED,
});

export const loadFail = (message: string) => ({
  type: LOAD_FAIL,
  payload: message,
});

export const loadCoursesSuccess = (courses: CourseSimpleResponse[]) => ({
  type: LOAD_COURSES_SUCCESS,
  payload: courses,
});

export const loadUsersSuccess = (users: UserSimpleResponseWithRoles[]) => ({
  type: LOAD_USERS_SUCCESS,
  payload: users,
});

export const getDataFromFormPage = (data: GroupResponseWithUsers) => ({
  type: GET_DATA_FROM_FORM,
  payload: data,
});

export const getIdForGroup = (groupId: number) => ({
  type: GET_ID_FOR_GROUP,
  payload: groupId,
});

export const loadGroupForChange = (data: GroupResponseWithUsers) => ({
  type: LOAD_GROUP_FOR_CHANGE,
  payload: data,
});

export const getTeachersForGroup = (data: number[]) => ({
  type: GET_TEACHERS_FOR_GROUP,
  payload: data,
});

export const getTutorsForGroup = (data: number[]) => ({
  type: GET_TUTORS_FOR_GROUP,
  payload: data,
});

export const resetNewGroupPage = () => ({
  type: RESET_NEW_GROUP_PAGE,
});

export type NewGroupFormAction =
  | ReturnType<typeof loadStarted>
  | ReturnType<typeof loadFail>
  | ReturnType<typeof loadCoursesSuccess>
  | ReturnType<typeof loadUsersSuccess>
  | ReturnType<typeof getDataFromFormPage>
  | ReturnType<typeof getIdForGroup>
  | ReturnType<typeof loadGroupForChange>
  | ReturnType<typeof getTeachersForGroup>
  | ReturnType<typeof resetNewGroupPage>
  | ReturnType<typeof getTutorsForGroup>;
