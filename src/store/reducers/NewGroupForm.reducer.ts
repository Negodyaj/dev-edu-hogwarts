import { Reducer } from 'redux';
import {
  GET_DATA_FROM_FORM,
  GET_ID_FOR_GROUP,
  LOAD_COURSES_SUCCESS,
  LOAD_FAIL,
  LOAD_STARTED,
  LOAD_USERS_SUCCESS,
  NewGroupFormAction,
} from '../../actions/NewGroupForm.actions';
import { CourseResponse } from '../../models/responses/CourseResponse';
import { UserResponseShort } from '../../models/responses/UserResponseShort';

export interface NewGroupFormState {
  id: number;
  name: string;
  teacherIds: number[];
  tutorIds: number[];
  groupStatusId: string;
  startDate: string;
  endDate: string;
  timetable: string;
  paymentPerMonth: number;
  paymentsCount: number;
  courseId: number;
  users: UserResponseShort[];
  courses: CourseResponse[];
  isLoading: boolean;
  errorMessage: string;
}
const initialState: NewGroupFormState = {
  id: 0,
  name: '',
  teacherIds: [],
  tutorIds: [],
  groupStatusId: '',
  startDate: '',
  endDate: '',
  timetable: '',
  paymentPerMonth: 0,
  paymentsCount: 0,
  courseId: 0,
  users: [],
  courses: [],
  isLoading: false,
  errorMessage: '',
};

export const NewGroupFormReducer: Reducer<NewGroupFormState, NewGroupFormAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_FAIL: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    }
    case LOAD_COURSES_SUCCESS: {
      return {
        ...state,
        courses: action.payload,
        isLoading: false,
      };
    }
    case LOAD_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    }
    case GET_DATA_FROM_FORM: {
      return {
        ...state,
        name: action.payload.name,
        teacherIds: action.payload.teacherIds,
        tutorIds: action.payload.tutorIds,
        groupStatusId: action.payload.groupStatusId,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        timetable: action.payload.timetable,
        paymentPerMonth: action.payload.paymentPerMonth,
        paymentsCount: action.payload.paymentsCount,
        courseId: action.payload.courseId,
      };
    }
    case GET_ID_FOR_GROUP: {
      return {
        ...state,
        id: action.payload,
      };
    }
    default:
      return state;
  }
};
