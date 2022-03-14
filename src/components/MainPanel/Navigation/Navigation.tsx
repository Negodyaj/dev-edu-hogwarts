import { Route, Link, Routes } from "react-router-dom";
import './Navigation.scss';
import { ButtonNavigation } from "../ButtonNavigation/ButtonNavigation";
import iconNotification from "../../images/Bell_Notification.svg";
import iconLessons from "../../images/Folder_Code.svg";
import hw from "../../images/Calendar_Days.svg";
import settings from "../../images/Settings.svg";
let buttons = [
  {
    buttonImage: iconNotification,
    buttonName: 'Уведомления',
    buttonLink: 0
  },
  {
    buttonImage: iconLessons,
    buttonName: 'Занятия',
    buttonLink: 1

  },
  {
    buttonImage: hw,
    buttonName: 'Домашние задания',
    buttonLink: 2
  },
  {
    buttonImage: settings,
    buttonName: 'Настройки',
    buttonLink: 3
  }
]
export const Navigation = () => {

  return (
    <nav>
      {
        buttons.map(item => <ButtonNavigation data={item}></ButtonNavigation>)
      }
    </nav>
  )
}