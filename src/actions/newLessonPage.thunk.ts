import { Dispatch } from 'react';
import { LessonFullInfoResponse } from '../models/responses/LessonResponse';
import { NewLessonFormData } from '../pages/NewLessonPage/NewLessonPage';
import { baseWretch } from '../services/base-wretch.service';
import { getUrlLessonsFullInfo, lessonsUrl } from '../shared/consts';
import {
  getDataToEditSuccess,
  NewLessonPageAction,
  uploadLessonFail as loadLessonFail,
  uploadLessonStarted as loadLessonStarted,
  uploadLessonSuccess,
} from './newLessonPage.action';

export const uploadLesson = (newLessonsData: NewLessonFormData) => {
  return async (dispatch: Dispatch<NewLessonPageAction>) => {
    dispatch(loadLessonStarted());

    try {
      await baseWretch().url(lessonsUrl).post(newLessonsData).json();
      dispatch(uploadLessonSuccess());
    } catch (e: any) {
      dispatch(loadLessonFail(e.message));
    }
  };
};

export const updateLesson = (newLessonsData: NewLessonFormData) => {
  return async (dispatch: Dispatch<NewLessonPageAction>) => {
    dispatch(loadLessonStarted());

    try {
      await baseWretch().url(`${lessonsUrl}/${newLessonsData.id}`).put(newLessonsData).json();
      dispatch(uploadLessonSuccess());
    } catch (e: any) {
      dispatch(loadLessonFail(e.message));
    }
  };
};

export const getLessonsInfo = (id: number) => {
  return async (dispatch: Dispatch<NewLessonPageAction>) => {
    dispatch(loadLessonStarted());

    try {
      const fullLessonsData: LessonFullInfoResponse = await baseWretch()
        .url(getUrlLessonsFullInfo(id))
        .get()
        .json();

      const lessonsFormData: NewLessonFormData = {
        id: fullLessonsData.id,
        date: fullLessonsData.date,
        additionalMaterials: fullLessonsData.additionalMaterials,
        isPublished: false,
        linkToRecord: fullLessonsData.linkToRecord,
        name: fullLessonsData.name,
      };
      dispatch(getDataToEditSuccess(lessonsFormData));
    } catch (e: any) {
      dispatch(loadLessonFail(e.message));
    }
  };
};
