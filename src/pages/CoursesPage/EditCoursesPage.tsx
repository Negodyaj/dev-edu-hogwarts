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
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';

export const EditCoursesPage = () => {
  const { courses, topics, selectedTabCoursePage, courseTabs } = useSelector(
    (state: AppState) => state.coursesPageState
  );
  // const methods = useForm<TopicFormData>({
  //   mode: 'onChange',
  // });
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
    // const topicsArrayToSend = newTopicsArray.map((el) => {
    //   return {
    //     topicId: el.topic.id,
    //     position: el.position,
    //   };
    // });
    // baseWretch().url(`api/Courses/${selectedTabCoursePage}/program`).put(topicsArrayToSend);
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
      <div className="new-topic-form">
        <h2>Новая тема</h2>
        {/* <form onSubmit={methods.handleSubmit(onSubmit)}> */}
        <div className="flex-container">
          <div className="new-topic">
            <h3>Тема</h3>
            <input
              className="form-input form-input-topic"
              placeholder={`${topics.length + 1}`}
            ></input>
          </div>
          <div className="new-course-name">
            <h3>Название</h3>
            <input
              placeholder="Введите текст"
              className="form-input form-input-course-name"
              // {...methods.register('name')}
            ></input>
          </div>
          <div className="new-duration">
            <h3>Часы</h3>
            <input
              placeholder="XX"
              className="form-input form-input-topic"
              // {...methods.register('duration')}
            ></input>
          </div>
        </div>
        <Button
          text={'Сохранить'}
          type={ButtonType.submit}
          model={ButtonModel.Colored}
          width="190"
        />
        <Button text={'Отмена'} type={ButtonType.reset} model={ButtonModel.Text} />
        {/* </form> */}
      </div>
    </>
  );
};
