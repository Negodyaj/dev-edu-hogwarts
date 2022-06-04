import { Dispatch } from 'react';
import { GroupResponse } from '../models/responses/GroupResponse';
import { baseWretch } from '../services/base-wretch.service';
import { groupUrl } from '../shared/consts';
import {
  loadGroupsFail,
  loadGroupsStarted,
  loadGroupsSucsses,
  NewLessonPageAction,
} from './newLessonPage.action';

export const loadGroups = () => {
  return (dispatch: Dispatch<NewLessonPageAction>) => {
    dispatch(loadGroupsStarted());

    baseWretch()
      .url(groupUrl)
      .get()
      .json((data) => {
        const groupsList = data as GroupResponse[];
        dispatch(loadGroupsSucsses(groupsList));
      })
      .catch((error) => dispatch(loadGroupsFail(error.message)));
  };
};
