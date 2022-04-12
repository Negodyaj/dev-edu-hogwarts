import "./Button.scss";
import { SvgIcon } from "../SvgIcon/SvgIcon";
import { Icon } from "../../shared/enums/Icon";

export type ButtonProps = {
  text: string;
  type?: ButtonType;
  model: ButtonModel;
  icon?: Icon;
  url?: string;
  link?: "btn-link";
  width?: string;
};

export enum ButtonModel {
  White,
  Colored,
  Text,
}

export enum ButtonType {
submit='submit',
reset='reset',
button='button'
}

export const Button = (props: ButtonProps) => {
  const buttonClass = (() => {
    switch (props.model) {
      case ButtonModel.White:
        return "btn-white-with-border";
      case ButtonModel.Colored:
        return "btn-fill";
      case ButtonModel.Text:
        return "btn-text";
      default:
        return "";
    }
  })();

  let buttonImg;

  if (props.icon) {
    buttonImg = <SvgIcon icon={props.icon} />;
  }


  return (props.url ? (
    <a href={props.url} className={`btn ${buttonClass}`} style={{width:`${props.width}`}}>
      {props.text}
      {buttonImg}
    </a>
  ) : (
    <button className={`btn ${buttonClass}`} type={props.type} style={{width:`${props.width}`}}>
      {props.text}
      {buttonImg}
    </button>
  ));
};

{/* <Button text="Зарегистрироваться" type={ButtonType.White} icon={Icon.Plus} url="#" /> */}
