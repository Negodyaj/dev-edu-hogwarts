import { Dispatch } from 'react';
import { HomeworkFormData } from '../models/HomeworkCardData';
import { StudentHomework } from '../models/responses/HomeworksResponse';
import { baseWretch } from '../services/base-wretch.service';
import { getStudentHomeworkByIdUrl } from '../shared/consts';
import {
  HomeworkPageAction,
  loadAnswer,
  loadHomeworkFail,
  loadHomeworkStarted,
  loadStudentHomework,
} from './homework.actions';

export const saveEdit = (data: HomeworkFormData, progressId?: number) => {
  return async (dispatch: Dispatch<HomeworkPageAction>) => {
    dispatch(loadHomeworkStarted());

    try {
      if (progressId) {
        const dateToPost = {
          ...data,
          id: progressId,
        };
        const studentHomework: StudentHomework = await baseWretch()
          .url(getStudentHomeworkByIdUrl(progressId))
          .put(dateToPost)
          .json();
        dispatch(loadStudentHomework(studentHomework));
        dispatch(loadAnswer(studentHomework.answer));
      }
    } catch (error: any) {
      dispatch(loadHomeworkFail(error.message));
    }
  };
};
