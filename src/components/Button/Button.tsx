import "./Button.scss";
import { SvgIcon } from "../SvgIcon/SvgIcon";
import { Icon } from "../../shared/enums/Icon";

export type ButtonProps = {
  text: string;
  type: ButtonType;
  icon?: Icon;
  url?: string;
  link?:"btn-link";
};

export enum ButtonType {
  White,
  Colored,
  Text
}

export const Button = (props: ButtonProps) => {
  const buttonClass = (() => {
    switch (props.type) {
      case ButtonType.White:
        return "btn-white-with-border";
      case ButtonType.Colored:
        return "btn-fill";
      case ButtonType.Text:
        return "btn-text";
      default:
        return "";
    }
  })();

  let buttonImg;

  if (props.icon) {
    buttonImg = <SvgIcon icon={props.icon} />;
  }

  if (props.url) {
    return (
        <a href={props.url} className={`btn ${buttonClass}`} >
          {props.text}
          {buttonImg}
        </a>
    );
  }

  return (
    <button className={`btn ${buttonClass}`}>
      {props.text}
      {buttonImg}
    </button>
  );
};
