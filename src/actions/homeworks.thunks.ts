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
  return (dispatch: Dispatch<HomeworksPageAction>) => {
    dispatch(loadHomeworksStarted());

    baseWretch()
      .url(getHomeworksByGroupId(groupId))
      .get()
      .json((data) => dispatch(loadHomeworksSuccess(data as Homework[])));
  };
};

export const loadHomework = (homeworkId: number) => {
  return (dispatch: Dispatch<HomeworkPageAction>) => {
    dispatch(loadHomeworkStarted());

    baseWretch()
      .url(getHomeworkById(homeworkId))
      .get()
      .json((response) => {
        dispatch(loadHomeworkSuccess(response as Homework));
        baseWretch()
          .url(getStudentAnswerByTaskId((response as Homework).task.id))
          .get()
          .json((studentHomework) => {
            dispatch(loadStudentHomework(studentHomework as StudentHomework));
          });
      })
      .catch((error) => dispatch(loadHomeworkFail(error.message)));
  };
};
