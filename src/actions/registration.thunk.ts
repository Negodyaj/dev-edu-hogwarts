import { Dispatch } from 'react';
import { RegisterFormData } from '../pages/RegistrationPage/RegistrationPage';
import { baseWretch } from '../services/base-wretch.service';
import { registerUrl } from '../shared/consts';
import { NotificationType } from '../shared/enums/NotificationType';
import { convertDate } from '../shared/helpers/dateHelpers';
import { DecrementLoader, IncrementLoader, LoaderAction } from './loader.action';
import { NotificationsContainerActions, addNotification } from './notificationsContainer.actions';
import {
  registrationFailed,
  RegistrationPageActions,
  registrationStarted,
  registrationSuccess,
} from './registration.actions';

export const onRegistration = (data: RegisterFormData) => {
  return (
    dispatch: Dispatch<RegistrationPageActions | NotificationsContainerActions | LoaderAction>
  ) => {
    dispatch(registrationStarted());
    dispatch(IncrementLoader());

    baseWretch()
      .url(registerUrl)
      .post({
        firstName: data.firstName,
        lastName: data.lastName,
        patronymic: data.patronymic,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        username: 'string',
        birthdate: convertDate(data.birthDate),
        city: 1,
      })
      .res((res) => {
        if (res.ok) {
          dispatch(registrationSuccess(data));
          dispatch(DecrementLoader());
          dispatch(addNotification({ text: 'Добро пожаловать!!', type: NotificationType.Good }));
        }
      })
      .catch(() => {
        dispatch(registrationFailed('fail'));
        dispatch(DecrementLoader());
        dispatch(addNotification({ text: 'Чот наебнулось(', type: NotificationType.Bad }));
      });
  };
};
