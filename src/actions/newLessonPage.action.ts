import { GroupResponse } from '../models/responses/GroupResponse';

export const LOAD_GROUPS_STARTED = 'newLeson/LOAD_GROUPS_STARTED' as const;
export const LOAD_GROUPS_SUCSSES = 'newLeson/LOAD_GROUPS_SUCSSES' as const;
export const LOAD_GROUPS_FAIL = 'newLeson/LOAD_GROUPS_FAIL' as const;

export const loadGroupsStarted = () => ({
  type: LOAD_GROUPS_STARTED,
});

export const loadGroupsSucsses = (groups: GroupResponse[]) => ({
  type: LOAD_GROUPS_SUCSSES,
  payload: groups,
});

export const loadGroupsFail = (message: string) => ({
  type: LOAD_GROUPS_FAIL,
  payload: message,
});

export type NewLessonPageAction =
  | ReturnType<typeof loadGroupsStarted>
  | ReturnType<typeof loadGroupsSucsses>
  | ReturnType<typeof loadGroupsFail>;
