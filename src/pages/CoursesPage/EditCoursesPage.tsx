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
import { useForm } from 'react-hook-form';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import './EditCoursesPage.scss';
//import { baseWretch } from '../../services/base-wretch.service';
//import { getTopicsByCourseId } from '../../shared/consts';
//import { CourseTopicsResponse } from '../../models/responses/CourseTopicsResponse';
import { onCourseTopicsUpdate } from '../../actions/editCourses.thunk';
import { Input } from '../../components/styled/Input';
import { DecrementLoader, IncrementLoader } from '../../actions/loader.action';
//import { AppState } from '../../store/store';

export type TopicFormData = {
  id: number;
  position: number;
  topicName: string;
  hoursCount: number;
};

export const EditCoursesPage = () => {
  const dispatch = useDispatch();
  const { courses, topics, selectedTabCoursePage, courseTabs } = useSelector(
    (state: AppState) => state.coursesPageState
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TopicFormData>();
  const onDragEnd = (result: DragUpdate) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newLessonsArray = Array.from(topics);
    newLessonsArray.splice(source.index, 1);
    const dragElem = Object.assign(
      [...topics].filter((item) => item.topic.name === draggableId)[0]
    );
    newLessonsArray.splice(destination.index, 0, dragElem);

    // setLessonsData(() => [...newLessonsArray]);
    console.log(newLessonsArray);
  };
  useEffect(() => {
    if (courses && courses?.length > 0) dispatch(loadCoursePageTabs(courses as CourseResponse[]));
  }, [courses]);
  useEffect(() => {
    dispatch(IncrementLoader());
    baseWretch()
      .url(`api/Courses/${selectedTabCoursePage}/topics`)
      .get()
      .json((tpcs) => {
        dispatch(setTopics(tpcs as TopicResponse[]));
        dispatch(DecrementLoader());
      });
  }, [selectedTabCoursePage]);

  const onSubmit = (data: TopicFormData) => {
    data.id = topics.length + 1;
    // setLessonsData(lessonsData.concat(data));
    dispatch(onCourseTopicsUpdate(data));
    console.log(data);
  };

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
                    position: el.position,
                    topicName: el.topic.name,
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
      <div className="form-container">
        <h2>Новая тема</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">
            <div>
              <span>Тема</span>
              <Input
                textAlign="center"
                type="text"
                width="102px"
                placeholder="0"
                register={register}
                name="position"
                rules={{ required: true }}
              />
              {errors.position && <span>Введи номер темы</span>}
            </div>
            <div>
              <span>Название</span>
              <Input
                type="text"
                width="488px"
                placeholder="Введите текст"
                register={register}
                name="topicName"
                rules={{ required: true }}
              />
              {errors.topicName && <span>Введи название темы</span>}
            </div>
            <div>
              <span>Часы</span>
              <Input
                textAlign="center"
                width="102px"
                type="number"
                placeholder="XX"
                register={register}
                name="hoursCount"
                rules={{ required: true }}
              />
              {errors.hoursCount && <span>Введи часы</span>}
            </div>
          </div>
          <div className="button-container">
            <Button text="Сохранить" model={ButtonModel.Colored} type={ButtonType.submit} />
            <Button text="Отмена" type={ButtonType.reset} model={ButtonModel.Text} />
          </div>
        </form>
      </div>
    </>
  );
};
