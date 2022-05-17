import { UserRole } from '../../shared/enums/UserRole';

export interface UserResponseShort {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  roles: UserRole[];
}
