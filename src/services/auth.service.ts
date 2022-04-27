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

const parseToken = (token: string) => {
  if (!token) {
    return;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

export const getIdFromToken = (token: string) => {
  const tokenPayload = parseToken(token);
  return tokenPayload.nameid;
};

export const removeToken = () => {
  removeFromStorage('token');
};
