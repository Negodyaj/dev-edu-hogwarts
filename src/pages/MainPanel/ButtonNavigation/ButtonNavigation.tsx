import { Link} from "react-router-dom";
import "../ButtonNavigation/ButtonNavigation.scss";
export type Button = {
  buttonImage: string
  buttonName: string
  buttonLink:number
}
enum ButtonLink{
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
}
export const ButtonNavigation = (props: ButtonProps) => {
  return (
    <>

      <li>
        <img src={props.data.buttonImage}></img>
        <Link to={Links[props.data.buttonLink]}>{ButtonLink[props.data.buttonLink]}</Link>
      </li>
    </>
  )
}