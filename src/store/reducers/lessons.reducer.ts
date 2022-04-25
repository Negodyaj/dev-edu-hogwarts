import { Reducer } from 'react';
import {
  FILTER_LESSONS,
  LessonsPageActions,
  SET_LESSONS,
} from '../../actions/lessons.actions';
import { LessonModel } from '../../pages/LessonsPage/components/Lesson';

export interface LessonsPageState {
  lessons: LessonModel[]; // ToDo: change to response
  filteredLessons: LessonModel[];
}

export const initialState: LessonsPageState = {
  filteredLessons: [],
  lessons: [],
};

export const lessonsPageReducer: Reducer<
  LessonsPageState | undefined,
  LessonsPageActions
> = (state: LessonsPageState | undefined = initialState, action) => {
  switch (action.type) {
    case SET_LESSONS:
      return {
        ...state,
        lessons: action.payload,
        filteredLessons: action.payload,
      };
    case FILTER_LESSONS:
      return {
        ...state,
        filteredLessons: action.payload,
      };
    default:
      return state;
  }
};

import { tab } from '@testing-library/user-event/dist/tab';
import { useSelector } from 'react-redux';
import { Reducer } from 'redux';
import { LessonPageAction, LOAD_LESSONS, SELECT_TAB, LOAD_TABS } from '../../actions/lessons.actions';
import { LessonResponse } from '../../models/responses/LessonResponse';
import { UserResponse } from '../../models/responses/UserResponse';
import { TabData } from '../../models/TabData';
import { LessonModel } from '../../pages/LessonsPage/components/Lesson';
import { Icon } from '../../shared/enums/Icon';
import { AppState } from '../store';


/////////////////////////////////////////ToDelete
// const groupsMock = [
//   {id: 1,
//   name: '1',
//   course: {id:1, name: "Базовый курс", isDeleted: false},
//   groupStatus: "",
//   startDate: "string",
//   endDate: "string",
//   timetable: "string",
//   paymentPerMonth: 7500},
//   {id: 2,
//     name: '2',
//     course: {id:2, name: "QA automation", isDeleted: false},
//     groupStatus: "",
//     startDate: "string",
//     endDate: "string",
//     timetable: "string",
//     paymentPerMonth: 7500},
// ]
/////////////////////////////////////////ToDelete

// const lessonsMock: LessonModel[] = [
//   {id: 3, name: 'Занятие 3', date: '10.03.2022', theme: 'Познакомитесь с основами C++ и научитесь создавать простейшие консольные программы.', videoLink: 'https://disk.yandex.com/d/9WeaF1Yua7D1IA', additionalInfo: 'Плагин Figma, позволяет создавать красивые тени, просто перетаскивая «источник света»' },
//   {id: 2, name: 'Занятие 2', date: '14.02.2022', theme: 'Научитесь проектировать быстрые алгоритмы, применять стандартные структуры данных, а главное — мыслить как программист. Знание алгоритмов может повысить ваши шансы на трудоустройство, так как в большинстве компаний задачи на алгоритмы — неотъемлемая часть собеседования и тестового задания.', videoLink: '', additionalInfo: '' },
//   {id: 1, name: 'Занятие 1', date: '10.02.2022', theme: 'В этом модуле вас ждут 10 видеолекций, которые помогут вам начать разговаривать на английском языке как настоящий разработчик.', videoLink: '', additionalInfo: '' },
// ];

export interface LessonPageState {
  tabs?: TabData[]
  selectedTab: number
  lessons?: LessonResponse[]  
}

const initialState: LessonPageState = {
  tabs: [],
  selectedTab: -1, 
  lessons: [],
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

export const lessonPageReducer: Reducer<LessonPageState, LessonPageAction> = 
  ( state = initialState, action ) => {
    switch (action.type) {
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
