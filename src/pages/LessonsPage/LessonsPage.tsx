import { useEffect, useState } from "react";
import { Lesson, LessonModel } from "./components/Lesson";
import { TabContainer } from "../../components/TabContainer/TabContainer";
import { Icon } from "../../shared/enums/Icon";
import { date } from "yup/lib/locale";
import { FilterList } from "../../components/FilterList/FilterList";

function getLessons(): LessonModel[] {
  return [
    { id: 3, name: 'Занятие 3', date: '10.03.2022', theme: 'Познакомитесь с основами C++ и научитесь создавать простейшие консольные программы.', videoLink: 'https://disk.yandex.com/d/9WeaF1Yua7D1IA', additionalInfo: 'Плагин Figma, позволяет создавать красивые тени, просто перетаскивая «источник света»' },
    { id: 2, name: 'Занятие 2', date: '14.04.2022', theme: 'Научитесь проектировать быстрые алгоритмы, применять стандартные структуры данных, а главное — мыслить как программист. Знание алгоритмов может повысить ваши шансы на трудоустройство, так как в большинстве компаний задачи на алгоритмы — неотъемлемая часть собеседования и тестового задания.', videoLink: '', additionalInfo: '' },
    { id: 1, name: 'Занятие 1', date: '02.04.2022', theme: 'В этом модуле вас ждут 10 видеолекций, которые помогут вам начать разговаривать на английском языке как настоящий разработчик.', videoLink: '', additionalInfo: '' },
  ]
}
export const LessonsPage = () => {
  const [activeLesson, setActiveLesson] = useState(0);
  const [lessons, setLessons] = useState<LessonModel[]>([])
  const [filteredLessons, setFilteredLessons] = useState<LessonModel[]>(lessons)
  const [item, setItem] = useState();

  useEffect(() => {
    filterLessons(item)
  }, [item])
  useEffect(() => {
    const response = getLessons()
    setLessons(response)
    setFilteredLessons(response)
  }, [])
  function onElementClick(id: number) {

    setActiveLesson(id === activeLesson ? 0 : id)

  }
  const filterLessons = (item: any) => {
    setFilteredLessons(lessons.filter((elem) => {
      const date1 = +new Date();
      const date2 = +new Date(elem.date);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (item?.id == 3) {
        if (diffDays > 30) {
          return false;
        } else {
          return true;
        }
      }
      if (item?.id === 2) {
        if (diffDays > 7) {
          return false;
        } else {
          return true;
        }
      }
      return true;
    }))
  }
  return (
    <>
      <TabContainer
        tabContainerData={[
          { id: 1, icon: Icon.Cookie, text: 'Базовый курс' },
          { id: 2, icon: Icon.Calendar, text: 'Специализация Backend' },
          { id: 3, icon: Icon.Computer, text: 'Специализация Frontend' },
          { id: 4, icon: Icon.Cake, text: 'Специализация QA' },
        ]}
        selectedTab={0}
      />
      <div>Занятия</div>
      <FilterList data={[
        {
          id: 1, name: 'Все'
        },
        {
          id: 2, name: 'Эта неделя'
        },
        {
          id: 3, name: 'Этот месяц'
        }
      ]} type='' item={item} setItem={filterLessons} />
      <div className="lessons-container">
        {filteredLessons.map((lesson) => (
          <Lesson
            data={lesson}
            id={lesson.id}
            key={lesson.id}
            activeLessonId={activeLesson}
            onClick={onElementClick}
          />
        ))}
      </div>
    </>
  );
}