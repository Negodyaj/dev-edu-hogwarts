import './TabItem.scss'

import SvgBarrel from './icons/iconsInTsx/barrel';
import SvgCake from './icons/iconsInTsx/cake';
import SvgCalendar from './icons/iconsInTsx/calendar';
import SvgChevron from './icons/iconsInTsx/chevron';
import SvgComputer from './icons/iconsInTsx/computer';
import SvgCookie from './icons/iconsInTsx/cookie';
import { Icons } from './enumIcons';

// export type TabData = {
  //   id: number;
  //   text: string;
  //   icon: number;
  // }

// export const TabItem = (props: tabProps) => {
  
  //   return (
    //     <>
    //       <div className="tab-item">
    //         <SvgBarrel/>
    //         <div>{props.data.text}</div>
    //       </div>
    //     </> 
    //   )
    //   };
    
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

export const TabItem = (props: tabProps) => {
  return (
    <>
      <div className="tab-item">
        {GetIcon(props)}
        <div>{props.data.text}</div>
      </div>
    </>
  )
  };
