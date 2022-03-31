import wretch from 'wretch';
import { baseUrl } from '../shared/consts';
import { getToken } from './auth.service';

export const baseWretch = () =>
  wretch()
    .url(`${baseUrl}/`)
    .auth(`Bearer ${getToken()}`)
    .catcher(401, (error) => console.log(error.response))
    .catcher(403, (error) => console.log(error.response))
    .catcher(404, (error) => console.log(error))
    .catcher(409, (error) => console.log(error.response))
    .catcher(422, (error) => console.log(error.response));