import { GroupResponse } from './GroupResponse';
import { UserRole } from '../../shared/enums/UserRole';

export interface UserSimpleResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}

export interface UserInfoShortOutputModel extends UserSimpleResponse {
  phoneNumber?: string;
}

export interface UserResponse extends UserInfoShortOutputModel {
  roles: UserRole[];
  patronymic: string;
  username: string;
  registrationDate: string;
  birthDate: string;
  exileDate: string;
  gitHubAccount: string;
  city: 1;
  groups: GroupResponse[];
}

export interface UserSimpleResponseWithRoles extends UserSimpleResponse {
  roles: UserRole[];
}
