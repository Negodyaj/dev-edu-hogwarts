import { Reducer } from 'react';
import { CHANGE_DARK_MODE, COLLAPSE_PANEL, MainPanelAction } from '../../actions/mainPanel.actions';

export interface MainPanelState {
  isCollapsed: boolean;
  isDark: boolean;
}

const initialState: MainPanelState = {
  isCollapsed: false,
  isDark: false,
};
export const mainPanelReducer: Reducer<MainPanelState | undefined, MainPanelAction> = (
  state: MainPanelState = initialState,
  action
) => {
  switch (action.type) {
    case COLLAPSE_PANEL: {
      return {
        ...state,
        isCollapsed: action.payload,
      };
    }
    case CHANGE_DARK_MODE: {
      return {
        ...state,
        isDark: action.payload,
      };
    }
    default:
      return state;
  }
};
