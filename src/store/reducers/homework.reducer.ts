import {
  Homework,
  StudentHomework,
} from '../../models/responses/HomeworksResponse';
import { Reducer } from 'redux';
import {
  EDIT_HOMEWORK,
  GET_HOMEWORK_BY_ID,
  GET_STUDENT_HOMEWORK,
  HomeworkPageAction,
} from '../../actions/homework.actions';

export interface HomeworkPageState {
  homework?: Homework;
  studentHomeworkProgress?: StudentHomework;
  dialog?: string;
  isEdit: boolean;
  answer?: string;
}

const initialState: HomeworkPageState = {
  homework: undefined,
  studentHomeworkProgress: undefined,
  dialog: '',
  isEdit: false,
  answer: '',
};

export const homeworkPageReducer: Reducer<
  HomeworkPageState,
  HomeworkPageAction
> = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOMEWORK_BY_ID:
      return {
        ...state,
        homework: action.payload,
      };
    case GET_STUDENT_HOMEWORK:
      return {
        ...state,
        studentHomeworkProgress: action.payload,
        answer: action.payload?.answer,
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
