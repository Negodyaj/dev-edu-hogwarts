import { Dispatch } from 'react';
import { Homework } from '../models/responses/HomeworksResponse';
import { baseWretch } from '../services/base-wretch.service';
import { getHomeworksByGroupId } from '../shared/consts';
import { loadHomeworksStarted, loadHomeworksSuccess } from './homeworks.actions';

export const loadHomeworks = (groupId: number) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(loadHomeworksStarted());

    baseWretch()
      .url(getHomeworksByGroupId(groupId))
      .get()
      .json((data) => dispatch(loadHomeworksSuccess(data as Homework[])));
  };
};
