import { UserRole } from '../enums/UserRole';

export const getUserRoleLocalName = (role: UserRole) => {
  switch (role) {
    case UserRole.Admin:
      return 'Администратор';
    case UserRole.Manager:
      return 'Менеджер';
    case UserRole.Methodist:
      return 'Методист';
    case UserRole.Student:
      return 'Студент';
    case UserRole.Teacher:
      return 'Преподаватель';
    case UserRole.Tutor:
      return 'Тьютор';
    case UserRole.DefaultRole:
      return 'Не выбрано';
    default:
      return 'Не выбрано';
  }
};
