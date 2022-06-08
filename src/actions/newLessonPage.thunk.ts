import { Dispatch } from 'react';
import { NewLessonFormData } from '../pages/NewLessonPage/NewLessonPage';
import { baseWretch } from '../services/base-wretch.service';
import { lessonsUrl } from '../shared/consts';
import {
  NewLessonPageAction,
  uploadLessonFail,
  uploadLessonStarted,
  uploadLessonSuccess,
} from './newLessonPage.action';

export const uploadLesson = (newLessonsData: NewLessonFormData) => {
  return async (dispatch: Dispatch<NewLessonPageAction>) => {
    dispatch(uploadLessonStarted());

    try {
      await baseWretch().url(lessonsUrl).post(newLessonsData).json();
      dispatch(uploadLessonSuccess());
    } catch (e: any) {
      dispatch(uploadLessonFail(e.message));
    }
  };
};

export const updateLesson = (newLessonsData: NewLessonFormData) => {
  return async (dispatch: Dispatch<NewLessonPageAction>) => {
    dispatch(uploadLessonStarted());

    try {
      await baseWretch().url(`${lessonsUrl}/${newLessonsData.id}`).put(newLessonsData).json();
      dispatch(uploadLessonSuccess());
    } catch (e: any) {
      dispatch(uploadLessonFail(e.message));
    }
  };
};
