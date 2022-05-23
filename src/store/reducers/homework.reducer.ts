import { Homework, StudentHomework } from '../../models/responses/HomeworksResponse';
import { Reducer } from 'redux';
import {
  CLEAR_HOMEWORK,
  EDIT_HOMEWORK,
  GET_STUDENT_HOMEWORK,
  HomeworkPageAction,
  LOAD_HOMEWORK_FAIL,
  LOAD_HOMEWORK_STARTED,
  LOAD_HOMEWORK_SUCCESS,
} from '../../actions/homework.actions';

export interface HomeworkPageState {
  homework?: Homework;
  studentHomeworkProgress?: StudentHomework;
  dialog?: string;
  isEdit: boolean;
  isLoad: boolean;
  errorMessage?: string;
}

const initialState: HomeworkPageState = {
  homework: undefined,
  studentHomeworkProgress: undefined,
  dialog: '',
  isEdit: false,
  isLoad: false,
  errorMessage: undefined,
};

export const homeworkPageReducer: Reducer<HomeworkPageState, HomeworkPageAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_HOMEWORK_SUCCESS:
      return {
        ...state,
        homework: action.payload,
        isLoad: false,
        errorMessage: undefined,
      };
    case GET_STUDENT_HOMEWORK:
      return {
        ...state,
        studentHomeworkProgress: action.payload,
        isLoad: false,
        errorMessage: undefined,
      };
    case EDIT_HOMEWORK:
      return {
        ...state,
        isEdit: action.payload,
      };
    case CLEAR_HOMEWORK:
      return {
        ...state,
        homework: undefined,
        studentHomeworkProgress: undefined,
      };
    case LOAD_HOMEWORK_STARTED:
      return {
        ...state,
        isLoad: true,
      };
    case LOAD_HOMEWORK_FAIL:
      return {
        ...state,
        isLoad: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
