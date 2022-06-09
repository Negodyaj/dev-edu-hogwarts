import { Reducer } from 'redux';
import {
  StudentsListPageAction,
  LOAD_GROUPS_FAIL,
  LOAD_GROUPS_STARTED,
  LOAD_GROUPS_SUCCESS,
  LOAD_STUDENTS_STARTED,
  LOAD_STUDENTS_SUCCESS,
  LOAD_STUDENTS_FAIL,
} from '../../actions/studentsList.actions';
import { GroupResponse } from '../../models/responses/GroupResponse';
import { StudentResponse } from '../../models/responses/StudentsResponse';

export interface StudentsListPageState {
  students: StudentResponse[];
  groups: GroupResponse[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: StudentsListPageState = {
  students: [],
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
    case LOAD_STUDENTS_SUCCESS: {
      const studentsList = action.payload;
      return {
        ...state,
        students: studentsList,
        isLoading: false,
      };
    }
    case LOAD_STUDENTS_STARTED: {
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    }
    case LOAD_STUDENTS_FAIL: {
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
