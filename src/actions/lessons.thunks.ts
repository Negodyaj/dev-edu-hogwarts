import { Dispatch } from 'react';
import { LessonResponse } from '../models/responses/LessonResponse';
import { baseWretch } from '../services/base-wretch.service';
import { lessonsByGroupId } from '../shared/consts';
import { LessonsPageActions, loadLessonsSuccess } from './lessons.actions';
import { DecrementLoader, IncrementLoader, LoaderAction } from './loader.action';

export const loadLessons = (groupId: number) => {
  return (dispatch: Dispatch<LessonsPageActions | LoaderAction>) => {
    dispatch(IncrementLoader());

    baseWretch()
      .url(lessonsByGroupId(groupId))
      .get()
      .json((data) => {
        dispatch(loadLessonsSuccess(data as LessonResponse[]));
        dispatch(DecrementLoader());
      });
  };
};
