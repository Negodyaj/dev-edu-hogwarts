import { Reducer } from 'react';
import {
  NewLessonPageAction,
  UPLOAD_LESSONS_FAIL,
  UPLOAD_LESSONS_STARTED,
  UPLOAD_LESSONS_SUCSSES,
} from '../../actions/newLessonPage.action';

export interface NewLessonPageState {
  message?: string;
  isLoading: boolean;
}

const initialState: NewLessonPageState = {
  message: undefined,
  isLoading: false,
};

export const NewLessonPageReducer: Reducer<NewLessonPageState | undefined, NewLessonPageAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UPLOAD_LESSONS_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case UPLOAD_LESSONS_SUCSSES:
      return {
        ...state,
        isLoading: false,
      };
    case UPLOAD_LESSONS_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
