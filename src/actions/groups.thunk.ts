import { Dispatch } from 'react';
import { GroupResponse } from '../models/responses/GroupResponse';
import { GroupResponseWithUsers } from '../models/responses/GroupResponseWithUsers';
import { baseWretch } from '../services/base-wretch.service';
import { GroupByIdUrl, groupUrl } from '../shared/consts';
import {
  GroupsPageAction,
  loadGroupsFail,
  loadGroupsStarted,
  loadGroupsSuccess,
  selectGroup,
  selectTab,
} from './groups.actions';

export const loadGroups = () => {
  return (dispatch: Dispatch<GroupsPageAction>) => {
    dispatch(loadGroupsStarted());

    baseWretch()
      .url(groupUrl)
      .get()
      .json((data) => {
        const groupsList = data as GroupResponse[];
        const id: number = groupsList[0].id;
        baseWretch()
          .url(GroupByIdUrl(id))
          .get()
          .json((dataGroup) => {
            dispatch(selectGroup(dataGroup as GroupResponseWithUsers));
            dispatch(loadGroupsSuccess(groupsList));
            dispatch(selectTab(id));
          });
      })
      .catch((error) => dispatch(loadGroupsFail(error.message)));
  };
};

export const loadGroupById = (groupId: number) => {
  return (dispatch: Dispatch<GroupsPageAction>) => {
    dispatch(loadGroupsStarted());

    baseWretch()
      .url(GroupByIdUrl(groupId))
      .get()
      .json((GroupInfo) => {
        dispatch(selectGroup(GroupInfo as GroupResponseWithUsers));
      })
      .catch((error) => dispatch(loadGroupsFail(error.message)));
  };
};
