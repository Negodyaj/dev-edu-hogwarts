import { UserResponse } from '../models/responses/UserResponse';

export const SET_CURRENT_USER = 'login/SET_CURRENT_USER' as const;

export const setCurrentUser = (user: UserResponse) => ({
  type: SET_CURRENT_USER,
  payload: user,
});
export type LoginPageAction = ReturnType<typeof setCurrentUser>;
