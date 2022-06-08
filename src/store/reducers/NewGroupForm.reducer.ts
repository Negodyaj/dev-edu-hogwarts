import { Reducer } from 'redux';
import {
  GET_DATA_FROM_FORM,
  GET_TEACHERS_FOR_GROUP,
  GET_TUTORS_FOR_GROUP,
  LOAD_COURSES_SUCCESS,
  LOAD_FAIL,
  LOAD_GROUP_FOR_CHANGE,
  LOAD_USERS_SUCCESS,
  NewGroupFormAction,
  RESET_NEW_GROUP_PAGE,
} from '../../actions/NewGroupForm.actions';
import { CourseSimpleResponse } from '../../models/responses/CourseSimpleResponse';
import { UserSimpleResponseWithRoles } from '../../models/responses/UserResponse';
import { GroupResponseWithUsers } from '../../models/responses/GroupResponseWithUsers';

export interface NewGroupFormState {
  group: GroupResponseWithUsers | undefined;
  teacherIdsForGroup: number[];
  tutorIdsForGroup: number[];
  users: UserSimpleResponseWithRoles[];
  courses: CourseSimpleResponse[];
  errorMessage: string;
}
const initialState: NewGroupFormState = {
  group: undefined,
  teacherIdsForGroup: [],
  tutorIdsForGroup: [],
  users: [],
  courses: [],
  errorMessage: '',
};

export const NewGroupFormReducer: Reducer<NewGroupFormState, NewGroupFormAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_FAIL: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case LOAD_COURSES_SUCCESS: {
      return {
        ...state,
        courses: action.payload,
      };
    }
    case LOAD_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case GET_DATA_FROM_FORM: {
      return {
        ...state,
        group: action.payload,
      };
    }
    case LOAD_GROUP_FOR_CHANGE: {
      return {
        ...state,
        group: action.payload,
      };
    }
    case GET_TEACHERS_FOR_GROUP: {
      return {
        ...state,
        teacherIdsForGroup: action.payload,
      };
    }
    case GET_TUTORS_FOR_GROUP: {
      return {
        ...state,
        tutorIdsForGroup: action.payload,
      };
    }
    case RESET_NEW_GROUP_PAGE: {
      return {
        ...state,
        group: undefined,
        teacherIdsForGroup: [],
        tutorIdsForGroup: [],
        errorMessage: '',
      };
    }
    default:
      return state;
  }
};
