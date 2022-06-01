import { GroupResponse } from './GroupResponse';
import { UserResponseShort } from './UserResponseShort';

export interface GroupResponseWithUsers extends GroupResponse {
  students: UserResponseShort[];
  teachers: UserResponseShort[];
  tutors: UserResponseShort[];
}
