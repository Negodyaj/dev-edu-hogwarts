import './Button.scss';

export type ButtonProps = {
  className: string
  text: string
  type: ButtonType
  //icon?: Icon
}

export enum ButtonType {
  White,
  Colored,
  Text
}

export const Button = (props: ButtonProps) => {
  const buttonClass = (() => {
    switch (props.type) {
      case ButtonType.White: return 'btn-white-with-border';
      case ButtonType.Colored: return 'btn-fill';
      case ButtonType.Text: return 'btn-text';
      default: return '';
    }
  })();

  return (
    <button className={`btn ${buttonClass}`}>

      {props.text}
    </button>
  );
}





