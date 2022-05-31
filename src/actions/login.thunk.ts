import { baseWretch } from '../services/base-wretch.service';
import { loginUrl } from '../shared/consts';
import { getCurrentUser, setToken } from '../services/auth.service';
import { LoginFormData } from '../pages/LoginPage/LoginPage';
import { Dispatch } from 'react';
import { authUserStarted, getUserFail } from './login.actions';

export const authUser = (loginData: LoginFormData) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(authUserStarted());

    try {
      const token = await baseWretch().url(loginUrl).post(loginData).text();
      setToken(token);
      getCurrentUser(dispatch);
    } catch (e: any) {
      dispatch(getUserFail(e.message));
    }
  };
};
