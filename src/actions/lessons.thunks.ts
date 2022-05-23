import { Dispatch } from 'react';
import { LessonResponse } from '../models/responses/LessonResponse';
import { baseWretch } from '../services/base-wretch.service';
import { LessonsByGroupId } from '../shared/consts';
import { LessonsPageActions, loadLessonsStarted, loadLessonsSuccess } from './lessons.actions';

export const loadLessons = (groupId: number) => {
  return (dispatch: Dispatch<LessonsPageActions>) => {
    dispatch(loadLessonsStarted());

    baseWretch()
      .url(LessonsByGroupId(groupId))
      .get()
      .json((data) => dispatch(loadLessonsSuccess(data as LessonResponse[])));
  };
};