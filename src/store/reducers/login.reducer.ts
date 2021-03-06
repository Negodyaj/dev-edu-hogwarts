import { Reducer } from 'redux';
import {
  GET_USER_FAIL,
  GET_USER_STARTED,
  LoginPageAction,
  SET_CURRENT_USER,
  SET_CURRENT_USER_ROLE,
} from '../../actions/login.actions';
import { UserResponse } from '../../models/responses/UserResponse';
import { UserRole } from '../../shared/enums/UserRole';

export interface LoginPageState {
  currentUser: UserResponse | undefined;
  currentRole: UserRole;
  inProcess: boolean;
  errorMessage?: string;
}

const initialState: LoginPageState = {
  currentUser: undefined,
  currentRole: UserRole.DefaultRole,
  inProcess: false,
  errorMessage: undefined,
};

export const loginPageReducer: Reducer<LoginPageState | undefined, LoginPageAction> = (
  state: LoginPageState | undefined = initialState,
  action
) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
        currentRole: action.payload ? action.payload.roles[0] : UserRole.DefaultRole,
        inProcess: false,
        errorMessage: undefined,
      };
    }
    case SET_CURRENT_USER_ROLE: {
      return {
        ...state,
        currentRole: action.payload,
        errorMessage: undefined,
      };
    }
    case GET_USER_STARTED: {
      return {
        ...state,
        inProcess: true,
        errorMessage: undefined,
      };
    }
    case GET_USER_FAIL: {
      return {
        ...state,
        inProcess: false,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
