import './Navigation.scss';
import { ButtonNavigation } from '../ButtonNavigation/ButtonNavigation';
import { Icon } from '../../../shared/enums/Icon';

export type NavLink = {
  displayName: string;
  path: string;
  icon: Icon;
};

const buttons: NavLink[] = [
  {
    icon: Icon.Bell,
    path: '/',
    displayName: 'Уведомления',
  },
  {
    icon: Icon.Lessons,
    path: '/lessons',
    displayName: 'Занятия',
  },
  {
    icon: Icon.Homeworks,
    path: '/homeworks',
    displayName: 'Домашние задания',
  },
  {
    icon: Icon.Cake,
    path: '/settings',
    displayName: 'Настройки',
  },
  {
    icon: Icon.Calendar,
    path: '/courses',
    displayName: 'Курсы',
  },
  {
    icon: Icon.Lessons,
    path: '/edit-courses',
    displayName: 'Редактировать курсы',
  },
  {
    icon: Icon.Cake,
    path: '/register',
    displayName: 'Регистрация',
  },
  {
    icon: Icon.Pencil,
    path: '/login',
    displayName: 'Логин',
  },
];

export const Navigation = () => {
  return (
    <nav className="main-nav-panel">
      {buttons.map((item) => (
        <ButtonNavigation data={item} key={item.path} />
      ))}
    </nav>
  );
};
