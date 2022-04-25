import { Reducer } from 'react';
import {
  FILTER_LESSONS,
  LessonsPageActions,
  LOAD_LESSONS,
  SELECT_TAB,
  LOAD_TABS
} from '../../actions/lessons.actions';
import { LessonResponse } from '../../models/responses/LessonResponse';
import { TabData } from '../../models/TabData';
import { Icon } from '../../shared/enums/Icon';

export interface LessonsPageState {
  filteredLessons: LessonResponse[],
  tabs?: TabData[],
  selectedTab: number,
  lessons?: LessonResponse[],
}

export const initialState: LessonsPageState = {
  filteredLessons: [],
  lessons: [],
  tabs: [],
  selectedTab: -1,
};

export const lessonsPageReducer: Reducer<
  LessonsPageState | undefined,
  LessonsPageActions
> = (state: LessonsPageState | undefined = initialState, action) => {
  switch (action.type) {
    case FILTER_LESSONS:
      return {
        ...state,
        filteredLessons: action.payload,
      };
    case SELECT_TAB: {
        return {
          ...state,
          selectedTab: action.payload
        };
      }
    case LOAD_TABS: {
      let tabs: TabData[] = action.payload.map(group => {
        let tabData: TabData = {
          id: group.id,
          text: group.course.name,
          icon: getCourseIcon(group.course.name as CourseName) 
        }
        return tabData;
      });

      return {
        ...state,
        tabs: tabs,
        selectedTab: tabs[0]?.id
      }
    }
    case LOAD_LESSONS: {
      return {
        ...state,
        lessons: action.payload 
      }
    }
    default:
      return state;
  }
};

const BASE_COURSE = 'Базовый курс' as const;
const BACKEND_COURSE = 'Специализация Backend' as const;
const FRONTEND_COURSE = 'Frontend' as const;
const QA_COURSE = 'QA automation' as const;

export type CourseName = 
  typeof BASE_COURSE |
  typeof BACKEND_COURSE |
  typeof FRONTEND_COURSE |
  typeof QA_COURSE

const getCourseIcon = (courseName: CourseName) => {
  switch (courseName) {
    case BASE_COURSE:
      return Icon.Computer;
    case BACKEND_COURSE:
      return Icon.Barrel;
    case FRONTEND_COURSE:
      return Icon.Chevron;
    case QA_COURSE:
      return Icon.Calendar;
    default:
      return Icon.Exit; //TODO: удалить
  }
}