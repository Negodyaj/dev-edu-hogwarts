import { Reducer } from 'react';
// import { useSelector } from 'react-redux';
import {
  SettingsPageActions,
  UPDATE_USERDATA_FAIL,
  UPDATE_USERDATA_STARTED,
  UPDATE_USERDATA_SUCCESS,
} from '../../actions/settings.actions';
import { UserResponse } from '../../models/responses/UserResponse';
// import { AppState } from '../store';
// import { LoginPageState } from './login.reducer';
// const { currentUser } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
export interface SettingsPageState {
  userData?: UserResponse;
  isLoading: boolean;
  errorMessage?: string;
}
const initialState: SettingsPageState = {
  userData: undefined,
  isLoading: false,
  errorMessage: '',
};

export const settingsPageReducer: Reducer<SettingsPageState | undefined, SettingsPageActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UPDATE_USERDATA_SUCCESS:
      return {
        ...state,
        homework: action.payload,
        isLoading: false,
        errorMessage: undefined,
      };
    case UPDATE_USERDATA_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_USERDATA_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
