import { useEffect, useState } from "react";
import { Lesson, LessonModel } from "./components/Lesson";
import { TabContainer } from "../../components/TabContainer/TabContainer";
import { Icon } from "../../shared/enums/Icon";
import { FilterItem, FilterList } from "../../components/FilterList/FilterList";
import moment from "moment";
import { isSameDateOrAfter } from "../../shared/helpers/dateHelpers";
import { Period } from "../../shared/enums/Period";

const getLessons = (): LessonModel[] => {
  return [
    { id: 3, name: 'Занятие 3', date: '10.03.2022', theme: 'Познакомитесь с основами C++ и научитесь создавать простейшие консольные программы.', videoLink: 'https://disk.yandex.com/d/9WeaF1Yua7D1IA', additionalInfo: 'Плагин Figma, позволяет создавать красивые тени, просто перетаскивая «источник света»' },
    { id: 2, name: 'Занятие 2', date: '14.04.2022', theme: 'Научитесь проектировать быстрые алгоритмы, применять стандартные структуры данных, а главное — мыслить как программист. Знание алгоритмов может повысить ваши шансы на трудоустройство, так как в большинстве компаний задачи на алгоритмы — неотъемлемая часть собеседования и тестового задания.', videoLink: '', additionalInfo: '' },
    { id: 1, name: 'Занятие 1', date: '02.04.2022', theme: 'В этом модуле вас ждут 10 видеолекций, которые помогут вам начать разговаривать на английском языке как настоящий разработчик.', videoLink: '', additionalInfo: '' },
  ]
};

const lessonsFilterData: FilterItem[] = [
  { id: Period.All, name: 'Все' }, // ToDo: придумать енамы
  { id: Period.Week, name: 'Эта неделя' },
  { id: Period.Month, name: 'Этот месяц' }
];

export const LessonsPage = () => {
  const [activeLesson, setActiveLesson] = useState(0);
  const [lessons, setLessons] = useState<LessonModel[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<LessonModel[]>(lessons);

  useEffect(() => {
    const response = getLessons();
    setLessons(response);
    setFilteredLessons(response);
  }, []);

  const onElementClick = (id: number) => {
    setActiveLesson(id === activeLesson ? 0 : id);
  };

  const filterLessons = (item: any) => {
    setFilteredLessons(lessons.filter((lesson) => {
      const lessonDate = moment(lesson.date, "DD.MM.YYYY");
      if (item?.id === Period.Month) {
        return isSameDateOrAfter(lessonDate, 'months', 1);
      }
      if (item?.id === Period.Week) {        
        return isSameDateOrAfter(lessonDate, 'days', 7);
      }
      return true;
    }))
  };

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
      <FilterList data={lessonsFilterData} callback={filterLessons} />
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