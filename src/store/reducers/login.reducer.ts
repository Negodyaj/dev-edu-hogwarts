import { Reducer } from 'redux';
import { LoginPageAction, SET_CURRENT_USER } from '../../actions/login.actions';
import { UserResponse } from '../../models/responses/UserResponse';

export interface LoginPageState {
  currentUser?: UserResponse;
  email:string,
  password:string
}

const initialState: LoginPageState = {
  currentUser: undefined,
  email: "Mail@example.ru",
  password: "        "
};

export const loginPageReducer: Reducer<LoginPageState, LoginPageAction> = 
  ( state = initialState, action ) => {
    switch (action.type) {  
      case SET_CURRENT_USER: {
        return {
          ...state,
          currentUser: action.payload
        }
      }    
      default:
        return state;
    }
  };
