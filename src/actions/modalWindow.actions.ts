import { ModalType } from '../shared/enums/modalType';

export const SET_WINDOW_STATE = 'modal/SET_WINDOW_STATE' as const;
export const SET_WINDOW_TYPE = 'modal/SET_WINDOW_TYPE' as const;
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

export type ModalWindowActions =
  | ReturnType<typeof setWindowState>
  | ReturnType<typeof setWindowType>
  | ReturnType<typeof getUserToDelete>;
