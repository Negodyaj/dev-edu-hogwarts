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
import { useState } from 'react';
import { lessons } from './ListView/exampleData';
import { useForm } from 'react-hook-form';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import './EditCoursesPage.scss';
//import { baseWretch } from '../../services/base-wretch.service';
//import { getTopicsByCourseId } from '../../shared/consts';
//import { CourseTopicsResponse } from '../../models/responses/CourseTopicsResponse';
import { useDispatch } from 'react-redux';
import { onCourseTopicsUpdate } from '../../actions/editCourses.thunk';
//import { AppState } from '../../store/store';

export type TopicFormData = {
  id: number;
  position: number;
  topicName: string;
  hoursCount: number;
};

export const EditCoursesPage = () => {
  const { courses, topics, selectedTabCoursePage, courseTabs } = useSelector(
    (state: AppState) => state.coursesPageState
  );
  // const methods = useForm<TopicFormData>({
  //   mode: 'onChange',
  // });
  const dispatch = useDispatch();
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TopicFormData>();
  const {
  const onDragEnd = (result: DragUpdate) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newLessonsArray = Array.from(lessonsData);
    newLessonsArray.splice(source.index, 1);
    const dragElem = Object.assign(
      [...lessonsData].filter((item) => item.topicName === draggableId)[0]
    );
    newLessonsArray.splice(destination.index, 0, dragElem);

    setLessonsData(() => [...newLessonsArray]);
    console.log(newLessonsArray);
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

  const dispatch = useDispatch();
  const onSubmit = (data: TopicFormData) => {
    data.id = lessonsData.length + 1;
    setLessonsData(lessonsData.concat(data));
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
      <div className="form-container">
        <h2>Новая тема</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">
            <div>
              <span>Тема</span>
              <input
                className="form-input short"
                placeholder="0"
                {...register('position', { required: true })}
              />
              {errors.position && <span>Введи номер темы</span>}
            </div>
            <div>
              <span>Название</span>
              <input
                className="form-input long"
                placeholder="Введите текст"
                {...register('topicName', { required: true })}
              />
              {errors.topicName && <span>Введи название темы</span>}
            </div>
            <div>
              <span>Часы</span>
              <input
                className="form-input short"
                type="number"
                placeholder="XX"
                min={1}
                {...register('hoursCount', { required: true })}
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
  );
};
