import { UserRole } from '../../shared/enums/UserRole';

// не лучше ли перенести это в UserResponse типа как UserSimpleResponseWithRoles?
export interface UserResponseShort {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  roles: UserRole[];
}
