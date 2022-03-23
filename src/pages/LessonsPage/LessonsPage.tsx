import { useState } from "react";
import { Lesson, LessonModel } from "./components/Lesson";
import { RadioGroup } from "../../components/RadioGroup/RadioGroup"
import { RadioButton, RadioData } from "../../components/RadioGroup/RadioButton/RadioButton";




export const LessonsPage = () => {
  const [activeLesson, setActiveLesson] = useState(0);
  const lessons: LessonModel[] = [
    {id: 3, name: 'Занятие 3', date: '10.03.2022', theme: 'Познакомитесь с основами C++ и научитесь создавать простейшие консольные программы.', videoLink: 'https://disk.yandex.com/d/9WeaF1Yua7D1IA', additionalInfo: 'Плагин Figma, позволяет создавать красивые тени, просто перетаскивая «источник света»' },
    {id: 2, name: 'Занятие 2', date: '14.02.2022', theme: 'Научитесь проектировать быстрые алгоритмы, применять стандартные структуры данных, а главное — мыслить как программист. Знание алгоритмов может повысить ваши шансы на трудоустройство, так как в большинстве компаний задачи на алгоритмы — неотъемлемая часть собеседования и тестового задания.', videoLink: '', additionalInfo: '' },
    {id: 1, name: 'Занятие 1', date: '10.02.2022', theme: 'В этом модуле вас ждут 10 видеолекций, которые помогут вам начать разговаривать на английском языке как настоящий разработчик.', videoLink: '', additionalInfo: '' },
  ];

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
      <RadioGroup radioData={ [
        {
          value: 1,
          text: 'Группа 1',
          numberOfRadioGroup: 1,
        },
        {
          value: 2,
          text: 'Группа 2',
          numberOfRadioGroup: 1,
        },
      ] }
      />
      
      <div className="lessons-container">
      {
        lessons.map(lesson => <Lesson data={lesson} id={lesson.id} key={lesson.id} activeLessonId={activeLesson} onClick={onElementClick}/>)
      }
      </div>
    </>
  )
}