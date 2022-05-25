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
