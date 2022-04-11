import { Reducer } from "react";
import { HomeworkCardData } from "../../models/HomeworkCardData"
import {LOAD_HWCARDS, SELECT_HWCARD,NotificationsPageAction } from '../../actions/homeworks.actions'

export interface HomeworkPageState{
  homeworkCard: HomeworkCardData[],
  selectedCard: number
}
const initialState: HomeworkPageState = {
  homeworkCard: [],
  selectedCard: 1
};
export const homeworksPageReducer: Reducer<HomeworkPageState, NotificationsPageAction> = 
  ( state = initialState, action ) => {
    switch (action.type) {
      case LOAD_HWCARDS: {
        return {
          ...state
        };
      }
      case SELECT_HWCARD: {
        return {
          ...state,
          selectedCard:action.payload
        }
      }
      default:
        return state;
    }
  };
