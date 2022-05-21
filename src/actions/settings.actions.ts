import { UserResponse } from '../models/responses/UserResponse';

export const UPDATE_USERDATA = 'settings/UPDATE_USERDATA' as const;
export const UPDATE_USERDATA_STARTED = 'settings/UPDATE_USERDATA_STARTED' as const;
export const UPDATE_USERDATA_SUCCESS = 'settings/UPDATE_USERDATA_SUCCESS' as const;
export const UPDATE_USERDATA_FAIL = 'settings/UPDATE_USERDATA_FAIL' as const;

export const updateUserDataStarted = () => ({
  type: UPDATE_USERDATA_STARTED,
});

export const updateUserDataSuccess = (userData: UserResponse) => ({
  type: UPDATE_USERDATA_SUCCESS,
  payload: userData,
});

export const updateUserDataFail = (message: string) => ({
  type: UPDATE_USERDATA_FAIL,
  payload: message,
});

export type SettingsPageActions =
  | ReturnType<typeof updateUserDataStarted>
  | ReturnType<typeof updateUserDataSuccess>
  | ReturnType<typeof updateUserDataFail>;
