import { Dispatch } from 'react';
import { LessonResponse } from '../models/responses/LessonResponse';
import { baseWretch } from '../services/base-wretch.service';
import { getUrlLessonsByGroupId, getUrlUnpublishedLessonsByGroupId } from '../shared/consts';
import {
  LessonsPageActions,
  loadLessonsFail,
  // loadLessonsStarted,
  loadLessonsSuccess,
} from './lessons.actions';

export const loadLessons = (groupId: number) => {
  return async (dispatch: Dispatch<LessonsPageActions>) => {
    // dispatch(loadLessonsStarted());

    try {
      const lessonsResponse: LessonResponse[] = await baseWretch()
        .url(getUrlLessonsByGroupId(groupId))
        .get()
        .json();
      dispatch(loadLessonsSuccess(lessonsResponse));
    } catch (error: any) {
      dispatch(loadLessonsFail(error.message));
    }
  };
};

export const loadLessonsDraft = (groupId: number) => {
  return async (dispatch: Dispatch<LessonsPageActions>) => {
    // dispatch(loadLessonsStarted());

    try {
      const lessonsResponse: LessonResponse[] = await baseWretch()
        .url(getUrlUnpublishedLessonsByGroupId(groupId))
        .get()
        .json();
      dispatch(loadLessonsSuccess(lessonsResponse));
    } catch (error: any) {
      dispatch(loadLessonsFail(error.message));
    }
  };
};
