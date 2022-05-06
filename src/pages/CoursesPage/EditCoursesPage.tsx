import { ListView, ListViewLessons } from './ListView/ListView';
import { DragDropContext, DragUpdate } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { loadCoursePageTabs, setTopics } from '../../actions/courses.actions';
import { useEffect } from 'react';
import { CourseResponse } from '../../models/responses/CourseResponse';
import { TopicResponse } from '../../models/responses/TopicResponse';

export const EditCoursesPage = () => {
  const { currentCourse, courses, topics } = useSelector(
    (state: AppState) => state.coursesPageState
  );
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
    if (courses && courses?.length > 0)
      dispatch(loadCoursePageTabs(courses as CourseResponse[]));
  }, [courses]);
  return (
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
  );
};
