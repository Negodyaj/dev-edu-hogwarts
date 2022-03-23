import { Lesson, LessonModel } from "./components/Lesson";
import { RadioGroup } from "../../components/RadioGroup/RadioGroup"
import { RadioButton, RadioData } from "../../components/RadioGroup/RadioButton/RadioButton";



export const LessonsPage = () => {
  const lessons: LessonModel[] = [
    {id: 3, name: 'Занятие 3', date: '10.03.2022', theme: 'Познакомитесь с основами C++ и научитесь создавать простейшие консольные программы.' },
    {id: 2, name: 'Занятие 2', date: '14.02.2022', theme: 'Научитесь проектировать быстрые алгоритмы, применять стандартные структуры данных, а главное — мыслить как программист. Знание алгоритмов может повысить ваши шансы на трудоустройство, так как в большинстве компаний задачи на алгоритмы — неотъемлемая часть собеседования и тестового задания.' },
    {id: 1, name: 'Занятие 1', date: '10.02.2022', theme: 'В этом модуле вас ждут 10 видеолекций, которые помогут вам начать разговаривать на английском языке как настоящий разработчик.' },
  ];

  return (
    <>
      <RadioGroup radioData={ [
        {
          id: 1,
          text: 'Группа 1',
          // numberOfRadioGroup: 1,
        },
        {
          id: 2,
          text: 'Группа 2',
          // numberOfRadioGroup: 1,
        },
      ] }
      />
      
      <div>Занятия</div>
      {
        lessons.map(lesson => <Lesson data={lesson} />)
      }
    </>
  )
}