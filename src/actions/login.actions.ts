import { UserResponse } from '../models/responses/UserResponse';
import { UserRole } from '../shared/enums/UserRole';

export const SET_CURRENT_USER = 'login/SET_CURRENT_USER' as const;
export const SET_CURRENT_USER_ROLE = 'login/SET_CURRENT_USER_ROLE' as const;
export const GET_USER_STARTED = 'login/GET_USER_STARTED' as const;
export const GET_USER_FAIL = 'login/GET_USER_FAIL' as const;

export const setCurrentUser = (user: UserResponse | undefined) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const setCurrentUserRole = (role: UserRole) => ({
  type: SET_CURRENT_USER_ROLE,
  payload: role,
});

export const authUserStarted = () => ({
  type: GET_USER_STARTED,
});

export const getUserFail = (message: string) => ({
  type: GET_USER_FAIL,
  payload: message,
});

export type LoginPageAction =
  | ReturnType<typeof setCurrentUser>
  | ReturnType<typeof setCurrentUserRole>
  | ReturnType<typeof authUserStarted>
  | ReturnType<typeof getUserFail>;
