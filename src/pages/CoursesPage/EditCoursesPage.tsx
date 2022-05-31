import { ListView } from './ListView/ListView';
import { DragDropContext, DragUpdate } from 'react-beautiful-dnd';
import { useState } from 'react';
import { lessons } from './ListView/exampleData';
import { useForm } from 'react-hook-form';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import './EditCoursesPage.scss';
import { getTopicsByCourseId } from '../../shared/consts';
import { CourseTopicsResponse } from '../../models/responses/CourseTopicsResponse';
import { useDispatch } from 'react-redux';
import { onCourseTopicsUpdate } from '../../actions/editCourses.thunk';
import { baseWretch } from '../../services/base-wretch.service';
//import { AppState } from '../../store/store';

export type TopicFormData = {
  id: number;
  position: number;
  topicName: string;
  hoursCount: number;
};

export const EditCoursesPage = () => {
  const dispatch = useDispatch();
  const [lessonsData, setLessonsData] = useState(lessons); // Это типа данные, которые нам придут

  async function getData() {
    const daata = await baseWretch()
      .url(getTopicsByCourseId(1371))
      .get()
      .json((data) => {
        const topics: TopicFormData[] = data.map((item: CourseTopicsResponse) => {
          const topic: TopicFormData = {
            id: item.id,
            position: item.position,
            topicName: item.topic.name,
            hoursCount: item.topic.duration,
          };
          return topic;
        });
        console.log(topics);
        return topics;
      });
    setLessonsData(lessonsData.concat(daata));
    return daata;
  }

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

    const newLessonsArray = Array.from(lessonsData);
    newLessonsArray.splice(source.index, 1);
    const dragElem = Object.assign(
      [...lessonsData].filter((item) => item.topicName === draggableId)[0]
    );
    newLessonsArray.splice(destination.index, 0, dragElem);

    setLessonsData(() => [...newLessonsArray]);
    console.log(newLessonsArray);
  };

  const onSubmit = (data: TopicFormData) => {
    data.id = lessonsData.length + 1;
    setLessonsData(lessonsData.concat(data));
    dispatch(onCourseTopicsUpdate(data));
  };
  //
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListView data={lessonsData} groupId={1} edit={true} />
      </DragDropContext>
      <button onClick={() => getData()}>hlkgtlt</button>
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
    </>
  );
};
