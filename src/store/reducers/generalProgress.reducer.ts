import { TabData } from '../../models/TabData';
import { Reducer } from 'redux';
import {
  GeneralProgressActions,
  LOAD_PROGRESS_FAIL,
  LOAD_PROGRESS_STARTED,
  LOAD_PROGRESS_SUCCESS,
  LOAD_TABS,
  SELECT_TAB,
  FILTER_STUDENTS_LIST,
} from '../../actions/generalProgress.actions';

export type GeneralProgressState = {
  tabs?: TabData[];
  selectedTab: number;
  progressData?: any[];
  filteredStudentList?: any[];
  isLoad: boolean;
  error?: string;
};

export const initialState: GeneralProgressState = {
  tabs: [],
  selectedTab: -1,
  progressData: undefined,
  filteredStudentList: undefined,
  isLoad: false,
  error: undefined,
};

export const generalProgressReducer: Reducer<GeneralProgressState, GeneralProgressActions> = (
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
    case SELECT_TAB:
      return {
        ...state,
        selectedTab: action.payload,
      };
    case LOAD_PROGRESS_SUCCESS:
      return {
        ...state,
        progressData: action.payload,
        filteredStudentList: action.payload.map((item) => ({
          id: item.id,
          name: item.name,
          LastName: item.LastName,
        })),
        isLoad: false,
        error: undefined,
      };
    case LOAD_PROGRESS_STARTED:
      return {
        ...state,
        isLoad: true,
      };
    case LOAD_PROGRESS_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoad: false,
      };
    case FILTER_STUDENTS_LIST:
      return {
        ...state,
        filteredStudentList: action.payload,
      };
    default:
      return state;
  }
};
