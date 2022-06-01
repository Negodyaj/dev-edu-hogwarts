import { Dispatch } from 'react';
import { Homework, StudentHomework } from '../models/responses/HomeworksResponse';
import { baseWretch } from '../services/base-wretch.service';
import { getHomeworkById, getHomeworksByGroupId, getStudentAnswerByTaskId } from '../shared/consts';
import {
  HomeworksPageAction,
  loadHomeworksStarted,
  loadHomeworksSuccess,
} from './homeworks.actions';
import {
  HomeworkPageAction,
  loadHomeworkFail,
  loadHomeworkStarted,
  loadHomeworkSuccess,
  loadStudentHomework,
} from './homework.actions';

export const loadHomeworks = (groupId: number) => {
  return async (dispatch: Dispatch<HomeworksPageAction>) => {
    dispatch(loadHomeworksStarted());

    const data = await baseWretch().url(getHomeworksByGroupId(groupId)).get().json<Homework[]>();
    dispatch(loadHomeworksSuccess(data));
  };
};

export const loadHomework = (homeworkId: number) => {
  return async (dispatch: Dispatch<HomeworkPageAction>) => {
    dispatch(loadHomeworkStarted());

    try {
      const homework = await baseWretch().url(getHomeworkById(homeworkId)).get().json<Homework>();
      dispatch(loadHomeworkSuccess(homework));

      const studentHomework = await baseWretch()
        .url(getStudentAnswerByTaskId(homework.task.id))
        .get()
        .json<StudentHomework>();
      dispatch(loadStudentHomework(studentHomework));
    } catch (error: any) {
      dispatch(loadHomeworkFail(error.message));
    }
  };
};
