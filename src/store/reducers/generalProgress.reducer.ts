import { TabData } from '../../models/TabData';
import { Reducer } from 'redux';
import {
  GeneralProgressActions,
  LOAD_PROGRESS,
  LOAD_PROGRESS_FAIL,
  LOAD_PROGRESS_STARTED,
  LOAD_PROGRESS_SUCCESS,
  LOAD_TABS,
  SELECT_TAB,
} from '../../actions/generalProgress.actions';

export type GeneralProgresslState = {
  tabs?: TabData[];
  selectedTab: number;
  progressData?: any[];
  isLoad: boolean;
  error?: string;
};

export const initialState: GeneralProgresslState = {
  tabs: [],
  selectedTab: -1,
  progressData: undefined,
  isLoad: false,
  error: undefined,
};

export const generalProgressReducer: Reducer<GeneralProgresslState, GeneralProgressActions> = (
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
    case LOAD_PROGRESS:
      return {
        ...state,
        progressData: action.payload,
        isLoad: false,
        error: undefined,
      };
    case LOAD_PROGRESS_STARTED:
      return {
        ...state,
        isLoad: true,
      };
    case LOAD_PROGRESS_SUCCESS:
      return {
        ...state,
        isLoad: false,
        error: undefined,
      };
    case LOAD_PROGRESS_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoad: false,
      };
    default:
      return state;
  }
};
