import { Reducer } from 'redux';
import { GET_GROUPS, GroupsPageAction, SELECT_GROUP } from '../../actions/groups.actions';
import { GroupResponseById } from '../../models/responses/GroupResponseById';
import { GroupResponse } from '../../models/responses/GroupResponse';

export interface GroupsPageState {
  groups: GroupResponse[] | undefined;
  selectedGroup: GroupResponseById | undefined;
}

const initialState: GroupsPageState = {
  groups: undefined,
  selectedGroup: undefined
}

export const groupsPageReducer: Reducer<GroupsPageState | undefined, GroupsPageAction> = (
  state: GroupsPageState | undefined = initialState,
  action
) => {
  switch (action.type) {
    case GET_GROUPS: {
      return {
        ...state,
        groups: action.payload[0],
        selectedGroup: action.payload[1]
      };
    }
    case SELECT_GROUP: {
      return {
        ...state,
        selectedGroup: action.payload
      };
    }
    default:
      return state;
  }
};