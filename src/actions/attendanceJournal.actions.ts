import { GroupResponse } from '../models/responses/GroupResponse';
import { setRandomIconGroup } from '../shared/helpers/iconHelpers';

export const LOAD_TABS = 'attendanceJournal/LOAD_TABS' as const;
export const SELECT_TAB = 'attendanceJournal/SELECT_TAB' as const;

export const loadAttendanceJournalTabs = (groups: GroupResponse[]) => ({
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

export type AttendanceJournalActions =
  | ReturnType<typeof loadAttendanceJournalTabs>
  | ReturnType<typeof selectTab>;
