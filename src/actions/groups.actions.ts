import { GroupResponseById } from '../models/responses/GroupResponseById';
import { GroupResponse } from '../models/responses/GroupResponse';

export const GET_GROUPS = 'groups/GET_GROUPS' as const;

export const getGroups = (groups:[GroupResponse[], GroupResponseById]) => ({
  type: GET_GROUPS,
  payload: groups
});
export const SELECT_GROUP = 'groups/SELECT_GROUP' as const;

export const selectGroup = (groupData: GroupResponseById) => ({
  type: SELECT_GROUP,
  payload: groupData
});

export type GroupsPageAction =
  | ReturnType<typeof getGroups>
  | ReturnType<typeof selectGroup>;