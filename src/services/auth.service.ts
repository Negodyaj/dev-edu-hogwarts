import {
  getFromStorage,
  removeFromStorage,
  store,
} from './local-storage.service';

// token
export const getToken = (): string => getFromStorage('token');

export const setToken = (token: string) => {
  store('token', token);
};

export const removeToken = () => {
  removeFromStorage('token');
};