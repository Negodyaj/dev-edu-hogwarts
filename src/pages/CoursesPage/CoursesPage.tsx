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

export const CoursesPage = () => {
  const dispatch = useDispatch();
  const { courseTabs, currentCourse } = useSelector(
    (state: AppState) => state.coursesPageState
  );
  const { courses, selectedTabCoursePage } = useSelector(
    (state: AppState) => state.coursesPageState
  );
  useEffect(() => {
    if (selectedTabCoursePage > 0) {
      baseWretch()
        .url(`api/Courses/${selectedTabCoursePage}/simple`)
        .get()
        .json((data) => {
          dispatch(loadCurrentCourse(data as CourseResponse));
          dispatch(setTopics((data as CourseResponse).topics));
        });
    }
  }, [selectedTabCoursePage]);
  useEffect(() => {
    if (courses && courses?.length > 0)
      dispatch(loadCoursePageTabs(courses as CourseResponse[]));
  }, [courses]);
  return (
    <>
      <TabContainer
        tabContainerData={courseTabs}
        selectedTab={selectedTabCoursePage}
        onClick={selectTabCoursePage}
      />
      {currentCourse?.topics && currentCourse.topics.length > 0 ? (
        <DragDropContext onDragEnd={() => {}}>
          <ListView
            data={currentCourse?.topics.map((el, idx) => {
              const q: ListViewLessons = {
                id: el.id,
                lessonNumber: idx,
                lessonName: el.name,
                hoursCount: el.duration,
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
