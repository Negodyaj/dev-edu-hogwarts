import { GroupStatus } from '../enums/GroupStatus';
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
      return '';
    default:
      return '';
  }
};

export const getUserRoleLocalNameForString = (roleString: any) => {
  const typedString: keyof typeof UserRole = roleString;
  const roleEnum = UserRole[typedString];
  return getUserRoleLocalName(roleEnum);
};

export const getGroupStatusLocalName = (status: GroupStatus) => {
  switch (status) {
    case GroupStatus.Forming:
      return 'Формируется';
    case GroupStatus.ReadyToStudy:
      return 'Готова к обучению';
    case GroupStatus.InProgress:
      return 'В процессе обучения';
    case GroupStatus.Completed:
      return 'Обучение завершено';
    default:
      return '';
  }
};

export const getGroupStatusLocalNameReverse = (status: string) => {
  switch (status) {
    case 'Формируется':
      return 'Forming';
    case 'Готова к обучению':
      return 'ReadyToStudy';
    case 'В процессе обучения':
      return 'InProgress';
    case 'Обучение завершено':
      return 'Completed';
    default:
      return '';
  }
};
