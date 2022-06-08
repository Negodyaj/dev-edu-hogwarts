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
import { LoaderAction, loaderDecrement, loaderIncrement } from './loader.action';

export const loadGroups = () => {
  return (dispatch: Dispatch<GroupsPageAction>, dispatchLoader: Dispatch<LoaderAction>) => {
    // return (dispatchLoader: Dispatch<LoaderAction>) => {
    //dispatch(loadGroupsStarted());
    dispatchLoader(loaderIncrement());
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
            dispatchLoader(loaderDecrement());
          });
      })
      .catch((error) => {
        dispatch(loadGroupsFail(error.message));
        dispatchLoader(loaderDecrement());
      });
  };
};

export const loadGroupById = (groupId: number) => {
  return (dispatch: Dispatch<GroupsPageAction>, dispatchLoader: Dispatch<LoaderAction>) => {
    //dispatch(loadGroupsStarted());
    dispatchLoader(loaderIncrement());
    baseWretch()
      .url(groupByIdUrl(groupId))
      .get()
      .json((GroupInfo) => {
        dispatch(selectGroup(GroupInfo as GroupResponseWithUsers));
        dispatchLoader(loaderDecrement());
      })
      .catch((error) => {
        dispatch(loadGroupsFail(error.message));
        dispatchLoader(loaderDecrement());
      });
  };
};
