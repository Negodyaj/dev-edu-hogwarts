import { Reducer } from 'redux';
import {
  GroupsPageAction,
  LOAD_GROUPS_FAIL,
  LOAD_GROUPS_SUCCESS,
  SELECT_GROUP,
  SELECT_TAB,
} from '../../actions/groups.actions';
import { GroupResponseWithUsers } from '../../models/responses/GroupResponseWithUsers';
import { GroupResponse } from '../../models/responses/GroupResponse';

export interface GroupsPageState {
  groups: GroupResponse[];
  selectedGroup: GroupResponseWithUsers;
  selectedTab: number;
  errorMessage: string;
}

const initialState: GroupsPageState = {
  groups: [],
  selectedGroup: {
    students: [],
    teachers: [],
    tutors: [],
    id: 0,
    name: '',
    course: { id: 0, name: '', isDeleted: false },
    groupStatus: 0,
    startDate: '',
    endDate: '',
    timetable: '',
    paymentPerMonth: 0,
    paymentsCount: 0,
  },
  selectedTab: -1,
  errorMessage: '',
};

export const groupsPageReducer: Reducer<GroupsPageState, GroupsPageAction> = (
  state: GroupsPageState = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_GROUPS_SUCCESS: {
      const groupsList = action.payload;
      return {
        ...state,
        groups: action.payload,
        selectedTab: groupsList[0].id,
      };
    }
    case LOAD_GROUPS_FAIL: {
      return {
        ...state,
        errorMessage: action.payload,
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
