import { Reducer } from 'react';
import {
  ADD_ROLE,
  AllUsersPageActions,
  DELETE_ROLE,
  LOAD_USERS,
  TOGGLE_ROLE,
} from '../../actions/allUsers.actions';
import { UserRowModel } from '../../pages/AllUsersPage/components/UserRow';

export interface AllUsersPageState {
  userList: UserRowModel[];
  isChecked?: boolean;
  selectedUserId?: number;
}

export const initialState: AllUsersPageState = {
  userList: [],
  isChecked: false,
  selectedUserId: 0,
};

export const allUsersPageReducer: Reducer<AllUsersPageState | undefined, AllUsersPageActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        userList: action.payload,
      };
    case ADD_ROLE:
      return {
        ...state,
        userList: action.payload,
      };
    case DELETE_ROLE:
      return {
        ...state,
        userList: action.payload,
      };
    case TOGGLE_ROLE:
      return {
        ...state,
        selectedUserId: action.payload,
      };
    default:
      return state;
  }
};
