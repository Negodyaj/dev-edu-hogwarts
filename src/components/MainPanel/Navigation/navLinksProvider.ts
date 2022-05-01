import { Icon } from '../../../shared/enums/Icon';
import { UserRole } from '../../../shared/enums/UserRole';
import { homeworksLink } from './constants';

export type NavLink = {
  displayName: string;
  path: string;
  icon?: Icon;
};
const buttons: NavLink[] = [
  {
    icon: Icon.Bell,
    path: '/',
    displayName: 'Уведомления',
  },
  {
    icon: Icon.Calendar,
    path: '/groups',
    displayName: 'Группы',
  },
  {
    icon: Icon.NewGroup,
    path: '/new-group',
    displayName: 'Создать группу',
  },
  {
    icon: Icon.Students,
    path: '/students-list',
    displayName: 'Список студентов',
  },
  {
    icon: Icon.Payment,
    path: '/payment-table',
    displayName: 'Таблица оплат',
  },
  {
    icon: Icon.AllUsers,
    path: '/all-users',
    displayName: 'Все пользователи',
  },
  {
    icon: Icon.Calendar,
    path: '/courses',
    displayName: 'Курсы',
  },
  {
    path: '/edit-courses',
    displayName: 'Редактировать курсы',
  },
  {
    icon: Icon.Lessons,
    path: '/lessons',
    displayName: 'Занятия',
  },
  {
    path: '/new-lesson',
    displayName: 'Добавить занятие',
  },
  {
    icon: Icon.Homeworks,
    path: homeworksLink,
    displayName: 'Домашние задания',
  },
  {
    path: '/new-homework',
    displayName: 'Выдача заданий',
  },
  {
    path: '/check-homework',
    displayName: 'Проверка заданий',
  },
  {
    path: '/general-progress',
    displayName: 'Общая успеваемость',
  },
  {
    icon: Icon.Notepad,
    path: '/journal',
    displayName: 'Журнал',
  },
  {
    icon: Icon.Cake,
    path: '/register',
    displayName: 'Регистрация',
  },
  {
    icon: Icon.Cake,
    path: '/settings',
    displayName: 'Настройки',
  },
];

export const getNavLinksByRole = (role: UserRole) => {
  let linksByRole: string[] = [];
  switch (role) {
    case UserRole.Student:
      linksByRole = ['/', '/lessons', homeworksLink, '/settings'];
      break;
    case UserRole.Methodist:
      linksByRole = [
        '/',
        '/courses',
        '/edit-courses',
        homeworksLink,
        '/new-homework',
        '/journal',
        '/settings',
      ];
      break;
    case UserRole.Teacher:
      linksByRole = [
        '/',
        '/lessons',
        '/new-lesson',
        homeworksLink,
        '/new-homework',
        '/check-homework',
        '/general-progress',
        '/journal',
        '/settings',
      ];
      break;
    case UserRole.Tutor:
      linksByRole = [
        '/',
        '/lessons',
        '/new-lesson',
        homeworksLink,
        '/new-homework',
        '/check-homework',
        '/general-progress',
        '/journal',
        '/settings',
      ];
      break;
    case UserRole.Manager:
      linksByRole = [
        '/',
        '/groups',
        '/new-group',
        '/students-list',
        '/payment-table',
        '/all-users',
        '/settings',
      ];
      break;
    //из макета не ясно, какие ссылки должны быть у админа
    case UserRole.Admin:
      linksByRole = [
        '/',
        '/groups',
        '/new-group',
        '/students-list',
        '/payment-table',
        '/all-users',
        '/settings',
        '/lessons',
        '/new-lesson',
        homeworksLink,
        '/new-homework',
        '/check-homework',
        '/general-progress',
        '/journal',
        '/settings',
      ];
      break;
    default:
      break;
  }

  return buttons.filter((e) => linksByRole.includes(e.path));
};
