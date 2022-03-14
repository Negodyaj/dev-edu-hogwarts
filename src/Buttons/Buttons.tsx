import './Buttons.scss';
export const ButtonRectangularLight = () => {
    return(
        <button className="rectangular-button light">Зарегистрироваться</button>
    );
}

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



