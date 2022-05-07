import { ListView, ListViewLessons } from './ListView/ListView';
import { DragDropContext, DragUpdate } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import {
  loadCoursePageTabs,
  loadCurrentCourse,
  setTopics,
} from '../../actions/courses.actions';
import { useEffect } from 'react';
import { CourseResponse } from '../../models/responses/CourseResponse';
import { TopicResponse } from '../../models/responses/TopicResponse';
import { baseWretch } from '../../services/base-wretch.service';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { selectTabCoursePage } from '../../actions/courses.actions';

export const EditCoursesPage = () => {
  const { currentCourse, courses, topics, selectedTabCoursePage, courseTabs } =
    useSelector((state: AppState) => state.coursesPageState);
  const dispatch = useDispatch();
  const onDragEnd = (result: DragUpdate) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTopicsArray = currentCourse?.topics;
    newTopicsArray?.splice(source.index, 1);
    const dragElem = Object.assign(
      [...currentCourse!.topics].filter((item) => item.name === draggableId)[0]
    );
    newTopicsArray?.splice(destination.index, 0, dragElem);
    dispatch(setTopics(newTopicsArray as TopicResponse[]));
  };

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
      <DragDropContext onDragEnd={onDragEnd}>
        <ListView
          data={
            topics &&
            topics?.map((el, idx) => {
              const q: ListViewLessons = {
                id: el.id,
                lessonNumber: idx + 1,
                lessonName: el.name,
                hoursCount: el.duration,
              };
              return q;
            })
          }
          groupId={1}
          edit={true}
        />
      </DragDropContext>
    </>
  );
};
