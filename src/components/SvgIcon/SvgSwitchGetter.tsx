import { Icons } from './enumIcons';
import { SvgNotifications } from "./SvgFiles/SvgNotifications";
import { SvgLessons } from "./SvgFiles/SvgLessons";
import { SvgHomeWorks } from "./SvgFiles/SvgHomeworks";
import { SvgSettings } from "./SvgFiles/SvgSettings";
import { SvgBarrel } from "./SvgFiles/barrel"; 
import { SvgCake } from "./SvgFiles/cake"; 
import { SvgCalendar } from "./SvgFiles/calendar"; 
import { SvgChevron } from "./SvgFiles/chevron"; 
import { SvgComputer } from "./SvgFiles/computer"; 
import { SvgCookie } from "./SvgFiles/cookie";

 export type Props ={
   icon: Icons;
 }
export const SvgSwitchGetter =(props: Icons)=>{
  switch (props) {
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
    case Icons.Notifications:
      return <SvgNotifications/>;
    case Icons.Lessons:
      return <SvgLessons/>;
    case Icons.Homeworks:
      return <SvgHomeWorks/>;
    case Icons.Settings:
      return <SvgSettings/>;
    default:
      return;
  }
}