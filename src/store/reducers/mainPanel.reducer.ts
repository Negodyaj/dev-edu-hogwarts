import { Reducer } from 'react';
import {
  COLLAPSE_PANEL,
  MainPanelAction,
} from '../../actions/mainPanel.actions';

export interface MainPanelState {
  isCollapsed: boolean;
}

const initialState: MainPanelState = {
  isCollapsed: false,
};
export const mainPanelReducer: Reducer<
  MainPanelState | undefined,
  MainPanelAction
> = (state: MainPanelState = initialState, action) => {
  switch (action.type) {
    case COLLAPSE_PANEL: {
      return {
        isCollapsed: action.payload,
      };
    }
    default:
      return state;
  }
};
