import { UserRowModel } from '../pages/AllUsersPage/components/UserRow';

export const UPDATE_ROLES = 'UPDATE_ROLES' as const;
export const LOAD_ROLES = 'LOAD_ROLES' as const;

export const updateUserRoles = () => ({
  type: UPDATE_ROLES,
});

export const loadUsers = (users: UserRowModel[]) => ({
  type: LOAD_ROLES,
  payload: users,
});

export type AllUsersPageActions = ReturnType<typeof updateUserRoles> | ReturnType<typeof loadUsers>;
