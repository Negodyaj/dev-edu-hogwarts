import { Reducer } from 'redux';
import {
  HomeworksPageAction,
  SELECT_TAB,
  LOAD_TABS,
  EDIT_HOMEWORK_STATUS,
  LOAD_HOMEWORKS_STARTED,
  LOAD_HOMEWORKS_SUCCESS,
  LOAD_HOMEWORKS_FAIL,
  LOAD_DRAFT_HOMEWORKS_SUCCESS,
} from '../../actions/homeworks.actions';
import { TabData } from '../../models/TabData';
import { Icon } from '../../shared/enums/Icon';
import { Homework, Task } from '../../models/responses/HomeworksResponse';

export interface HomeWorkPageState {
  tabs?: TabData[];
  selectedTab: number;
  homeworks?: Homework[];
  isLoading: boolean;
  errorMessage: string;
  draftHomeworks?: Task[];
}

const initialState: HomeWorkPageState = {
  tabs: [],
  selectedTab: -1,
  homeworks: [],
  isLoading: false,
  errorMessage: '',
  draftHomeworks: undefined,
};

export const homeworksPageReducer: Reducer<HomeWorkPageState, HomeworksPageAction> = (
  state = initialState,
  action
) => {
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
    case LOAD_HOMEWORKS_STARTED: {
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    }
    case LOAD_HOMEWORKS_SUCCESS: {
      return {
        ...state,
        homeworks: action.payload,
        isLoading: false,
      };
    }
    case LOAD_DRAFT_HOMEWORKS_SUCCESS: {
      return {
        ...state,
        draftHomeworks: action.payload,
        isLoading: false,
      };
    }
    case LOAD_HOMEWORKS_FAIL: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    }
    case EDIT_HOMEWORK_STATUS: {
      return {
        ...state,
        homeworks: state.homeworks?.map((item) => {
          if (item.id === action.payload.homework.id) item.status = action.payload.status;
          return item;
        }),
      };
    }
    default:
      return state;
  }
};
