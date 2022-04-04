import { Reducer } from 'redux';
import { Action } from 'redux-actions';

export interface LoginPageState {
  email: string;
  password: string;
}

const initialState: LoginPageState = {
  email: 'user@example.com',
  password: 'stringst'
};

export type LoginPageAction = {}

export const loginPageReducer: Reducer<LoginPageState, Action<any>> = 
  ( state = initialState, action ) => {
    switch (action.type) {      
      default:
        return state;
    }
  };
