import { UserRole } from '../enums/UserRole';

export const userRoleForEnum = (role: string) => {
  switch (role) {
    case 'Admin':
      return UserRole.Admin;
    case 'Manager':
      return UserRole.Manager;
    case 'Methodist':
      return UserRole.Methodist;
    case 'Student':
      return UserRole.Student;
    case 'Teacher':
      return UserRole.Teacher;
    case 'Tutor':
      return UserRole.Tutor;
    default:
      return 0;
  }
};
