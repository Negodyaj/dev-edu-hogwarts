import { useState } from "react";
import { Lesson, LessonModel } from "./components/Lesson";
import {TabContainer} from "../../components/TabContainer/TabContainer";
import {Icon} from "../../shared/enums/Icon";


export const LessonsPage = () => {
  const [activeLesson, setActiveLesson] = useState(0);
  



  // const toggle = document.querySelector(".circle")
  // const onElementClick = (id:number) => {
  //   setActiveLesson(id === activeLesson ? 0 : id)
  // }
  function onElementClick (id:number) {
    // if (id === activeLesson) {
    //   setActiveLesson(0);
    // }
    // else
    setActiveLesson(id === activeLesson ? 0 : id)
    
    
  }

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
        lessons.map(lesson => <Lesson data={lesson} id={lesson.id} key={lesson.id} activeLessonId={activeLesson} onClick={onElementClick}/>)
      }
      </div>
    </>
  )
}