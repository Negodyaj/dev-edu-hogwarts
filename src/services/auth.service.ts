import { removeFromStorage, store } from './local-storage.service';

// token
export const getToken = (): string =>
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyNjA0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJuYmYiOjE2NDkwOTMxMTIsImV4cCI6MTY0OTE3OTUxMiwiaXNzIjoiTXlBdXRoU2VydmVyIiwiYXVkIjoiTXlBdXRoQ2xpZW50In0.3YQvevitDkLYUwkvu35eEt7Wo_gwZ8mWunUC8ZgeeyE'; //getFromStorage('token');

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
