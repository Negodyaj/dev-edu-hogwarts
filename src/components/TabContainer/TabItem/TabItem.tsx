import React, { useState } from "react"; 
import './TabItem.scss' 
 
import { SvgIcon } from "../../SvgIcon/SvgIcon"; 
import { Icon } from "../../../shared/enums/Icon"; 
   
export type tabProps = { 
  data: TabData; 
  activeTab: number; 
  onClick: (id: number) => void; 
} 
     
export type TabData = { 
  id: number; 
  text: string; 
  icon: Icon; 
} 
 
export const TabItem = (props: tabProps) => { 
 
  return ( 
    <> 
      <div className={`tab-item ${ props.data.id === props.activeTab ? 'active-tab': '' }`} onClick={() => props.onClick(props.data.id)}> 
        <SvgIcon icon={props.data.icon}/>
        <div>{props.data.text}</div> 
      </div> 
    </> 
  ) 
};
