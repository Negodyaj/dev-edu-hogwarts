import { Icon } from '../../../shared/enums/Icon';
import { UserRole } from '../../../shared/enums/UserRole';
import { homeworksLink } from './constants';

export type NavLink = {
  displayName: string;
  path: string;
  icon: Icon;
  isSubbutton: boolean;
  customCssClass?: string;
};
const buttons: NavLink[] = [
  {
    icon: Icon.Bell,
    path: '/',
    displayName: 'Уведомления',
    isSubbutton: false,
  },
  {
    icon: Icon.Calendar,
    path: '/groups',
    displayName: 'Группы',
    isSubbutton: false,
  },
  {
    icon: Icon.NewGroup,
    path: '/new-group',
    displayName: 'Создать группу',
    isSubbutton: false,
  },
  {
    icon: Icon.Students,
    path: '/students-list',
    displayName: 'Список студентов',
    isSubbutton: false,
  },
  {
    icon: Icon.Payment,
    path: '/payment-table',
    displayName: 'Таблица оплат',
    isSubbutton: false,
  },
  {
    icon: Icon.AllUsers,
    path: '/all-users',
    displayName: 'Все пользователи',
    isSubbutton: false,
  },
  {
    icon: Icon.Calendar,
    path: '/courses',
    displayName: 'Курсы',
    isSubbutton: false,
  },
  {
    icon: Icon.Calendar,
    path: '/edit-courses',
    displayName: 'Редактировать курсы',
    isSubbutton: true,
  },
  {
    icon: Icon.Lessons,
    path: '/lessons',
    displayName: 'Занятия',
    isSubbutton: false,
  },
  {
    icon: Icon.AddNewHomework,
    path: '/new-lesson',
    displayName: 'Добавить занятие',
    isSubbutton: true,
  },
  {
    icon: Icon.Homeworks,
    path: homeworksLink,
    displayName: 'Домашние задания',
    isSubbutton: false,
  },
  {
    icon: Icon.AddNewLesson,
    path: '/new-homework',
    displayName: 'Выдача заданий',
    isSubbutton: true,
  },
  {
    icon: Icon.CheckHomeworks,
    path: '/check-homework',
    displayName: 'Проверка заданий',
    isSubbutton: true,
  },
  {
    icon: Icon.GeneralProgress,
    path: '/general-progress',
    displayName: 'Общая успеваемость',
    isSubbutton: true,
  },
  {
    icon: Icon.Notepad,
    path: '/journal',
    displayName: 'Журнал',
    isSubbutton: false,
  },
  {
    icon: Icon.Cake,
    path: '/register',
    displayName: 'Регистрация',
    isSubbutton: false,
  },
  {
    icon: Icon.Cake,
    path: '/settings',
    displayName: 'Настройки',
    isSubbutton: false,
    customCssClass: 'settings-link',
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
