import { GroupResponse } from './GroupResponse';
import { UserRole } from '../../shared/enums/UserRole';

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  roles: UserRole[];
  patronymic: string;
  username: string;
  registrationDate: string;
  birthDate: string;
  phoneNumber: string;
  exileDate: string;
  gitHubAccount: string;
  city: 1;
  groups: GroupResponse[];
}

export interface UserSimpleResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}
