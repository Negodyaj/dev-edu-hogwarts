import { Dispatch } from 'react';
import { GroupResponse } from '../models/responses/GroupResponse';
import { baseWretch } from '../services/base-wretch.service';
import { groupUrl } from '../shared/consts';
import {
  loadGroupsStarted,
  loadGroupsSuccess,
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
