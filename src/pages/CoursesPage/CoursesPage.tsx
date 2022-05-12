import { ListView, ListViewLessons } from './ListView/ListView';
import { DragDropContext } from 'react-beautiful-dnd';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import {
  loadCoursePageTabs,
  loadCurrentCourse,
  selectTabCoursePage,
  setTopics,
} from '../../actions/courses.actions';
import { CourseResponse } from '../../models/responses/CourseResponse';
import { baseWretch } from '../../services/base-wretch.service';
import { useEffect } from 'react';
import { TopicResponse } from '../../models/responses/TopicResponse';

export const CoursesPage = () => {
  const dispatch = useDispatch();
  const { courseTabs, currentCourse, topics } = useSelector(
    (state: AppState) => state.coursesPageState
  );
  const { courses, selectedTabCoursePage } = useSelector(
    (state: AppState) => state.coursesPageState
  );
  useEffect(() => {
    if (courses && courses?.length > 0)
      dispatch(loadCoursePageTabs(courses as CourseResponse[]));
  }, [courses]);

  useEffect(() => {
    if (selectedTabCoursePage > 0) {
      {
        baseWretch()
          .url(`api/Courses/${selectedTabCoursePage}/simple`)
          .get()
          .json((data) => {
            dispatch(loadCurrentCourse(data as CourseResponse));
          });
      }
    }
  }, [selectedTabCoursePage]);
  useEffect(() => {
    baseWretch()
      .url(`api/Courses/${selectedTabCoursePage}/topics`)
      .get()
      .json((tpcs) => {
        dispatch(setTopics(tpcs as TopicResponse[]));
      });
  }, [currentCourse]);
  return (
    <>
      <TabContainer
        tabContainerData={courseTabs}
        selectedTab={selectedTabCoursePage}
        onClick={selectTabCoursePage}
      />
      {currentCourse?.topics ? (
        <DragDropContext onDragEnd={() => {}}>
          <ListView
            data={topics.map((el) => {
              const q: ListViewLessons = {
                id: el.topic.id,
                lessonNumber: el.topic.id,
                lessonName: el.topic.name,
                hoursCount: el.topic.duration,
              };
              return q;
            })}
            groupId={currentCourse.id}
            edit={false}
          />
        </DragDropContext>
      ) : (
        ''
      )}
    </>
  );
};
