import { Reducer } from 'react';
import {
  FILTER_LESSONS,
  LessonsPageActions,
  SELECT_TAB,
  LOAD_TABS,
  LOAD_LESSONS_STARTED,
  LOAD_LESSONS_SUCCESS,
  LOAD_LESSONS_FAIL,
} from '../../actions/lessons.actions';
import { LessonResponse } from '../../models/responses/LessonResponse';
import { TabData } from '../../models/TabData';
import { CourseIcon } from '../../components/SvgIcon/CoursesTabIcons';

export interface LessonsPageState {
  filteredLessons: LessonResponse[];
  tabs?: TabData[];
  selectedTab: number;
  lessons?: LessonResponse[];
  isLoading: boolean;
  errorMessage: string;
}

export const initialState: LessonsPageState = {
  filteredLessons: [],
  lessons: [],
  tabs: [],
  selectedTab: -1,
  isLoading: false,
  errorMessage: '',
};

export const lessonsPageReducer: Reducer<LessonsPageState | undefined, LessonsPageActions> = (
  state: LessonsPageState | undefined = initialState,
  action
) => {
  switch (action.type) {
    case FILTER_LESSONS:
      return {
        ...state,
        filteredLessons: action.payload,
      };
    case SELECT_TAB: {
      return {
        ...state,
        selectedTab: action.payload,
      };
    }
    case LOAD_TABS: {
      const tabs: TabData[] = action.payload.map((group) => {
        const tabData: TabData = {
          id: group.id,
          text: group.course.name,
          icon: CourseIcon[group.course.id],
        };
        return tabData;
      });

      return {
        ...state,
        tabs: tabs,
        selectedTab: tabs[0]?.id,
      };
    }
    case LOAD_LESSONS_STARTED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOAD_LESSONS_SUCCESS: {
      return {
        ...state,
        lessons: action.payload,
        isLoading: false,
      };
    }
    case LOAD_LESSONS_FAIL: {
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
