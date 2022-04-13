import { useEffect, useState } from "react";
import { Lesson, LessonModel } from "./components/Lesson";
import {TabContainer} from "../../components/TabContainer/TabContainer";
import {Icon} from "../../shared/enums/Icon";
import { useDispatch, useSelector } from "react-redux";
import { loadTabs } from "../../actions/notifications.actions";
import { baseWretch } from "../../services/base-wretch.service";
import { UserResponse } from "../../models/responses/UserResponse";
import { AppState } from "../../store/store";
import { loadLessons } from "../../actions/lessons.actions";
import { LessonResponse } from "../../models/responses/LessonResponse";


export const LessonsPage = () => {
  const [activeLesson, setActiveLesson] = useState(0);
  const { currentUser } = useSelector((state: AppState) => state.loginPageState );
  const dispatch = useDispatch();
  
  function onElementClick (id:number) {
    setActiveLesson(id === activeLesson ? 0 : id)
  }
  
  useEffect(() => {
    dispatch(loadTabs());
    baseWretch()
      .url(`by-groupId/${currentUser?.groups[0].id}`) //запихнуть через табы ебучие
      .get()
      .json((data) => loadLessons(data as LessonResponse[]))
  }, []);
  const { lessons } = useSelector((state: AppState) => state.lessonPageState );

  const newLessons = lessons?.map( item => {
    let newLessons: LessonModel = {
      id: item.id,
      name: "Имя", //заменить!
      date: item.date,
      theme: "Тема", //заменить!
      videoLink: item.linkToRecord,
      additionalInfo: item.additionalMaterials
    }
    return newLessons
  })//////////////////////////////////////

  return (
    <>
      <TabContainer tabContainerData={ [
        {id: 1, icon: Icon.Cookie, text: 'Базовый курс'},
        {id: 2, icon: Icon.Calendar, text: 'Специализация Backend'},
        {id: 3, icon: Icon.Computer, text: 'Специализация Frontend'},
        {id: 4, icon: Icon.Cake, text: 'Специализация QA'},
        ] } selectedTab={0}
      />
      
      <div>Занятия</div>
      <div className="lessons-container">
      {
        newLessons?.map(lesson => <Lesson data={lesson} id={lesson.id} key={lesson.id} activeLessonId={activeLesson} onClick={onElementClick}/>)
      }
      </div>
    </>
  )
}