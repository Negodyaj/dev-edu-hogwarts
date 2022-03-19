import './MainPanel.scss';
import devEduLogo from '../../pages/images/devEduLogo.svg';
import devEduTitle from '../../pages/images/devEduTitle.svg';
import { Avatar } from './Avatar/Avatar';
import { Navigation } from './Navigation/Navigation';
import avatarPhoto from '../images/avatar.png';
import { Exit } from './Exit/Exit';

import { Toggle } from './Toggle/Toggle';
import React, { useState, useEffect } from 'react';
import { SvgLogo } from '../SvgIcon/SvgFiles/logo';
import { SvgLogoName } from '../SvgIcon/SvgFiles/logoName';
import { SvgLeftChevron } from '../SvgIcon/SvgFiles/leftChevron';
let avData = {
  photo: avatarPhoto,
  name: 'Антон Ефременков',
  role: 'студент'
};

export const MainPanel = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const handleClick = () => {
    setIsToggled((s) => !s);
  }
  
  return (
    <aside className={`main-panel ${ isCollapsed ? 'collapsed': '' }`}>
      <button className='collapse-button' onClick={()=>setIsCollapsed(!isCollapsed)}>
        <div className='left-part'>
          <SvgLeftChevron/>
        </div>
        <div className='right-part'/>
      </button>

      <div className='logo-container'>
        <SvgLogo/>
        <SvgLogoName/>
      </div>
      <div className='avatar-block'>
        <Avatar data={avData} />
      </div>
      <Navigation/>
      <Exit></Exit>
      <Toggle isToggled={isToggled} onClick={handleClick}></Toggle>
    
    </aside>
  )
}