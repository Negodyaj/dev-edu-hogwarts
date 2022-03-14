import './TabItem.scss'
import React, { useState } from "react";

import SvgBarrel from './icons/iconsInTsx/barrel';
import SvgCake from './icons/iconsInTsx/cake';
import SvgCalendar from './icons/iconsInTsx/calendar';
import SvgChevron from './icons/iconsInTsx/chevron';
import SvgComputer from './icons/iconsInTsx/computer';
import SvgCookie from './icons/iconsInTsx/cookie';
import { Icons } from './enumIcons';
  
export type tabProps = {
  data: TabData;
}
    
export type TabData = {
  id: number;
  text: string;
  icon: Icons;
}

const GetIcon = (props: tabProps) => {
  switch (props.data.icon) {
    case Icons.Barrel:
      return <SvgBarrel/>;
    case Icons.Cake:
      return <SvgCake/>;
    case Icons.Calendar:
      return <SvgCalendar/>;
    case Icons.Chevron:
      return <SvgChevron/>;
    case Icons.Computer:
      return <SvgComputer/>;
    case Icons.Cookie:
      return <SvgCookie/>;
    default:
      return;
  }
}

const tabContainer = document.querySelector('tab-container');

export const TabItem = (props: tabProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  // tabContainer?.children[selectedTabIndex].classList.Add('active');

  const EventHandler = (event: React.MouseEvent<HTMLElement>) => { 
    if (selectedTabIndex !== (event.target as any).index) {
      (event.target as any).classList.Add('active');
      tabContainer?.children[selectedTabIndex].classList.remove('active');
      setSelectedTabIndex((event.target as any).index);
    } 
  }

  return (
    <>
      <div className="tab-item" onClick = {EventHandler}>
        {GetIcon(props)}
        <div>{props.data.text}</div>
      </div>
    </>
  )
  };
