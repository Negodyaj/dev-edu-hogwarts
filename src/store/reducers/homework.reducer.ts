import {
  Homework,
  StudentHomework,
} from '../../models/responses/HomeworksResponse';
import { Reducer } from 'redux';
import {
  EDIT_HOMEWORK,
  GET_HOMEWORK_BY_ID,
  GET_HOMEWORK_BY_ID_SUCCESS,
  GET_STUDENT_HOMEWORK,
  HomeworkPageAction,
  LOAD_ANSWER,
} from '../../actions/homework.actions';

export interface HomeworkPageState {
  homework?: Homework;
  studentHomeworkProgress?: StudentHomework;
  dialog?: string;
  isEdit: boolean;
  loading: boolean;
  answer: string;
}

const initialState: HomeworkPageState = {
  homework: undefined,
  studentHomeworkProgress: undefined,
  dialog: '',
  isEdit: false,
  loading: false,
  answer: '',
};

export const homeworkPageReducer: Reducer<
  HomeworkPageState,
  HomeworkPageAction
> = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOMEWORK_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        homework: action.payload,
      };
    case GET_HOMEWORK_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case GET_STUDENT_HOMEWORK:
      return {
        ...state,
        studentHomeworkProgress: action.payload,
      };
    case LOAD_ANSWER:
      return {
        ...state,
        answer: action.payload,
      };
    case EDIT_HOMEWORK:
      return {
        ...state,
        isEdit: action.payload,
      };
    default:
      return state;
  }
};
