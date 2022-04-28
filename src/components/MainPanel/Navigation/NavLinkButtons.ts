import { Icon } from '../../../shared/enums/Icon';
import { UserRoles } from '../../../shared/enums/UserRoles';

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
    path: '/homeworks',
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

export const SelectButtonsByRole = (roles: UserRoles[]) => {
  let filtered: NavLink[] = [];
  let filter: string[] = [];
  const filterSet: string[] = [];

  for (let i = 0; i <= roles.length; i++) {
    switch (roles[i]) {
      case UserRoles.Student:
        filter = ['/', '/lessons', '/homeworks', '/settings'];
        filterSet.push(...filter);
        break;
      case UserRoles.Methodist:
        filter = [
          '/',
          '/courses',
          '/edit-courses',
          '/homeworks',
          '/new-homework',
          '/journal',
          '/settings',
        ];
        filterSet.push(...filter);
        break;
      case UserRoles.Teacher:
        filter = [
          '/',
          '/lessons',
          '/new-lesson',
          '/homeworks',
          '/new-homework',
          '/check-homework',
          '/general-progress',
          '/journal',
          '/settings',
        ];
        filterSet.push(...filter);
        break;
      case UserRoles.Tutor:
        filter = [
          '/',
          '/lessons',
          '/new-lesson',
          '/homeworks',
          '/new-homework',
          '/check-homework',
          '/general-progress',
          '/journal',
          '/settings',
        ];
        filterSet.push(...filter);
        break;
      case UserRoles.Manager:
        filter = [
          '/',
          '/groups',
          '/new-group',
          '/students-list',
          '/payment-table',
          '/all-users',
          '/settings',
        ];
        filterSet.push(...filter);
        break;
      default:
        break;
    }
  }

  filtered = buttons.filter((e) => filterSet.includes(e.path));
  console.log(filtered);
  return filtered;
};
