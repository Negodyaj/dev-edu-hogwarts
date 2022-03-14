import { Lesson, LessonModel } from "./components/Lesson";


export const LessonsPage = () => {
  const lessons: LessonModel[] = [
    {id: 3, name: 'Занятие 3', date: '10.03.2022', theme: 'Познакомитесь с основами C++ и научитесь создавать простейшие консольные программы.', videoLink: 'https://disk.yandex.com/d/9WeaF1Yua7D1IA', additionalInfo: 'Плагин Figma, позволяет создавать красивые тени, просто перетаскивая «источник света»' },
    {id: 2, name: 'Занятие 2', date: '14.02.2022', theme: 'Научитесь проектировать быстрые алгоритмы, применять стандартные структуры данных, а главное — мыслить как программист. Знание алгоритмов может повысить ваши шансы на трудоустройство, так как в большинстве компаний задачи на алгоритмы — неотъемлемая часть собеседования и тестового задания.', videoLink: '', additionalInfo: '' },
    {id: 1, name: 'Занятие 1', date: '10.02.2022', theme: 'В этом модуле вас ждут 10 видеолекций, которые помогут вам начать разговаривать на английском языке как настоящий разработчик.', videoLink: '', additionalInfo: '' },
  ];

  return (
    <>
      <div className="lessons-container">
        {
          lessons.map(lesson => <Lesson data={lesson} />)
        }

      </div>
    </>
  )
}