import './Buttons.scss';

function Button (props) {
  return(
    <button className={props.className}>{props.text}</button>
);
}

export const ButtonRectangularLight = <Button className="rectangular-button light", text="Зарегистрироваться"/>

export const ButtonRectangularDark=()=> {
return (
    <button className="rectangular-button dark">Зарегистрироваться</button>
);
}

export const ButtonPublish =()=>{
    return (
        <button className="button-publish light">Опубликовать</button>
    );
}

export const ButtonSaveDraft=()=>{
    return (
        <button className="button-draft dark">Сохранить как черновик</button>
    );
}

export const ButtonCancel =()=>{
    return (
        <button className="button-cancel">Отмена</button>
    )
}



