import moment from 'moment';
import { Dispatch } from 'react';
import { UserResponse } from '../models/responses/UserResponse';
import { FormPasswordData } from '../pages/SettingsPage/SettingsPassword';
import { baseWretch } from '../services/base-wretch.service';
import { updatePassword, updateUserUrl } from '../shared/consts';

import {
  SettingsPageActions,
  updateUserDataFail,
  updateUserDataStarted,
  updateUserDataSuccess,
  updateUserPasswordSuccess,
} from './settings.actions';

export const updateUserData = (user: UserResponse) => {
  const convertDate = (date: string) => {
    return moment(new Date(date)).format('DD.MM.YYYY').toString();
  };
  return (dispatch: Dispatch<SettingsPageActions>) => {
    dispatch(updateUserDataStarted());
    baseWretch()
      .url(updateUserUrl(user.id))
      .put({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        patronymic: user.patronymic,
        email: user.email,
        birthDate: convertDate(user.birthDate),
        gitHubAccount: user.gitHubAccount,
        phoneNumber: user.phoneNumber,
        city: 1,
        username: user.username,
      })
      .res((res) =>
        res.ok ? dispatch(updateUserDataSuccess(user)) : dispatch(updateUserDataFail('failed'))
      );
  };
};

export const updateUserPassword = (password: FormPasswordData) => {
  return (dispatch: Dispatch<SettingsPageActions>) => {
    dispatch(updateUserDataStarted());
    baseWretch()
      .url(updatePassword)
      .put({
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
        newPasswordRepeat: password.newPasswordRepeat,
      })
      .res((res) =>
        res.ok
          ? dispatch(updateUserPasswordSuccess(password))
          : dispatch(updateUserDataFail('failed'))
      );
  };
};
