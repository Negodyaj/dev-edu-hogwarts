import './MainPanel.scss';
import devEduLogo from '../../pages/images/devEduLogo.svg';
import devEduTitle from '../../pages/images/devEduTitle.svg';
import { Avatar } from './Avatar/Avatar';
import { Navigation } from './Navigation/Navigation';
import avatarPhoto from '../../pages/images/studentPhoto.png'
import { Toggle } from './Toggle/Toggle';
import React, { useState, useEffect } from 'react';
let avData = {
  photo: avatarPhoto,
  name: 'Антон Ефременков',
  role: 'студент'
};

export const MainPanel = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const handleClick = () => {
    setIsToggled((s) => !s);
  }
  return (
    <aside className="main-panel">
      <div className='logo-container'>
        <img src={devEduLogo} className="logo" alt="logo" />
        <img src={devEduTitle} alt="DevEducation" />
      </div>
      <div className='avatar-block'>
        <Avatar data={avData} />
      </div>
      <Navigation></Navigation>
      <Toggle isToggled={isToggled} onClick={handleClick}></Toggle>
    </aside>
  )
}