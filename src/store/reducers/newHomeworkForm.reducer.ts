import {Reducer} from "redux";
import {ADD_LINK, NewHomeworkFormAction, REMOVE_LINK, SET_VALUE_INPUT_LINK} from "../../actions/newHomeworkForm.action";

export interface NewHomeworkFormState {
  links: string[]
  inputLinkValue: string
  group: string[]
}

const initialState : NewHomeworkFormState = {
  links: [],
  inputLinkValue: '',
  group: [],
}

export const newHomeworkFormReducer : Reducer<NewHomeworkFormState, NewHomeworkFormAction> =
  (state = initialState, action) => {
    switch (action.type) {
      case ADD_LINK:
        return {
          ...state,
          links: [...state.links, action.payload],
          inputLinkValue: ''
        }
      case REMOVE_LINK:
        return {
          ...state,
          links: [...state.links.slice(0, action.payload), ...state.links.slice(action.payload+1, state.links.length+1),],
        }
      case SET_VALUE_INPUT_LINK:
        return {
          ...state,
          inputLinkValue: action.payload,
        }
      default:
        return state;
    }
  }