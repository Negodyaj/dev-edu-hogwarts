import { GroupResponse } from '../models/responses/GroupResponse';
import { setRandomIconGroup } from '../shared/helpers/iconHelpers';

export const LOAD_TABS = 'generalProgress/LOAD_TABS' as const;
export const SELECT_TAB = 'generalProgress/SELECT_TAB' as const;
export const LOAD_PROGRESS = 'generalProgress/LOAD_PROGRESS' as const;
export const LOAD_PROGRESS_STARTED = 'generalProgress/LOAD_PROGRESS_STARTED' as const;
export const LOAD_PROGRESS_SUCCESS = 'generalProgress/LOAD_PROGRESS_SUCCESS' as const;
export const LOAD_PROGRESS_FAIL = 'generalProgress/LOAD_PROGRESS_FAIL' as const;

export const loadGeneralProgressTabs = (groups: GroupResponse[]) => ({
  type: LOAD_TABS,
  payload: groups.map((group) => ({
    id: group.id,
    text: group.name,
    icon: setRandomIconGroup(),
  })),
});

export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  payload: id,
});

export const loadProgress = (progressData: any[]) => ({
  type: LOAD_PROGRESS,
  payload: progressData,
});

export const loadProgressStarted = () => ({
  type: LOAD_PROGRESS_STARTED,
});

export const loadProgressSuccess = () => ({
  type: LOAD_PROGRESS_SUCCESS,
});

export const loadProgressFail = (error: string) => ({
  type: LOAD_PROGRESS_FAIL,
  payload: error,
});

export type GeneralProgressActions =
  | ReturnType<typeof loadGeneralProgressTabs>
  | ReturnType<typeof selectTab>
  | ReturnType<typeof loadProgress>
  | ReturnType<typeof loadProgressStarted>
  | ReturnType<typeof loadProgressSuccess>
  | ReturnType<typeof loadProgressFail>;
