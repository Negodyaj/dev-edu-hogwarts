import { Reducer } from 'redux';
import {
  ADD_LINK,
  GET_TASKS_COUNT,
  LOAD_GROUPS,
  NewHomeworkFormAction,
  REMOVE_LINK,
  SELECT_GROUP,
  SET_VALUE_INPUT_LINK,
} from '../../actions/newHomeworkForm.action';
import { RadioData } from '../../components/RadioGroup/RadioButton/RadioButton';

export interface NewHomeworkFormState {
  links: string[];
  inputLinkValue: string;
  group: RadioData[];
  selectGroupId: number;
  selectedGroupTaskCount: number;
}

const initialState: NewHomeworkFormState = {
  links: [],
  inputLinkValue: '',
  group: [],
  selectGroupId: -1,
  selectedGroupTaskCount: 0,
};

export const newHomeworkFormReducer: Reducer<
  NewHomeworkFormState,
  NewHomeworkFormAction
> = (state = initialState, action) => {
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
    case REMOVE_LINK:
      return {
        ...state,
        links: [
          ...state.links.slice(0, action.payload),
          ...state.links.slice(action.payload + 1, state.links.length + 1),
        ],
      };
    case SET_VALUE_INPUT_LINK:
      return {
        ...state,
        inputLinkValue: action.payload,
      };
    default:
      return state;
  }
};
