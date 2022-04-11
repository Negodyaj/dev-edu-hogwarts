import { Reducer } from 'redux';
import { LessonPageAction, LOAD_LESSONS, SELECT_TAB, LOAD_TABS } from '../../actions/lessons.actions';
import { LessonResponse } from '../../models/responses/LessonResponse';
import { UserResponse } from '../../models/responses/UserResponse';
import { TabData } from '../../models/TabData';
import { LessonModel } from '../../pages/LessonsPage/components/Lesson';
import { Icon } from '../../shared/enums/Icon';

const tabsMock = [
  {
    id: 1,
    text: "Tab 1",
    icon: Icon.Cake
  }, {
    id: 2,
    text: "Tab 2",
    icon: Icon.Cookie
  }, {
    id: 3,
    text: "Tab Comp",
    icon: Icon.Computer
  }
];
const lessonsMock: LessonModel[] = [
  {id: 3, name: 'Занятие 3', date: '10.03.2022', theme: 'Познакомитесь с основами C++ и научитесь создавать простейшие консольные программы.', videoLink: 'https://disk.yandex.com/d/9WeaF1Yua7D1IA', additionalInfo: 'Плагин Figma, позволяет создавать красивые тени, просто перетаскивая «источник света»' },
  {id: 2, name: 'Занятие 2', date: '14.02.2022', theme: 'Научитесь проектировать быстрые алгоритмы, применять стандартные структуры данных, а главное — мыслить как программист. Знание алгоритмов может повысить ваши шансы на трудоустройство, так как в большинстве компаний задачи на алгоритмы — неотъемлемая часть собеседования и тестового задания.', videoLink: '', additionalInfo: '' },
  {id: 1, name: 'Занятие 1', date: '10.02.2022', theme: 'В этом модуле вас ждут 10 видеолекций, которые помогут вам начать разговаривать на английском языке как настоящий разработчик.', videoLink: '', additionalInfo: '' },
];


export interface LessonPageState {
  tabs: TabData[]
  selectedTab: number
  // lessons?: LessonResponse[] заменить!!
  lessons: LessonModel[]
  
}

const initialState: LessonPageState = {
  tabs: [],
  selectedTab: 1,
  lessons: [],
};

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
        return {
          ...state,
          tabs: tabsMock
        }
      }
      case LOAD_LESSONS: {
        return {
          ...state,
          lessons: lessonsMock 
        }
      }
      default:
        return state;
    }
  };
