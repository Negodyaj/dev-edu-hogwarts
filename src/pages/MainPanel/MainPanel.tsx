import  '../MainPanel/MainPanel.scss';
import devEduLogo from '../../pages/images/devEduLogo.svg';
import devEduTitle from '../../pages/images/devEduTitle.svg';
import { Avatar} from './Avatar/Avatar';
import { Navigation } from './Navigation/Navigation';
import avatarPhoto from '../../pages/images/studentPhoto.png'
import {Toggle} from './Toggle/Toggle';
import React, { useState, useEffect } from 'react';
let avData =   {
    AvatarPhoto: avatarPhoto,
    AvatarName: 'Антон Ефременков',
    AvatarRole: 'студент'
  };

export const MainPanel = ()=>{
  const [toggled, setToggled] = React.useState(false);
  const handleClick = ()=>{
    setToggled((s)=>!s);
  }
  return (
    <div className="panel">
      <div className="panel-container">
        <div className='content-container'>
      <img src={devEduLogo} className="logo" alt="logo" />
      <img src={devEduTitle} alt="DevEducation" />
      <div className='avatar-block'>
            <Avatar data={avData}/>
      </div>
      </div>
      </div>
      <Navigation></Navigation>
      <Toggle toggled ={toggled} onclick={handleClick}></Toggle>
    </div>
  )
}