import { Reducer } from 'redux';
import { HomeworkPageAction, SELECT_TAB, LOAD_TABS, LOAD_HOMEWORKS } from '../../actions/homeworks.actions';
import { HomeworkCardResponse } from '../../models/responses/HomeworkCardResponse';
import { TabData } from '../../models/TabData';
import { Icon } from '../../shared/enums/Icon';

const tabsMock = [
  {
    id: 1,
    text: "Tab 1",
    icon: Icon.Cake
  }, {
    id: 2,
    text: "Tab 2",
    icon: Icon.Cookie
  }, {
    id: 3,
    text: "Tab Comp",
    icon: Icon.Computer
  }
];



export interface HomeWorkPageState {
  tabs: TabData[]
  selectedTab: number
  homeworks?: HomeworkCardResponse[]


}

const initialState: HomeWorkPageState = {
  tabs: [],
  selectedTab: 1,
  homeworks: []
};

export const homeworkPageReducer: Reducer<HomeWorkPageState, HomeworkPageAction> =
  (state = initialState, action) => {
    switch (action.type) {
      case SELECT_TAB: {
        return {
          ...state,
          selectedTab: action.payload
        };
      }
      case LOAD_TABS: {
        return {
          ...state,
          tabs: tabsMock
        }
      }
      case LOAD_HOMEWORKS: {
        return {
          ...state,
          homeworks: action.response
        }
      }
      default:
        return state;
    }
  };