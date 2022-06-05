import { Reducer } from 'react';
import {
  DELETE_FAIL,
  DELETE_START,
  DELETE_SUCCESS,
  GET_HOMEWORK_TO_DELETE,
  GET_TASK_TO_DELETE,
  GET_USER_TO_DELETE,
  ModalWindowActions,
  SET_WINDOW_STATE,
  SET_WINDOW_TYPE,
} from '../../actions/modalWindow.actions';

import { ModalType } from '../../shared/enums/modalType';
import { Homework, Task } from '../../models/responses/HomeworksResponse';

export interface ModalWindowState {
  isModalOpen: boolean;
  modalType: ModalType;
  idUserToDelete?: number;
  homeworkToDelete?: Homework;
  taskToDelete?: Task;
  inProcess: boolean;
  errorMessage?: string;
}

export const initialState: ModalWindowState = {
  isModalOpen: false,
  modalType: ModalType.loadModalPhoto,
  idUserToDelete: 0,
  homeworkToDelete: undefined,
  taskToDelete: undefined,
  inProcess: false,
  errorMessage: undefined,
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
        errorMessage: undefined,
      };
    case SET_WINDOW_TYPE: {
      return {
        ...state,
        modalType: action.payload,
      };
    }
    case DELETE_START:
      return {
        ...state,
        inProcess: true,
        errorMessage: undefined,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        inProcess: false,
        errorMessage: undefined,
      };
    case DELETE_FAIL: {
      return {
        ...state,
        errorMessage: action.payload,
        inProcess: false,
      };
    }
    case GET_USER_TO_DELETE: {
      return {
        ...state,
        userToDeleteId: action.payload,
      };
    }
    case GET_HOMEWORK_TO_DELETE: {
      return {
        ...state,
        homeworkToDelete: action.payload,
        taskToDelete: undefined,
      };
    }
    case GET_TASK_TO_DELETE: {
      return {
        ...state,
        homeworkToDelete: undefined,
        taskToDelete: action.payload,
      };
    }
    default:
      return state;
  }
};
