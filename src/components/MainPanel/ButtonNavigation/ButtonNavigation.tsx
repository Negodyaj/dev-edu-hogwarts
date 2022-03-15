import { Link } from "react-router-dom";
import "./ButtonNavigation.scss";
import { SvgNotifications } from "../Navigation/Icons/SvgFiles/SvgNotifications";
import { SvgLessons } from "../Navigation/Icons/SvgFiles/SvgLessons";
import { SvgHomeWorks } from "../Navigation/Icons/SvgFiles/SvgHomeworks";
import { SvgSettings } from "../Navigation/Icons/SvgFiles/SvgSettings";
import { Icons } from "../Navigation/Icons/enumicons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export type Button = {
  buttonImage: Icons
  buttonName: string
  buttonLink: number
}
enum ButtonLink {
  'Уведомления',
  'Занятия',
  'Домашние задания',
  'Настройки'

}
enum Links {
  '/',
  '/homeworks',
  '/lessons',
  'settings'
}
export type ButtonProps = {
  data: Button
  activeButton:number,
  onClick:(id: number)=>  void;
}

const GetIcon = (props: ButtonProps) => {
  switch (props.data.buttonImage) {
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
export const ButtonNavigation = (props: ButtonProps) => {
  const location = useLocation();
  const {pathname}= location;
  const splitLocation = pathname.split("/");
  return (
    <Link  to={Links[props.data.buttonLink]} className={`nav-link ${props.data.buttonLink === props.activeButton ? 'active':''}`}  onClick={()=>props.onClick(props.data.buttonLink)} >
      {GetIcon(props)}
      <Link  to={Links[props.data.buttonLink]}>{ButtonLink[props.data.buttonLink]}</Link>
    </Link>
  );
}