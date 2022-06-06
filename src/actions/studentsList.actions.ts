import { GroupResponse } from '../models/responses/GroupResponse';

export const LOAD_GROUPS_STARTED = 'groups/LOAD_GROUPS_STARTED' as const;
export const LOAD_GROUPS_SUCCESS = 'groups/LOAD_GROUPS_SUCCESS' as const;
export const LOAD_GROUPS_FAIL = 'groups/LOAD_GROUPS_FAIL' as const;

export const loadGroupsStarted = () => ({
  type: LOAD_GROUPS_STARTED,
});

export const loadGroupsSuccess = (groups: GroupResponse[]) => ({
  type: LOAD_GROUPS_SUCCESS,
  payload: groups,
});

export const loadGroupsFail = (message: string) => ({
  type: LOAD_GROUPS_FAIL,
  payload: message,
});

export type StudentsListPageAction =
  | ReturnType<typeof loadGroupsSuccess>
  | ReturnType<typeof loadGroupsFail>
  | ReturnType<typeof loadGroupsStarted>;
