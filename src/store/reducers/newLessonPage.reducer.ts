import { Reducer } from 'react';
import {
  LOAD_GROUPS_FAIL,
  LOAD_GROUPS_STARTED,
  LOAD_GROUPS_SUCSSES,
  NewLessonPageAction,
} from '../../actions/newLessonPage.action';
import { RadioData } from '../../components/RadioGroup/RadioButton/RadioButton';

export interface NewLessonPageState {
  groups?: RadioData[];
  message?: string;
}

const initialState: NewLessonPageState = {
  groups: [],
  message: undefined,
};

export const NewLessonPageReducer: Reducer<NewLessonPageState | undefined, NewLessonPageAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_GROUPS_STARTED:
      return {
        ...state,
      };
    case LOAD_GROUPS_SUCSSES: {
      const groups: RadioData[] = action.payload.map((group) => {
        const radioData: RadioData = {
          value: group.id,
          text: group.course.name,
        };
        return radioData;
      });
      return {
        ...state,
        groups: groups,
      };
    }
    case LOAD_GROUPS_FAIL:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
