import { Homework, StudentHomework, Task } from '../../models/responses/HomeworksResponse';
import { Reducer } from 'redux';
import {
  CLEAR_HOMEWORK,
  EDIT_HOMEWORK,
  GET_STUDENT_HOMEWORK,
  HomeworkPageAction,
  LOAD_HOMEWORK_FAIL,
  LOAD_HOMEWORK_STARTED,
  LOAD_HOMEWORK_SUCCESS,
  LOAD_TASK_SUCCESS,
  LOAD_TASK_STARTED,
  LOAD_TASK_FAILED,
  SET_PREVURL,
} from '../../actions/homework.actions';

export interface HomeworkPageState {
  homework?: Homework;
  task?: Task;
  studentHomeworkProgress?: StudentHomework;
  dialog?: string;
  isEdit: boolean;
  isLoad: boolean;
  errorMessage?: string;
  prevPageURL: string;
}

const initialState: HomeworkPageState = {
  homework: undefined,
  task: undefined,
  studentHomeworkProgress: undefined,
  dialog: '',
  isEdit: false,
  isLoad: false,
  errorMessage: undefined,
  prevPageURL: '',
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
    case LOAD_TASK_SUCCESS:
      return {
        ...state,
        task: action.payload,
        isLoad: false,
        errorMessage: undefined,
      };
    case LOAD_TASK_STARTED:
      return {
        ...state,
        isLoad: true,
      };
    case SET_PREVURL:
      return {
        ...state,
        prevPageURL: action.payload,
      };
    case LOAD_TASK_FAILED:
      return {
        ...state,
        isLoad: false,
        errorMessage: action.payload,
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
        task: undefined,
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
