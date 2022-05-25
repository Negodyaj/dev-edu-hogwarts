import { Reducer } from 'redux';
import {
  HomeworksPageAction,
  SELECT_TAB,
  LOAD_TABS,
  EDIT_HOMEWORK_STATUS,
  LOAD_HOMEWORKS_STARTED,
  LOAD_HOMEWORKS_SUCCESS,
  LOAD_HOMEWORKS_FAIL,
  LOAD_TASKS_STARTED,
  LOAD_TASKS_SUCCESS,
  LOAD_TASKS_FAILED,
  LOAD_BYCOURSE,
} from '../../actions/homeworks.actions';
import { TabData } from '../../models/TabData';
import { Icon } from '../../shared/enums/Icon';
import { Homework, Task } from '../../models/responses/HomeworksResponse';
import { CourseResponse } from '../../models/responses/CourseResponse';

export interface HomeWorkPageState {
  tabs?: TabData[];
  selectedTab: number;
  homeworks?: Homework[];
  tasks?: Task[];
  isLoading: boolean;
  errorMessage: string;
  courses: CourseResponse[];
}

const initialState: HomeWorkPageState = {
  tabs: [],
  selectedTab: -1,
  homeworks: [],
  courses: [],
  tasks: [],
  isLoading: false,
  errorMessage: '',
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
    case LOAD_BYCOURSE: {
      const tabs: TabData[] = action.payload.map((course) => {
        const tabData: TabData = {
          id: course.id,
          text: course.name,
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
    case LOAD_HOMEWORKS_FAIL: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    }
    case LOAD_TASKS_STARTED: {
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    }
    case LOAD_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: [...action.payload],
        isLoading: false,
      };
    }
    case LOAD_TASKS_FAILED: {
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
