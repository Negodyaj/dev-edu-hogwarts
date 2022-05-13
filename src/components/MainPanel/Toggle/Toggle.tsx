import React, { useState } from 'react';
import './Toggle.scss';
import { SvgMoon } from '../../SvgIcon/SvgFiles/SvgMoon';
import { SvgSun } from '../../SvgIcon/SvgFiles/SvgSun';

export const Toggle = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const handleClick = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="toggle" onClick={handleClick}>
      <div className={`toggle-container ${isToggled ? 'dark-theme' : ''}`}>
        <SvgMoon />
        <div className="circle" />
        <SvgSun />
      </div>
    </div>
  );
};
