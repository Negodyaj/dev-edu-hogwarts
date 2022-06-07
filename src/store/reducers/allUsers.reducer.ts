import { Reducer } from 'react';
import { ADD_ROLE, AllUsersPageActions, LOAD_USERS } from '../../actions/allUsers.actions';
import { UserRowModel } from '../../pages/AllUsersPage/components/UserRow';

export interface AllUsersPageState {
  userList: UserRowModel[];
}

export const initialState: AllUsersPageState = {
  userList: [],
};

export const allUsersPageReducer: Reducer<AllUsersPageState | undefined, AllUsersPageActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_USERS:
      return {
        state,
        userList: action.payload,
      };
    case ADD_ROLE:
      return {
        state,
        userList: action.payload,
      };
    default:
      return state;
  }
};
