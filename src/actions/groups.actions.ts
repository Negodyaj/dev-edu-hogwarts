import { GroupResponseById } from '../models/responses/GroupResponseById';
import { GroupResponse } from '../models/responses/GroupResponse';

export const SELECT_GROUP = 'groups/SELECT_GROUP' as const;
export const SELECT_TAB = 'groups/SELECT_TAB' as const;
export const LOAD_GROUPS_STARTED = 'groups/LOAD_GROUPS_STARTED' as const;
export const LOAD_GROUPS_SUCCESS = 'groups/LOAD_GROUPS_SUCCESS' as const;
export const LOAD_GROUPS_FAIL = 'groups/LOAD_GROUPS_FAIL' as const;

export const selectGroup = (group: GroupResponseById) => ({
  type: SELECT_GROUP,
  payload: group,
});

export const selectTab = (tabId: number) => ({
  type: SELECT_TAB,
  payload: tabId,
});

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

export type GroupsPageAction =
  | ReturnType<typeof loadGroupsSuccess>
  | ReturnType<typeof selectGroup>
  | ReturnType<typeof selectTab>
  | ReturnType<typeof loadGroupsFail>
  | ReturnType<typeof loadGroupsStarted>;
