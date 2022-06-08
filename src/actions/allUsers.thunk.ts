import { Dispatch } from 'react';
import { UsersResponse } from '../pages/AllUsersPage/AllUsersPage';
import { UserRowModel } from '../pages/AllUsersPage/components/UserRow';
import { baseWretch } from '../services/base-wretch.service';
import { addRole, AllUsersPageActions, loadUsers } from './allUsers.actions';

export const onUsersLoad = () => {
  return async (dispatch: Dispatch<AllUsersPageActions>) => {
    await baseWretch()
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

export const onAddRole = (userId: number, role: number) => {
  return (dispatch: Dispatch<AllUsersPageActions>) => {
    baseWretch().url(`api/Users/${userId}/role/${role}`).post();
    dispatch(addRole(userId, role));
  };
};

export const onDeleteRole = (userId: number, role: number) => {
  baseWretch().url(`api/Users/${userId}/role/${role}`).delete();
};
