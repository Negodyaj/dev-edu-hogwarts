import { GroupResponse } from './GroupResponse';
import { UserSimpleResponse } from './UserResponse';

export interface GroupResponseWithUsers extends GroupResponse {
  students: UserSimpleResponse[];
  teachers: UserSimpleResponse[];
  tutors: UserSimpleResponse[];
}
