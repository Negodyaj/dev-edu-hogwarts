import { Reducer } from 'redux';
import {
  LoginPageAction,
  SET_CURRENT_USER,
  SET_CURRENT_USER_ROLE,
} from '../../actions/login.actions';
import { UserResponse } from '../../models/responses/UserResponse';
import { UserRole } from '../../shared/enums/UserRole';

export interface LoginPageState {
  currentUser: UserResponse | undefined;
  currentRole: UserRole;
  email: string;
  password: string;
}

const initialState: LoginPageState = {
  currentUser: undefined,
  currentRole: UserRole.DefaultRole,
  email: 'user@example.com',
  password: 'stringst',
};

export const loginPageReducer: Reducer<
  LoginPageState | undefined,
  LoginPageAction
> = (state: LoginPageState | undefined = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      const roles: UserRole[] | undefined = action.payload?.roles;
      return {
        ...state,
        currentUser: action.payload,
        currentRole: action.payload ? roles![0] : UserRole.DefaultRole,
      };
    }
    case SET_CURRENT_USER_ROLE: {
      return {
        ...state,
        currentRole: action.payload,
      };
    }
    default:
      return state;
  }
};
