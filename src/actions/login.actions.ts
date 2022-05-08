import { UserResponse } from '../models/responses/UserResponse';
import { UserRole } from '../shared/enums/UserRole';

export const SET_CURRENT_USER = 'login/SET_CURRENT_USER' as const;

export const setCurrentUser = (user: UserResponse) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const SET_CURRENT_USER_ROLE = 'login/SET_CURRENT_USER_ROLE' as const;

export const setCurrentUserRole = (role: UserRole) => ({
  type: SET_CURRENT_USER_ROLE,
  payload: role,
});

export type LoginPageAction =
  | ReturnType<typeof setCurrentUser>
  | ReturnType<typeof setCurrentUserRole>;
