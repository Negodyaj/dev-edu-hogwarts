import { Reducer } from 'redux';
import {
  ADD_LINK,
  GET_TASK,
  GET_TASKS_COUNT,
  LOAD_GROUPS,
  NewHomeworkFormAction,
  POST_HOMEWORK_FAIL,
  POST_HOMEWORK_STARTED,
  POST_HOMEWORK_SUCCESS,
  REMOVE_LINK,
  REMOVE_LINKS,
  SELECT_GROUP,
  SET_VALUE_INPUT_LINK,
} from '../../actions/newHomeworkForm.action';
import { RadioData } from '../../components/RadioGroup/RadioButton/RadioButton';
import { Task } from '../../models/responses/HomeworksResponse';

export interface NewHomeworkFormState {
  links: string[];
  inputLinkValue: string;
  group: RadioData[];
  selectGroupId: number;
  selectedGroupTaskCount: number;
  errorMessage?: string;
  inProcess: boolean;
  task?: Task;
}

const initialState: NewHomeworkFormState = {
  links: [],
  inputLinkValue: '',
  group: [],
  selectGroupId: -1,
  selectedGroupTaskCount: 0,
  errorMessage: undefined,
  inProcess: false,
  task: undefined,
};

export const newHomeworkFormReducer: Reducer<NewHomeworkFormState, NewHomeworkFormAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_GROUPS:
      return {
        ...state,
        group: [...action.payload],
      };
    case ADD_LINK:
      return {
        ...state,
        links: [...state.links, action.payload],
        inputLinkValue: '',
      };
    case SELECT_GROUP:
      return {
        ...state,
        selectGroupId: action.payload,
      };
    case GET_TASKS_COUNT:
      return {
        ...state,
        selectedGroupTaskCount: action.payload,
      };
    case GET_TASK:
      return {
        ...state,
        task: action.payload,
      };
    case REMOVE_LINK:
      return {
        ...state,
        links: [
          ...state.links.slice(0, action.payload),
          ...state.links.slice(action.payload + 1, state.links.length + 1),
        ],
      };
    case REMOVE_LINKS:
      return {
        ...state,
        links: [],
      };
    case SET_VALUE_INPUT_LINK:
      return {
        ...state,
        inputLinkValue: action.payload,
      };
    case POST_HOMEWORK_FAIL:
      return {
        ...state,
        errorMessage: action.payload,
        inProcess: false,
      };
    case POST_HOMEWORK_SUCCESS:
      return {
        ...state,
        errorMessage: undefined,
        inProcess: false,
      };
    case POST_HOMEWORK_STARTED:
      return {
        ...state,
        errorMessage: undefined,
        inProcess: true,
      };
    default:
      return state;
  }
};
