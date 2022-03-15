import { Route, Link, Routes } from "react-router-dom";
import './Navigation.scss';
import { ButtonNavigation } from "../ButtonNavigation/ButtonNavigation";
import { Icons } from "../../SvgIcon/enumIcons";
import { useState } from "react";
let buttons = [
  {
    buttonImage: Icons.Notifications,
    buttonName: 'Уведомления',
    buttonLink: 0
  },
  {
    buttonImage: Icons.Lessons,
    buttonName: 'Занятия',
    buttonLink: 1

  },
  {
    buttonImage: Icons.Homeworks,
    buttonName: 'Домашние задания',
    buttonLink: 2
  },
  {
    buttonImage: Icons.Cake,
    buttonName: 'Настройки',
    buttonLink: 3
  }
]

export const Navigation = () => {
  const [activeButton, setActiveButton] = useState<number>(0);
  function handleClick(buttonLink: number) {
    setActiveButton(buttonLink);
  }
  
  return (
    <nav>
      {
        buttons.map(item => <ButtonNavigation data={item} key={item.buttonLink} activeButton={activeButton} onClick={handleClick}></ButtonNavigation>)
      }
    </nav>
  )
}