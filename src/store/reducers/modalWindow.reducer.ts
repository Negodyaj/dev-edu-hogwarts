import { Reducer } from 'react';
import {
  GET_USER_TO_DELETE,
  ModalWindowActions,
  SET_WINDOW_STATE,
  SET_WINDOW_TYPE,
} from '../../actions/modalWindow.actions';

import { ModalType } from '../../shared/enums/modalType';

export interface ModalWindowState {
  isModalOpen: boolean;
  modalType: ModalType;
  idUserToDelete?: number;
}

export const initialState: ModalWindowState = {
  isModalOpen: false,
  modalType: ModalType.loadModalPhoto,
  idUserToDelete: 0,
};

export const modalWindowReducer: Reducer<ModalWindowState | undefined, ModalWindowActions> = (
  state: ModalWindowState = initialState,
  action
) => {
  switch (action.type) {
    case SET_WINDOW_STATE:
      return {
        ...state,
        isModalOpen: action.payload,
      };
    case SET_WINDOW_TYPE: {
      return {
        ...state,
        modalType: action.payload,
      };
    }
    case GET_USER_TO_DELETE: {
      return {
        ...state,
        userToDeleteId: action.payload,
      };
    }
    default:
      return state;
  }
};
