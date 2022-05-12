import { Icon } from '../../../shared/enums/Icon';
import { UserRole } from '../../../shared/enums/UserRole';
import { homeworksLink } from './constants';

export type NavLink = {
  displayName: string;
  path: string;
  icon: Icon;
  isHidden: boolean;
};
const buttons: NavLink[] = [
  {
    icon: Icon.Bell,
    path: '/',
    displayName: 'Уведомления',
    isHidden: false,
  },
  {
    icon: Icon.Calendar,
    path: '/groups',
    displayName: 'Группы',
    isHidden: false,
  },
  {
    icon: Icon.NewGroup,
    path: '/new-group',
    displayName: 'Создать группу',
    isHidden: false,
  },
  {
    icon: Icon.Students,
    path: '/students-list',
    displayName: 'Список студентов',
    isHidden: false,
  },
  {
    icon: Icon.Payment,
    path: '/payment-table',
    displayName: 'Таблица оплат',
    isHidden: false,
  },
  {
    icon: Icon.AllUsers,
    path: '/all-users',
    displayName: 'Все пользователи',
    isHidden: false,
  },
  {
    icon: Icon.Calendar,
    path: '/courses',
    displayName: 'Курсы',
    isHidden: false,
  },
  {
    icon: Icon.Calendar,
    path: '/edit-courses',
    displayName: 'Редактировать курсы',
    isHidden: true,
  },
  {
    icon: Icon.Lessons,
    path: '/lessons',
    displayName: 'Занятия',
    isHidden: false,
  },
  {
    icon: Icon.AddNewHomework,
    path: '/new-lesson',
    displayName: 'Добавить занятие',
    isHidden: true,
  },
  {
    icon: Icon.Homeworks,
    path: homeworksLink,
    displayName: 'Домашние задания',
    isHidden: false,
  },
  {
    icon: Icon.AddNewLesson,
    path: '/new-homework',
    displayName: 'Выдача заданий',
    isHidden: true,
  },
  {
    icon: Icon.CheckHomeworks,
    path: '/check-homework',
    displayName: 'Проверка заданий',
    isHidden: true,
  },
  {
    icon: Icon.GeneralProgress,
    path: '/general-progress',
    displayName: 'Общая успеваемость',
    isHidden: true,
  },
  {
    icon: Icon.Notepad,
    path: '/journal',
    displayName: 'Журнал',
    isHidden: false,
  },
  {
    icon: Icon.Pencil,
    path: '/register',
    displayName: 'Регистрация',
    isHidden: false,
  },
  {
    icon: Icon.Settings,
    path: '/settings',
    displayName: 'Настройки',
    isHidden: false,
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
