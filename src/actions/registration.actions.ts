import { RegisterFormData } from '../pages/RegistrationPage/RegistrationPage';

export const REGISTRATION_STARTED = 'REGISTRATION_STARTED' as const;
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS' as const;
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED' as const;

export const registrationStarted = () => ({
  type: REGISTRATION_STARTED,
})

export const registrationSuccess = (data: RegisterFormData) => ({
  type: REGISTRATION_SUCCESS,
  payload: data,
})

export const registrationFailed = (message: string) => ({
  type: REGISTRATION_FAILED,
  payload: message,
})

export type RegistrationPageActions = 
  |ReturnType<typeof registrationStarted>
  |ReturnType<typeof registrationSuccess>
  |ReturnType<typeof registrationFailed>;