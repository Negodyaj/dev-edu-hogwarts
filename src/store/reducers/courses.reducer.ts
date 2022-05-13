import { Reducer } from 'redux';
import {
  CoursesPageAction,
  LOAD_COURSES_TABS,
  SET_COURSES,
  SET_FULL_COURSES,
  SELECT_TAB,
  SET_TOPICS,
} from '../../actions/courses.actions';
import { CourseResponse } from '../../models/responses/CourseResponse';
import { TopicResponse } from '../../models/responses/TopicResponse';
import { TabData } from '../../models/TabData';
import { Icon } from '../../shared/enums/Icon';

export interface CoursesPageState {
  courseTabs?: TabData[];
  selectedTabCoursePage: number;
  courses?: CourseResponse[];
  topics: TopicResponse[];
  currentCourse?: CourseResponse;
}

const initialState: CoursesPageState = {
  courseTabs: [],
  topics: [],
  selectedTabCoursePage: -1,
  courses: [],
};

export const coursesPageReducer: Reducer<CoursesPageState, CoursesPageAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_COURSES_TABS: {
      const courseTabs: TabData[] = action.payload.map((course) => {
        const tabData: TabData = {
          id: course.id,
          text: course.name,
          icon: Icon.Cookie,
        };
        return tabData;
      });
      return {
        ...state,
        courseTabs: courseTabs,
        selectedTabCoursePage: courseTabs[0]?.id,
      };
    }
    case SELECT_TAB: {
      return {
        ...state,
        selectedTabCoursePage: action.payload,
      };
    }
    case SET_COURSES: {
      return {
        ...state,
        courses: action.payload,
      };
    }
    case SET_FULL_COURSES: {
      return {
        ...state,
        currentCourse: action.payload,
      };
    }
    case SET_TOPICS: {
      return {
        ...state,
        topics: action.payload,
      };
    }
    default:
      return state;
  }
};
