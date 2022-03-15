import { Link } from "react-router-dom";
import "./ButtonNavigation.scss";
import { SvgNotifications } from "../../SvgIcon/SvgFiles/SvgNotifications";
import { SvgLessons } from "../../SvgIcon/SvgFiles/SvgLessons";
import { SvgHomeWorks } from "../../SvgIcon/SvgFiles/SvgHomeworks";
import { SvgSettings } from "../../SvgIcon/SvgFiles/SvgSettings";
// import { Icons } from "../Navigation/Icons/enumicons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SvgSwitchGetter } from "../../SvgIcon/SvgSwitchGetter";
import { Icons } from "../../SvgIcon/enumIcons";

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


export const ButtonNavigation = (props: ButtonProps) => {
  const location = useLocation();
  const {pathname}= location;
  const splitLocation = pathname.split("/");
  return (
    <Link  to={Links[props.data.buttonLink]} className={`nav-link ${props.data.buttonLink === props.activeButton ? 'active':''}`}  onClick={()=>props.onClick(props.data.buttonLink)} >
      {SvgSwitchGetter(props.data.buttonImage)}
      <Link  to={Links[props.data.buttonLink]}>{ButtonLink[props.data.buttonLink]}</Link>
    </Link>
  );
}