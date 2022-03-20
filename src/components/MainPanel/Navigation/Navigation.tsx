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
    icon: Icon.Bell,
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
  }
];

export const Navigation = () => {  
  return (
    <nav className='main-nav-pannel'>
      {
        buttons.map(item => <ButtonNavigation data={item} key={item.path}></ButtonNavigation>)
      }
    </nav>
  )
}