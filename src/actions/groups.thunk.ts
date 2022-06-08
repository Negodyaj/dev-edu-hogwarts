import { Dispatch } from 'react';
import { GroupResponse } from '../models/responses/GroupResponse';
import { GroupResponseWithUsers } from '../models/responses/GroupResponseWithUsers';
import { baseWretch } from '../services/base-wretch.service';
import { groupByIdUrl, groupUrl } from '../shared/consts';
import {
  GroupsPageAction,
  loadGroupsFail,
  loadGroupsSuccess,
  selectGroup,
  selectTab,
} from './groups.actions';
import { LoaderAction, DecrementLoader, IncrementLoader } from './loader.action';

export const loadGroups = () => {
  return (dispatch: Dispatch<LoaderAction | GroupsPageAction>) => {
    dispatch(IncrementLoader());
    baseWretch()
      .url(groupUrl)
      .get()
      .json((data) => {
        const groupsList = data as GroupResponse[];
        const id: number = groupsList[0].id;
        baseWretch()
          .url(groupByIdUrl(id))
          .get()
          .json((dataGroup) => {
            dispatch(selectGroup(dataGroup as GroupResponseWithUsers));
            dispatch(loadGroupsSuccess(groupsList));
            dispatch(selectTab(id));
            // setTimeout(() => dispatchLoader(DecrementLoader()), 3000);
            dispatch(DecrementLoader());
          });
      })
      .catch((error) => {
        dispatch(loadGroupsFail(error.message));
        dispatch(DecrementLoader());
      });
    // dispatchLoader(DecrementLoader());
    // // setTimeout(() => dispatchLoader(DecrementLoader()), 3000);
  };
};

export const loadGroupById = (groupId: number) => {
  return (dispatch: Dispatch<GroupsPageAction | LoaderAction>) => {
    dispatch(IncrementLoader());
    baseWretch()
      .url(groupByIdUrl(groupId))
      .get()
      .json((GroupInfo) => {
        dispatch(selectGroup(GroupInfo as GroupResponseWithUsers));
        dispatch(DecrementLoader());
      })
      .catch((error) => {
        dispatch(loadGroupsFail(error.message));
        dispatch(DecrementLoader());
      });
  };
};
