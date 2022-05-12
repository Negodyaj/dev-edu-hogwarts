import { TabData } from '../../models/TabData';
import { Reducer } from 'redux';
import {
  AttendanceJournalActions,
  LOAD_TABS,
  SELECT_TAB,
} from '../../actions/attendanceJournal.actions';

export type AttendanceJournalState = {
  tabs?: TabData[];
  selectedTab: number;
};

export const initialState: AttendanceJournalState = {
  tabs: [],
  selectedTab: -1,
};

export const attendanceJournalReducer: Reducer<AttendanceJournalState, AttendanceJournalActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_TABS:
      return {
        ...state,
        tabs: action.payload,
        selectedTab: action.payload[0].id,
      };
    case SELECT_TAB: {
      return {
        ...state,
        selectedTab: action.payload,
      };
    }
    default:
      return state;
  }
};
