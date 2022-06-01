import { Reducer } from 'redux';
import {
  GET_DATA_FROM_FORM,
  GET_TEACHERS_FOR_GROUP,
  GET_TUTORS_FOR_GROUP,
  // GET_ID_FOR_GROUP,
  LOAD_COURSES_SUCCESS,
  LOAD_FAIL,
  LOAD_GROUP_FOR_CHANGE,
  LOAD_STARTED,
  LOAD_USERS_SUCCESS,
  NewGroupFormAction,
} from '../../actions/NewGroupForm.actions';
import { CourseResponse } from '../../models/responses/CourseResponse';
import { GroupResponseWithUsers } from '../../models/responses/GroupResponseWithUsers';
import { UserResponseShort } from '../../models/responses/UserResponseShort';
import { GroupStatus } from '../../shared/enums/GroupStatus';

export interface NewGroupFormState {
  group: GroupResponseWithUsers;
  teacherIdsForGroup: number[];
  tutorIdsForGroup: number[];
  users: UserResponseShort[];
  courses: CourseResponse[];
  isLoading: boolean;
  errorMessage: string;
}
const initialState: NewGroupFormState = {
  group: {
    students: [],
    teachers: [],
    tutors: [],
    id: 0,
    name: '',
    course: { id: 0, name: '', isDeleted: false },
    groupStatus: GroupStatus.Forming,
    startDate: '',
    endDate: '',
    timetable: '',
    paymentPerMonth: 0,
    paymentsCount: 3,
  },
  teacherIdsForGroup: [],
  tutorIdsForGroup: [],
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
        group: action.payload,
      };
    }
    case LOAD_GROUP_FOR_CHANGE: {
      const teachers: number[] = action.payload.teachers.map((teacher) => {
        const teacherId = teacher.id;
        return teacherId;
      });
      const tutors: number[] = action.payload.tutors.map((tutor) => {
        const tutorId = tutor.id;
        return tutorId;
      });
      return {
        ...state,
        group: action.payload,
        teacherIdsForGroup: teachers,
        tutorIdsForGroup: tutors,
        isLoading: false,
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
    default:
      return state;
  }
};
