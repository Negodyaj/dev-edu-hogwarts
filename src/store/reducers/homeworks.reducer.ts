import { Reducer } from "react";
import { HomeworkCardData } from "../../models/HomeworkCardData"
import {LOAD_HWCARDS, HomeworkPageAction } from '../../actions/homeworks.actions'

export interface HomeworkPageState{
  homeworkCards?: HomeworkCardData[]
}
const initialState: HomeworkPageState = {
  homeworkCards: []
};
export const homeworksPageReducer: Reducer<HomeworkPageState, HomeworkPageAction> = 
  ( state = initialState, action ) => {
    switch (action.type) {
      case LOAD_HWCARDS: {
        return {
          ...state,
          homeworkCards: action.response
        };
      }
      default:
        return state;
    }
  };
