import { Reducer } from 'redux';
import {
  StudentsListPageAction,
  LOAD_GROUPS_FAIL,
  LOAD_GROUPS_STARTED,
  LOAD_GROUPS_SUCCESS,
} from '../../actions/studentsList.actions';
import { GroupResponse } from '../../models/responses/GroupResponse';

export interface StudentsListPageState {
  groups?: GroupResponse[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: StudentsListPageState = {
  groups: [],
  isLoading: false,
  errorMessage: '',
};

export const studentsListPageReducer: Reducer<StudentsListPageState, StudentsListPageAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_GROUPS_SUCCESS: {
      const groupsList = action.payload;
      return {
        ...state,
        groups: groupsList,
        isLoading: false,
      };
    }
    case LOAD_GROUPS_STARTED: {
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    }
    case LOAD_GROUPS_FAIL: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
