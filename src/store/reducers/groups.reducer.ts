import { Reducer } from 'redux';
import {
  GET_GROUPS,
  GroupsPageAction,
  SELECT_GROUP,
  SELECT_TAB,
} from '../../actions/groups.actions';
import { GroupResponseById } from '../../models/responses/GroupResponseById';
import { GroupResponse } from '../../models/responses/GroupResponse';

export interface GroupsPageState {
  groups: GroupResponse[];
  selectedGroup: GroupResponseById;
  selectedTab: number;
}

const initialState: GroupsPageState = {
  groups: [],
  selectedGroup: { students: [], teachers: [], tutors: [], id: 0 },
  selectedTab: -1,
};

export const groupsPageReducer: Reducer<GroupsPageState, GroupsPageAction> = (
  state: GroupsPageState = initialState,
  action
) => {
  switch (action.type) {
    case GET_GROUPS: {
      const groupsList = action.payload;
      return {
        ...state,
        groups: action.payload,
        selectedTab: groupsList[0].id,
      };
    }
    case SELECT_TAB: {
      return {
        ...state,
        selectedTab: action.payload,
      };
    }
    case SELECT_GROUP: {
      return {
        ...state,
        selectedGroup: action.payload,
      };
    }
    default:
      return state;
  }
};
