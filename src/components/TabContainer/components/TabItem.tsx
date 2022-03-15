import './TabItem.scss' 
import React, { useState } from "react"; 
 
import { SvgSwitchGetter } from "../../SvgIcon/SvgSwitchGetter"; 
import { Icons } from "../../SvgIcon/enumIcons"; 
   
export type tabProps = { 
  data: TabData; 
  activeTab: number; 
  onClick: (id: number) => void; 
} 
     
export type TabData = { 
  id: number; 
  text: string; 
  icon: Icons; 
} 
 
export const TabItem = (props: tabProps) => { 
 
  return ( 
    <> 
      <div className={`tab-item ${ props.data.id === props.activeTab ? 'active': '' }`} onClick={() => props.onClick(props.data.id)}> 
        {SvgSwitchGetter(props.data.icon)} 
        <div>{props.data.text}</div> 
      </div> 
    </> 
  ) 
  };
