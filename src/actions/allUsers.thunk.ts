import { Dispatch } from 'react';
import { UsersResponse } from '../pages/AllUsersPage/AllUsersPage';
import { UserRowModel } from '../pages/AllUsersPage/components/UserRow';
import { baseWretch } from '../services/base-wretch.service';
import { AllUsersPageActions, loadUsers } from './allUsers.actions';

export const onUsersLoad = () => {
  return (dispatch: Dispatch<AllUsersPageActions>) => {
    baseWretch()
      .url('api/Users')
      .get()
      .json((data) => {
        const userList: UserRowModel[] = data.map((item: UsersResponse) => {
          const user: UserRowModel = {
            name: item.firstName,
            lastName: item.lastName,
            role: item.roles,
          };
          return user;
        });
        dispatch(loadUsers(userList));
        return userList;
      });
  };
};
