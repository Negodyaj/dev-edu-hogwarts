import { Dispatch } from 'react';
import { GroupResponse } from '../models/responses/GroupResponse';
import { StudentResponse } from '../models/responses/StudentsResponse';
import { baseWretch } from '../services/base-wretch.service';
import { groupUrl, studentsUrl } from '../shared/consts';
import {
  loadGroupsStarted,
  loadGroupsSuccess,
  loadStudentsFail,
  loadStudentsStarted,
  loadStudentsSuccess,
  StudentsListPageAction,
} from './studentsList.actions';

export const loadGroups = () => {
  return (dispatch: Dispatch<StudentsListPageAction>) => {
    dispatch(loadGroupsStarted());

    baseWretch()
      .url(groupUrl)
      .get()
      .json((data) => dispatch(loadGroupsSuccess(data as GroupResponse[])));
  };
};

export const loadStudents = () => {
  return (dispatch: Dispatch<StudentsListPageAction>) => {
    dispatch(loadStudentsStarted());
    try {
      baseWretch()
        .url(studentsUrl)
        .get()
        .json((data) => dispatch(loadStudentsSuccess(data as StudentResponse[])));
    } catch (err: any) {
      dispatch(loadStudentsFail(err.message));
    }
  };
};
