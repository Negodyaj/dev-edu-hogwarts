import { Reducer } from 'react';
import {
  CoursesPageActions,
  LOAD_TOPICS_FAILED,
  LOAD_TOPICS_STARTED,
  LOAD_TOPICS_SUCCESS,
} from '../../actions/topics.actions';
import { TopicFormData } from '../../pages/CoursesPage/EditCoursesPage';

export interface CoursesPageState {
  topics: TopicFormData[]; //TODO создать интерфейс данных для страницы курсов\ред курсов
}

const initialState: CoursesPageState = {
  topics: [],
};

export const coursesPageReducer: Reducer<CoursesPageState | undefined, CoursesPageActions> = (
  state: CoursesPageState = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_TOPICS_STARTED: {
      return {
        ...state,
      };
    }
    case LOAD_TOPICS_SUCCESS: {
      return {
        ...state,
        topics: action.payload,
      };
    }
    case LOAD_TOPICS_FAILED: {
      return {
        ...state,
        message: 'failed',
      };
    }
    default:
      return state;
  }
};
