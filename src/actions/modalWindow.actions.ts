import { ModalType } from '../shared/enums/modalType';
import { Homework, Task } from '../models/responses/HomeworksResponse';

export const DELETE_START = 'modal/DELETE_START' as const;
export const DELETE_SUCCESS = 'modal/DELETE_SUCCESS' as const;
export const DELETE_FAIL = 'modal/DELETE_FAIL' as const;
export const SET_WINDOW_STATE = 'modal/SET_WINDOW_STATE' as const;
export const SET_WINDOW_TYPE = 'modal/SET_WINDOW_TYPE' as const;
export const GET_TASK_TO_DELETE = 'modal/GET_TASK_TO_DELETE' as const;
export const GET_HOMEWORK_TO_DELETE = 'modal/GET_HOMEWORK_TO_DELETE' as const;
export const GET_USER_TO_DELETE = 'modal/GET_USER_TO_DELETE' as const;

export const setWindowState = (isOpen: boolean) => ({
  type: SET_WINDOW_STATE,
  payload: isOpen,
});

export const setWindowType = (modalType: ModalType) => ({
  type: SET_WINDOW_TYPE,
  payload: modalType,
});

export const getUserToDelete = (id: number) => ({
  // не реализовано так как пока нет страциы для удаления пользователя
  type: GET_USER_TO_DELETE,
  payload: id,
});

export const getTaskToDelete = (task?: Task) => ({
  type: GET_TASK_TO_DELETE,
  payload: task,
});

export const getHomeworkToDelete = (homework?: Homework) => ({
  type: GET_HOMEWORK_TO_DELETE,
  payload: homework,
});

export const deleteStart = () => ({
  type: DELETE_START,
});

export const deleteSuccess = () => ({
  type: DELETE_SUCCESS,
});

export const deleteFail = (message?: string) => ({
  type: DELETE_FAIL,
  payload: message,
});

export type ModalWindowActions =
  | ReturnType<typeof setWindowState>
  | ReturnType<typeof setWindowType>
  | ReturnType<typeof getUserToDelete>
  | ReturnType<typeof getTaskToDelete>
  | ReturnType<typeof getHomeworkToDelete>
  | ReturnType<typeof deleteStart>
  | ReturnType<typeof deleteSuccess>
  | ReturnType<typeof deleteFail>;
