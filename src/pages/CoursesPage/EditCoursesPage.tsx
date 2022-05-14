import { ListView, ListViewLessons } from './ListView/ListView';
import { DragDropContext, DragUpdate } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import {
  loadCoursePageTabs,
  // loadCurrentCourse,
  setTopics,
} from '../../actions/courses.actions';
import { useEffect } from 'react';
import { CourseResponse } from '../../models/responses/CourseResponse';
import { TopicResponse } from '../../models/responses/TopicResponse';
import { baseWretch } from '../../services/base-wretch.service';
import { TabContainer } from '../../components/TabContainer/TabContainer';
import { selectTabCoursePage } from '../../actions/courses.actions';

export const EditCoursesPage = () => {
  const { courses, topics, selectedTabCoursePage, courseTabs } = useSelector(
    (state: AppState) => state.coursesPageState
  );
  const dispatch = useDispatch();
  const onDragEnd = (result: DragUpdate) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newTopicsArray = [...topics];
    newTopicsArray?.splice(source.index, 1);
    const currentEl = topics[+draggableId];
    newTopicsArray?.splice(destination.index, 0, currentEl);
    dispatch(setTopics(newTopicsArray));
    const topicsArrayToSend = newTopicsArray.map((el) => {
      return {
        topicId: el.topic.id,
        position: el.position,
      };
    });
    baseWretch().url(`api/Courses/${selectedTabCoursePage}/program`).put(topicsArrayToSend);
    console.log(topics);
    console.log(newTopicsArray);
  };
  useEffect(() => {
    if (courses && courses?.length > 0) dispatch(loadCoursePageTabs(courses as CourseResponse[]));
  }, [courses]);
  useEffect(() => {
    baseWretch()
      .url(`api/Courses/${selectedTabCoursePage}/topics`)
      .get()
      .json((tpcs) => {
        dispatch(setTopics(tpcs as TopicResponse[]));
      });
  }, [selectedTabCoursePage]);

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
            topics
              ? topics.map((el) => {
                  const q: ListViewLessons = {
                    id: el.topic.id,
                    lessonNumber: el.position,
                    lessonName: el.topic.name,
                    hoursCount: el.topic.duration,
                  };
                  return q;
                })
              : []
          }
          groupId={1}
          edit={true}
        />
      </DragDropContext>
    </>
  );
};
