import './Buttons.scss';

export type ButtonProps ={
  className:string,
  text:string
}

export const Button = (props:ButtonProps) =>{
  return (
    <button className={props.className}>{props.text}</button>
);
}

export const ButtonRectangularLight = <Button className="rectangular-button light" text="Зарегистрироваться"/>

export const ButtonRectangularDark = <Button className="rectangular-button dark" text="Зарегистрироваться"/>

export const ButtonPublish = <Button className="button-publish light" text="Опубликовать"/>

export const ButtonSaveDraft=<Button className="button-draft dark" text="Сохранить как черновик"/>

export const ButtonCancel =<Button className="button-cancel" text="Отмена"/>




