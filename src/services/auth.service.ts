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

export const getIdFromToken =(token:string)=>{
 let tokenPayload = parseToken(token);
 return tokenPayload['nameid'];
}

const parseToken=(token:string)=> {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export const removeToken = () => {
  removeFromStorage('token');
};