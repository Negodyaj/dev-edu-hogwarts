import { Reducer } from 'react';
import {
  RegistrationPageActions,
  REGISTRATION_STARTED,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED
} from '../../actions/registration.actions';
import { RegisterFormData } from '../../pages/RegistrationPage/RegistrationPage';

export interface RegistrationPageState {
  data?: RegisterFormData;
  isLoading: boolean;
  errorMessage?: string;
};

export const initialState: RegistrationPageState = {
  data: undefined,
  isLoading: false,
  errorMessage: '',
};

export const registrationPageReducer: Reducer<RegistrationPageState | undefined, RegistrationPageActions> = (
  state = initialState,
  action
) => {
 switch (action.type) {
  case REGISTRATION_STARTED:
    return {
      ...state,
      isLoading: true,
    };

  case REGISTRATION_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case REGISTRATION_FAILED:
    return {
      ...state,
      isLoading: false,
      errorMessage: action.payload,
    };

  default:
    return state;
 }
};