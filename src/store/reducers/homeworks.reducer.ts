import { Reducer } from 'redux';
import {
  HomeworkPageAction,
  SELECT_TAB,
  LOAD_TABS,
  LOAD_HOMEWORKS,
  LOAD_HW_ANSWER,
} from '../../actions/homeworks.actions';
import { TabData } from '../../models/TabData';
import { Icon } from '../../shared/enums/Icon';
import {
  Homework,
  StudentHomework,
} from '../../models/responses/HomeworksResponse';

export interface HomeWorkPageState {
  tabs?: TabData[];
  selectedTab: number;
  homeworks?: Homework[];
  answers?: StudentHomework[];
}

const initialState: HomeWorkPageState = {
  tabs: [],
  selectedTab: -1,
  homeworks: [],
  answers: [],
};

export const homeworksPageReducer: Reducer<
  HomeWorkPageState,
  HomeworkPageAction
> = (state = initialState, action) => {
  switch (action.type) {
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
          icon: Icon.Cookie,
        };
        return tabData;
      });
      return {
        ...state,
        tabs: tabs,
        selectedTab: tabs[0]?.id,
        homeworks: [],
      };
    }
    case LOAD_HOMEWORKS: {
      return {
        ...state,
        homeworks: action.payload,
      };
    }
    case LOAD_HW_ANSWER: {
      return {
        ...state,
        answers: action.payload,
      };
    }
    default:
      return state;
  }
};
