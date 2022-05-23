import wretch from 'wretch';
import { baseUrl } from '../shared/consts';
import { getToken } from './auth.service';

export type Errors = {
  Code: number;
  Message: string;
  Description: string;
};

export const baseWretch = () =>
  wretch()
    .url(`${baseUrl}/`)
    .auth(`Bearer ${getToken()}`)
    .catcher(401, (error) => console.log(error.response))
    .catcher(403, (error) => {
      throw new Error((JSON.parse(error.message) as Errors).Message);
    })
    .catcher(404, (error) => console.log(error))
    .catcher(409, (error) => console.log(error.response))
    .catcher(422, (error) => console.log(error.response));
