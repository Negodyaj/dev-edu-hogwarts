import { GroupResponse } from './GroupResponse';
import { UserSimpleResponseWithRoles } from './UserResponse';

export interface GroupResponseWithUsers extends GroupResponse {
  students: UserSimpleResponseWithRoles[];
  teachers: UserSimpleResponseWithRoles[];
  tutors: UserSimpleResponseWithRoles[];
}
