import { GroupResponseById } from '../models/responses/GroupResponseById';
import { GroupResponse } from '../models/responses/GroupResponse';

export const GET_GROUPS = 'groups/GET_GROUPS' as const;

export const getGroups = (groups: GroupResponse[]) => ({
  type: GET_GROUPS,
  payload: groups,
});
export const SELECT_GROUP = 'groups/SELECT_GROUP' as const;

export const selectGroup = (group: GroupResponseById) => ({
  type: SELECT_GROUP,
  payload: group,
});

export const SELECT_TAB = 'groups/SELECT_TAB' as const;

export const selectTab = (tabId: number) => ({
  type: SELECT_TAB,
  payload: tabId,
});

export type GroupsPageAction =
  | ReturnType<typeof getGroups>
  | ReturnType<typeof selectGroup>
  | ReturnType<typeof selectTab>;
