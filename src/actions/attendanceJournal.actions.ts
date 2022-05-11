import { TabData } from '../models/TabData';

export const LOAD_TABS = 'attendanceJournal/LOAD_TABS' as const;
export const SELECT_TAB = 'attendanceJournal/SELECT_TAB' as const;

export const loadTabs = (tabs: TabData[]) => ({
  type: LOAD_TABS,
  payload: tabs,
});

export type AttendanceJournalActions = ReturnType<typeof loadTabs>;
