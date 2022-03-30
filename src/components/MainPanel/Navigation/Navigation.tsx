import './Navigation.scss';
import { ButtonNavigation } from "../ButtonNavigation/ButtonNavigation";
import { useState } from "react";
import { Icon } from "../../../shared/enums/Icon";

export type NavLink = {
  displayName: string
  path: string
  icon: Icon
}

let buttons: NavLink[] = [
  {
    icon: Icon.Notifications,
    path: '/',
    displayName: 'Уведомления'
  },
  {
    icon: Icon.Lessons,
    path: '/lessons',
    displayName: 'Занятия'
  },
  {
    icon: Icon.Homeworks,
    path: '/homeworks',
    displayName: 'Домашние задания'
  },
  {
    icon: Icon.Cake,
    path: '/settings',
    displayName: 'Настройки'
  },
  {
    icon: Icon.Calendar,
    path: '/courses',
    displayName: 'Курсы'
  },
  {
    icon: Icon.Lessons,
    path: '/edit-courses',
    displayName: 'Редактировать курсы'
  }
];

export const Navigation = () => {  
  return (
    <nav>
      {
        buttons.map(item => <ButtonNavigation data={item} key={item.path}></ButtonNavigation>)
      }
    </nav>
  )
}