import "./AddingNewLessonPage.scss";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { baseWretch } from "../../services/base-wretch.service"
import { RadioGroup, RadioProps } from "../../components/RadioGroup/RadioGroup";
import { RadioButton, RadioData } from "../../components/RadioGroup/RadioButton/RadioButton";

export type LessonsData = {
  date: string
  linkToRecord: string
  additionalMaterials: string
  teacherId?: number
  topic: {
    id: number
  }
}


export const AddingNewLessonPage = () => {
  const [groups, setGroups] = useState<any>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<LessonsData>();

    useEffect(() => {
      baseWretch()
      .url("api/Groups")
      .get()
      // .json( data => {console.log(data); setGroups(data)});
      .json( group => setGroups(group.slice(0,3)));
    }, []);

    const onSubmit = (data: LessonsData) => baseWretch()
    // непонятный метод пост
      .url("api/Lessons")
      .post(data)
      .json(res => res.json());

      const onClickSave = (data: LessonsData) => baseWretch()
      .url("api/Lesson")
      .post(data)
      .json(res => res.json());

  return (
    <form className="new-lesson-page-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="title-container">
        <div>Новое занятие</div>
        <a href="">Список сохраненных занятий</a>
      </div>
      <div className="radio-line">Номер группы:</div>
      <RadioGroup radioData={groups}/>
      <div className="">Номер занятия:</div>
      <div className="lessons-input">
        <div>Дата проведения занятия</div>
        <input type={"text"} placeholder="XX.XX.XXXX" {...register("date", { required: true })}/>
        {errors.date && <span>вы не указали дату!</span>}
      </div>
      <div className="lessons-input">
        <div>Название занятия</div> 
        <input type={"text"} placeholder="Введите название" {...register("topic.id", { required: false })}/>
        {/* <input type={"text"} placeholder="Введите название" {...register("topic.id", { required: true })}/> */}
        {/* {errors.date && <span>вы не указали название!</span>} */}
      </div>
      <div className="lessons-input">
        <div>Ссылка на видео</div>
        <input type={"text"} placeholder="Ссылка на видео" {...register("linkToRecord", { required: true })}/>
        {errors.linkToRecord && <span>вы не указали ссылку на запись!</span>}
      </div>
      <div className="lessons-input">
        <div>Дополнительные материалы</div>
        <input type={"text"} placeholder="Введите текст"{...register("additionalMaterials", { required: true })} />
      </div>
      <div className="buttons-container">
        <button type={"submit"}>Опубликовать</button>
        <button type={"button"} onClick={handleSubmit(onClickSave)}>Сохранить как черновик</button>
        <button type={"reset"}>Отмена</button>
      </div>
    </form>
  );
};
