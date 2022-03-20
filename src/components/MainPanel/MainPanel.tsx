import './MainPanel.scss';
import { Avatar } from './Avatar/Avatar';
import { Navigation } from './Navigation/Navigation';
import avatarPhoto from '../images/avatar.png';
import { Exit } from './Exit/Exit';

import { Toggle } from './Toggle/Toggle';
import React, { useState } from 'react';
import { SvgLogo } from '../SvgIcon/SvgFiles/SvgLogo';
import { SvgLogoName } from '../SvgIcon/SvgFiles/SvgLogoName';
import { CollapseButton } from './CollapsButton/CollapsButton'
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
      <CollapseButton onClick={()=>setIsCollapsed(!isCollapsed)}/>
      <div className='top-part'>
        <div className={`${ isCollapsed ? 'collapsed': '' } logo-container flex-center`}>
          <SvgLogo/>
          <SvgLogoName/>
        </div>
        <div className={`avatar-block ${ isCollapsed ? 'collapsed': '' }`}>
          <Avatar data={avData} />
        </div>
      </div>
      <Navigation/>
      <div className={`bottom-part ${ isCollapsed ? 'collapsed': '' }`}>
        <Exit/>
        <Toggle isToggled={isToggled} onClick={handleClick}></Toggle>
      </div>
    
    </aside>
  )
}