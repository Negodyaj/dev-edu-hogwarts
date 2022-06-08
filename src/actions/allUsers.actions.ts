import { UserRowModel } from '../pages/AllUsersPage/components/UserRow';

export const ADD_ROLE = 'ADD_ROLE' as const;
export const TOGGLE_ROLE = 'TOGGLE_ROLE' as const;
export const LOAD_USERS = 'LOAD_USERS' as const;

export const addRole = (id: number, role: any) => ({
  type: ADD_ROLE,
  payload: role,
  id,
});

export const toggleRole = (id: number | undefined) => ({
  type: TOGGLE_ROLE,
  payload: id,
});

export const loadUsers = (users: UserRowModel[]) => ({
  type: LOAD_USERS,
  payload: users,
});

export type AllUsersPageActions =
  | ReturnType<typeof addRole>
  | ReturnType<typeof loadUsers>
  | ReturnType<typeof toggleRole>;
