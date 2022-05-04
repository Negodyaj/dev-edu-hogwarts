import { Reducer } from 'redux';
import {
  CoursesPageAction,
  LOAD_COURSES_TABS,
  SET_COURSES,
  SET_FULL_COURSES,
} from '../../actions/courses.actions';
import { CourseResponse } from '../../models/responses/CourseResponse';
import { FullCourseResponse } from '../../models/responses/FullCourseResponse';
import { TabData } from '../../models/TabData';
import { Icon } from '../../shared/enums/Icon';

export interface CoursesPageState {
  courseTabs?: TabData[];
  selectedTab: number;
  courses?: CourseResponse[];
  fullCourses?: FullCourseResponse[];
}

const initialState: CoursesPageState = {
  courseTabs: [],
  selectedTab: -1,
  courses: [],
  fullCourses: [],
};

export const coursesPageReducer: Reducer<
  CoursesPageState,
  CoursesPageAction
> = (state = initialState, action) => {
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
        selectedTab: courseTabs[0]?.id,
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
        fullCourses: action.payload,
      };
    }
    default:
      return state;
  }
};
