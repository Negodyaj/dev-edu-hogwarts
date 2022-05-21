import { CourseResponse } from '../models/responses/CourseResponse';
import { GroupFormData } from '../pages/NewGroupPage/NewGroupPage';
import { UserSimpleResponseWithRoles } from '../models/responses/UserResponse';

export const LOAD_STARTED = 'NewGroupForm/LOAD_STARTED' as const;
export const LOAD_COURSES_SUCCESS = 'NewGroupForm/LOAD_COURSES_SUCCESS' as const;
export const LOAD_USERS_SUCCESS = 'NewGroupForm/LOAD_USERS_SUCCESS' as const;
export const LOAD_FAIL = 'NewGroupForm/LOAD_FAIL' as const;
export const GET_DATA_FROM_FORM = 'NewGroupForm/GET_DATA_FROM_FORM' as const;
export const GET_ID_FOR_GROUP = 'NewGroupForm/GET_ID_FOR_GROUP' as const;

export const loadStarted = () => ({
  type: LOAD_STARTED,
});

export const loadFail = (message: string) => ({
  type: LOAD_FAIL,
  payload: message,
});

export const loadCoursesSuccess = (courses: CourseResponse[]) => ({
  type: LOAD_COURSES_SUCCESS,
  payload: courses,
});

export const loadUsersSuccess = (users: UserSimpleResponseWithRoles[]) => ({
  type: LOAD_USERS_SUCCESS,
  payload: users,
});

export const getDataFromFormPage = (data: GroupFormData) => ({
  type: GET_DATA_FROM_FORM,
  payload: data,
});

export const getIdForGroup = (groupId: number) => ({
  type: GET_ID_FOR_GROUP,
  payload: groupId,
});

export type NewGroupFormAction =
  | ReturnType<typeof loadStarted>
  | ReturnType<typeof loadFail>
  | ReturnType<typeof loadCoursesSuccess>
  | ReturnType<typeof loadUsersSuccess>
  | ReturnType<typeof getDataFromFormPage>
  | ReturnType<typeof getIdForGroup>;
