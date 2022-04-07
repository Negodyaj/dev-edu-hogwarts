import { Reducer } from 'redux';
import {Homework} from "../../models/responses/HomeworksResponse";
import {
  HomeworksPageAction,
  LOAD_HOMEWORKS,
  RECEIVE_HOMEWORKS,
  LOAD_TABS,
  SELECT_GROUP_TAB
} from "../../actions/homeworks.actions";
import {TabData} from "../../models/TabData";

export interface HomeworksPageState {
  homeworks: Homework[];
  loading: boolean;
  tabs: TabData[];
  selectedTab: number;
}

const initialState: HomeworksPageState = {
  homeworks: [],
  loading: false,
  tabs: [],
  selectedTab: 1,
};

export const homeworksPageReducer: Reducer<HomeworksPageState, HomeworksPageAction> =
  ( state = initialState, action ) => {
    switch (action.type) {
      case RECEIVE_HOMEWORKS: {
        return {
          ...state,
          homeworks: action.payload,
          loading: false,
        };
      }
      case LOAD_HOMEWORKS: {
        return {
          ...state,
          loading: true,
        }
      }
      case SELECT_GROUP_TAB: {
        return {
          ...state,
          selectedTab: action.payload,
        };
      }
      case LOAD_TABS: {
        return {
          ...state,
          tabs: action.payload,
          selectedTab: action.payload[0].id,
        }
      }
      default:
        return state;
    }
  };
