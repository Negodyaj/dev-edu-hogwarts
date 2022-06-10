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
import { filterLessons, selectTab, setIsEdit } from '../../actions/lessons.actions';
import { LessonResponse } from '../../models/responses/LessonResponse';
import { LoginPageState } from '../../store/reducers/login.reducer';
import { UserRole } from '../../shared/enums/UserRole';
import { Button, ButtonModel } from '../../components/Button/Button';
import { Icon } from '../../shared/enums/Icon';
import { useNavigate } from 'react-router-dom';
import { MainPanelState } from '../../store/reducers/mainPanel.reducer';
import { ContentContainer } from '../../components/styled/ContentContainer';

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
  const { currentRole } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  const { isDark } = useSelector((state: AppState) => state.mainPanelState as MainPanelState);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes('unpublished')) dispatch(setIsEdit(true));
    else dispatch(setIsEdit(false));
  }, [location.pathname]);

  useEffect(() => {
    if (selectedTab > 0) {
      if (!isEditing) dispatch(loadLessons(selectedTab));
      else dispatch(loadLessonsDraft(selectedTab));
    }
  }, [selectedTab, isEditing]);

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

  useEffect(() => {
    applyLessonsFilter(lessonsFilterData[0]);
  }, [lessons, location.pathname]);

  const lessonsToDisplay = filteredLessons?.map((item) => {
    const lessonModel: LessonModel = {
      id: item.id,
      serialNumber: item.number,
      name: `Занятие ${item.number}`,
      date: item.date,
      theme: item.name,
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
      {lessonsToDisplay && lessonsToDisplay.length > 0 ? (
        <>
          <ContentContainer isDarkMode={isDark} className="relative">
            <div className="filter-list-wrapper">
              {!isEditing && <FilterList data={lessonsFilterData} callback={applyLessonsFilter} />}
            </div>
            {lessonsToDisplay?.map((lesson) => (
              <Lesson
                key={lesson.id}
                data={lesson}
                id={lesson.id}
                activeLessonId={activeLesson}
                onClick={onElementClick}
                isEditing={isEditing}
              />
            ))}
          </ContentContainer>
        </>
      ) : (
        <span className="lack-of-homeworks">Занятий еще нет</span>
      )}
      {(currentRole === UserRole.Teacher ||
        currentRole === UserRole.Admin ||
        currentRole === UserRole.Tutor) && (
        <div className="buttons-group flex-container buttons-after-list">
          <Button
            model={ButtonModel.Colored}
            text="Добавить занятие"
            icon={Icon.Plus}
            onClick={() => navigate('/new-lesson')}
          />
          <Button
            model={ButtonModel.White}
            text="Сохраненные занятия"
            onClick={() => navigate('/new-lesson/unpublished')}
          />
        </div>
      )}
    </>
  );
};
