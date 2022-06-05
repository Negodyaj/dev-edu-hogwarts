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
import { loadLessons, loadLessonsDraft } from '../../actions/lessons.thunks';
import { filterLessons, selectTab } from '../../actions/lessons.actions';
import { LessonResponse } from '../../models/responses/LessonResponse';

const lessonsFilterData: FilterItem[] = [
  { id: Period.All, name: 'Все' },
  { id: Period.Week, name: 'Эта неделя' },
  { id: Period.Month, name: 'Этот месяц' },
];

export const LessonsPage = () => {
  const dispatch = useDispatch();
  const [activeLesson, setActiveLesson] = useState(0);

  const { lessons, filteredLessons, tabs, selectedTab, isEditing } = useSelector(
    (state: AppState) => state.lessonsPageState as LessonsPageState
  );

  useEffect(() => {
    if (!isEditing) {
      if (selectedTab > 0) {
        dispatch(loadLessons(selectedTab));
      }
    } else {
      if (selectedTab > 0) {
        dispatch(loadLessonsDraft(selectedTab));
      }
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

  const lessonsToDisplay = filteredLessons?.map((item) => {
    const lessonModel: LessonModel = {
      serialNumber: item.id,
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
        course={true}
      />
      {/* {lessonsToDisplay && lessonsToDisplay.length > 0 ? (
          homeworks.map((hw) => <HomeworkCard data={hw} key={hw.id} />)
        ) : (
          <span className="lack-of-homeworks">Домашних заданий еще нет</span>
        )} */}
      <FilterList data={lessonsFilterData} callback={applyLessonsFilter} />
      <div className="lessons-container">
        {lessonsToDisplay?.map((lesson) => (
          <Lesson
            data={lesson}
            id={lesson.serialNumber}
            key={lesson.serialNumber}
            activeLessonId={activeLesson}
            onClick={onElementClick}
          />
        ))}
      </div>
    </>
  );
};
