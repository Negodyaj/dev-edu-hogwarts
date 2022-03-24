import "./AddingNewLessonPage.scss";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { baseWretch } from "../../services/base-wretch.service"
import { Console } from "console";
import { loginUrl } from "../../shared/consts";
import { setToken } from "../../services/auth.service";

export type LessonsData = {
  date: string
  linkToRecord: string
  teacherComment: string
  teacherId: number
  topic: {
    name: string
  }
}

export const AddingNewLessonPage = () => {
  const [groups, setGroups] = useState<any>();
  const { register, handleSubmit, formState: { errors } } = useForm<LessonsData>();

    useEffect(() => {
      baseWretch()
      // .url("api/Course/1/simple")
      .url("api/group")
      .get()
      // .json( data => {console.log(data); setGroups(data)});
      .json( data => setGroups(data));
    }, []);

    const onSubmit = (data: LessonsData) => baseWretch()
      .url("/api/Lesson")
      .post(data)
      .json(res => res.json());

  return (
    <>
    {/* { groups[0].name } */}
    <form className="new-lesson-page-container" onSubmit={handleSubmit(onSubmit)}>
      {/* <button onClick={}></button> */}
      <div className="title-container">
        <div>Новое занятие</div>
        <a href="">Список сохраненных занятий</a>
      </div>
      <div className="radio-line">Номер группы:</div>
      {/* { groups.map(item => <div>item.name</div>)} */}
      {/* {groups[0].name} */}
      {/* <div className="radio-line">{groups[1].name}</div> */}
      <div className="">Номер занятия:</div>
      <div className="lessons-input">
        <div>Дата проведения занятия</div>
        <input type={"text"} placeholder="XX.XX.XXXX" {...register("date", { required: true })}/>
      </div>
      <div className="lessons-input">
        <div>Название занятия</div>
        <input type={"text"} placeholder="Введите название" {...register("topic.name", { required: true })}/>
      </div>
      <div className="lessons-input">
        <div>Ссылка на видео</div>
        <input type={"text"} placeholder="Ссылка на видео" {...register("linkToRecord", { required: true })}/>
      </div>
      <div className="lessons-input">
        <div>Дополнительные материалы</div>
        <input type={"text"} placeholder="Введите текст"{...register("teacherComment", { required: true })} />
      </div>
      <div className="buttons-container">
        <button type={"submit"}>Опубликовать</button>
        <button type={"button"}>Сохранить как черновик</button>
        <button type={"button"}>Отмена</button>
      </div>
    </form>
    </>
  );
};
