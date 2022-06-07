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
            roles: item.roles,
            userId: item.id,
          };
          return user;
        });
        dispatch(loadUsers(userList));
        return userList;
      });
  };
};

export const addRole = (userId: number, role: string) => {
  baseWretch().url(`api/Users/${userId}/role/${role}`).post(role);
};
