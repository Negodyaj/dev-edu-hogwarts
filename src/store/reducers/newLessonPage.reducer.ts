import moment from 'moment';
import { Reducer } from 'react';
import {
  GET_DATA_TO_EDIT,
  NewLessonPageAction,
  RESET_DATA_TO_CREATE,
  UPLOAD_LESSONS_FAIL,
  UPLOAD_LESSONS_STARTED,
  UPLOAD_LESSONS_SUCSSES,
} from '../../actions/newLessonPage.action';
import { NewLessonFormData } from '../../pages/NewLessonPage/NewLessonPage';

export interface NewLessonPageState {
  message?: string;
  isLoading: boolean;
  lessonsData?: NewLessonFormData;
}

const initialLessonsData: NewLessonFormData = {
  date: `${moment().format('DD.MM.YYYY')}`,
  additionalMaterials: '',
  groupId: -1,
  name: '',
  linkToRecord: '',
  isPublished: false,
};

const initialState: NewLessonPageState = {
  message: undefined,
  isLoading: false,
  lessonsData: initialLessonsData,
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
    case GET_DATA_TO_EDIT:
      return {
        ...state,
        lessonsData: action.payload,
      };
    case RESET_DATA_TO_CREATE:
      return {
        ...state,
        lessonsData: initialLessonsData,
      };
    default:
      return state;
  }
};
