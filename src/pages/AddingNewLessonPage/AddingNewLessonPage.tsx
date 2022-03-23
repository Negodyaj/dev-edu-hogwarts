import "./AddingNewLessonPage.scss";

export const AddingNewLessonPage = () => {
  return (
    <form className="new-lesson-page-container">
      <div className="title-container">
        <div>Новое занятие</div>
        <a href="">Список сохраненных занятий</a>
      </div>
      <div className="radio-line">Номер группы:</div>
      <div className="radio-line">Номер группы:</div>
      <div className="radio-line">Номер группы:</div>
      <div className="">Номер занятия:</div>
      <div className="lessons-input">
        <div>Дата проведения занятия</div>
        <input type={"text"} placeholder="XX.XX.XXXX"></input>
      </div>
      <div className="lessons-input">
        <div>Название занятия</div>
        <input type={"text"} placeholder="Введите название"></input>
      </div>
      <div className="lessons-input">
        <div>Ссылка на видео</div>
        <input type={"text"} placeholder="Ссылка на видео"></input>
      </div>
      <div className="lessons-input">
        <div>Дополнительные материалы</div>
        <input type={"text"} placeholder="Введите текст"></input>
      </div>
      <div className="buttons-container">
        <button type={"submit"}>Опубликовать</button>
        <button type={"button"}>Сохранить как черновик</button>
        <button type={"button"}>Отмена</button>
      </div>
    </form>
  );
};
