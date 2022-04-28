import { Reducer } from 'redux';
import {
  HomeworkPageAction,
  SELECT_TAB,
  LOAD_TABS,
  LOAD_HOMEWORKS,
} from '../../actions/homeworks.actions';
import { TabData } from '../../models/TabData';
import { Icon } from '../../shared/enums/Icon';
import { Homework } from '../../models/responses/HomeworksResponse';

export interface HomeWorkPageState {
  tabs?: TabData[];
  selectedTab: number;
  homeworks?: Homework[];
}

const initialState: HomeWorkPageState = {
  tabs: [],
  selectedTab: -1,
  homeworks: [],
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
    default:
      return state;
  }
};
