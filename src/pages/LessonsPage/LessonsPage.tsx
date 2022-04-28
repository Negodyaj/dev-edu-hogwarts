import { useEffect, useState } from 'react';
import { Lesson, LessonModel } from './components/Lesson';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import moment from 'moment';
import { isSameDateOrAfter } from '../../shared/helpers/dateHelpers';
import { Period } from '../../shared/enums/Period';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { LessonsPageState } from '../../store/reducers/lessons.reducer';
import {
  loadLessons,
  filterLessons,
  selectTab,
} from '../../actions/lessons.actions';
import { LessonResponse } from '../../models/responses/LessonResponse';
import { baseWretch } from '../../services/base-wretch.service';

const lessonsFilterData: FilterItem[] = [
  { id: Period.All, name: 'Все' },
  { id: Period.Week, name: 'Эта неделя' },
  { id: Period.Month, name: 'Этот месяц' },
];

export const LessonsPage = () => {
  const dispatch = useDispatch();
  const [activeLesson, setActiveLesson] = useState(0);

  const { lessons, filteredLessons, tabs, selectedTab } = useSelector(
    (state: AppState) => state.lessonsPageState as LessonsPageState
  );

  useEffect(() => {
    if (selectedTab > 0) {
      baseWretch()
        .url(`by-groupId/${selectedTab}`)
        .get()
        .json((data) => dispatch(loadLessons(data as LessonResponse[])));
    }
  }, [selectedTab]);

  const onElementClick = (id: number) => {
    setActiveLesson(id === activeLesson ? 0 : id);
  };

  const applyLessonsFilter = (item: FilterItem) => {
    const lessonsToDisplay = lessons?.filter((lesson) => {
      const lessonDate = moment(lesson.date, 'DD.MM.YYYY');
      if (item?.id === Period.Month) {
        return isSameDateOrAfter(lessonDate, 'months', 1);
      }
      if (item?.id === Period.Week) {
        return isSameDateOrAfter(lessonDate, 'days', 7);
      }
      return true;
    });

    dispatch(filterLessons(lessonsToDisplay as LessonResponse[]));
  };

  const newLessons = filteredLessons?.map((item) => {
    const lessonModel: LessonModel = {
      id: item.id,
      name: 'Имя', //заменить методом (пока сортировка по дате) (взять данные, которых нет, с бэка)!
      date: item.date,
      theme: 'Тема', //заменить (взять данные, которых нет, с бэка)!
      //theme: item.name,
      videoLink: item.linkToRecord,
      additionalInfo: item.additionalMaterials,
    };
    return lessonModel;
  });

  return (
    <>
      <TabContainer
        tabContainerData={tabs}
        selectedTab={selectedTab}
        onClick={selectTab}
      />

      <div>Занятия</div>
      <FilterList data={lessonsFilterData} callback={applyLessonsFilter} />
      <div className="lessons-container">
        {newLessons?.map((lesson) => (
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
};
