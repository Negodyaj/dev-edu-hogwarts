import { GroupResponse } from './GroupResponse';
import { UserResponseShort } from './UserResponseShort';

export interface GroupResponseById {
  group: GroupResponse,
  students: UserResponseShort[],
  teachers: UserResponseShort[],
  tutors: UserResponseShort[],
}