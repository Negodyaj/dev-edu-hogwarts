import {HomeworkById} from "../../models/responses/HomeworksResponse";
import {Reducer} from "redux";
import {GET_HOMEWORK_BY_ID, GET_HOMEWORK_BY_ID_SUCCESS, HomeworkPageAction} from "../../actions/homework.actions";

export interface HomeworkPageState {
  homework?: HomeworkById,
  dialog?: string,
  loading: boolean,
}

const initialState: HomeworkPageState = {
  homework: undefined,
  dialog: '',
  loading: false,
}

export const homeworkPageReducer: Reducer<HomeworkPageState, HomeworkPageAction> =
  (state = initialState, action) => {
    switch (action.type) {
      case GET_HOMEWORK_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          homework: action.payload,
        }
      case GET_HOMEWORK_BY_ID:
        return {
          ...state,
          loading: true,
        }
      default:
        return state;
    }
  }

