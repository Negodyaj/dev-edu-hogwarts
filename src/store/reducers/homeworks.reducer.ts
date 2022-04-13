import { Reducer } from "react";
import { HomeworkCardResponse } from "../../models/responses/HomeworkCardResponse";
import {LOAD_HWCARDS,LOAD_TABS,SELECT_TAB, HomeworkPageAction } from '../../actions/homeworks.actions'
import { Icon } from "../../shared/enums/Icon";
import { TabData } from "../../models/TabData";

export interface HomeworkPageState{
  tabs?:TabData[],
  selectedTab:number,
  homeworkCards?: HomeworkCardResponse[],
}
const initialState: HomeworkPageState = {
  homeworkCards: [],
  selectedTab:1,
  tabs:[],
};
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
export const homeworksPageReducer: Reducer<HomeworkPageState, HomeworkPageAction> = 
  ( state = initialState, action ) => {
    switch (action.type) {
      case LOAD_HWCARDS: {
        return {
          ...state,
          homeworkCards: action.response
        };
      }
      case LOAD_TABS: {
        return {
          ...state,
          tabs: tabsMock
        };
      }
      case SELECT_TAB: {
        return {
          ...state,
          selectedTab: action.payload
        };
      }
      default:
        return state;
    }
  };
