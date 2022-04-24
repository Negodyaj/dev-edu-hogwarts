import { Reducer } from 'react';
import {
  FILTER_LESSONS,
  LessonsPageActions,
  SET_LESSONS,
} from '../../actions/lessons.actions';
import { LessonModel } from '../../pages/LessonsPage/components/Lesson';

export interface LessonsPageState {
  lessons: LessonModel[]; // ToDo: change to response
  filteredLessons: LessonModel[];
}

export const initialState: LessonsPageState = {
  filteredLessons: [],
  lessons: [],
};

export const lessonsPageReducer: Reducer<
  LessonsPageState | undefined,
  LessonsPageActions
> = (state: LessonsPageState | undefined = initialState, action) => {
  switch (action.type) {
    case SET_LESSONS:
      return {
        ...state,
        lessons: action.payload,
        filteredLessons: action.payload,
      };
    case FILTER_LESSONS:
      return {
        ...state,
        filteredLessons: action.payload,
      };
    default:
      return state;
  }
};
