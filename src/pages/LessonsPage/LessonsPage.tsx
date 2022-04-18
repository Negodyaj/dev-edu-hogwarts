import { useState } from "react";
import { Lesson, LessonModel } from "./components/Lesson";
import {TabContainer} from "../../components/TabContainer/TabContainer";
import {Icon} from "../../shared/enums/Icon";
import { date } from "yup/lib/locale";


export const LessonsPage = () => {
  const [activeLesson, setActiveLesson] = useState(0);
  const lessons: LessonModel[] = [
    {id: 3, name: 'Занятие 3', date: '3/10/2022', theme: 'Познакомитесь с основами C++ и научитесь создавать простейшие консольные программы.', videoLink: 'https://disk.yandex.com/d/9WeaF1Yua7D1IA', additionalInfo: 'Плагин Figma, позволяет создавать красивые тени, просто перетаскивая «источник света»' },
    {id: 2, name: 'Занятие 2', date: '2/14/2022', theme: 'Научитесь проектировать быстрые алгоритмы, применять стандартные структуры данных, а главное — мыслить как программист. Знание алгоритмов может повысить ваши шансы на трудоустройство, так как в большинстве компаний задачи на алгоритмы — неотъемлемая часть собеседования и тестового задания.', videoLink: '', additionalInfo: '' },
    {id: 1, name: 'Занятие 1', date: '2/10/2022', theme: 'В этом модуле вас ждут 10 видеолекций, которые помогут вам начать разговаривать на английском языке как настоящий разработчик.', videoLink: '', additionalInfo: '' },
  ];

  
  function onElementClick (id:number) {
    
    setActiveLesson(id === activeLesson ? 0 : id) 
    
  }
  const filtered = lessons.filter((elem) => {
    const date1 = +new Date();
    const date2 = +new Date(elem.date);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if (diffDays > 7) {
      return false;
    } else {
      return true;
    }
  })
  
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
      <select name="period-select" id="period-select">
        <option selected>Эта неделя</option>
        <option>Этот месяц</option>
        <option>Всё время</option>
      </select>
      <div className="lessons-container">
      {
        lessons.map(lesson => <Lesson data={lesson} id={lesson.id} key={lesson.id} activeLessonId={activeLesson} onClick={onElementClick}/>)
      }
      </div>
    </>
  )
  }