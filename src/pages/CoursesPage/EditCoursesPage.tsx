import { ListView } from './ListView/ListView';
import { DragDropContext, DragUpdate } from 'react-beautiful-dnd';
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
import { Input } from '../../components/styled/Input';
//import { AppState } from '../../store/store';

export type TopicFormData = {
  id: number;
  position: number;
  topicName: string;
  hoursCount: number;
};

export const EditCoursesPage = () => {
  const [lessonsData, setLessonsData] = useState(lessons); // Это типа данные, которые нам придут
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TopicFormData>();

  /*const getData = () => {
    return async () => {
      const array = await baseWretch()
        .url(getTopicsByCourseId(1371))
        .get()
        .json((data) => {
          const topicList = data as CourseTopicsResponse[];
          topicList.map((i) => console.log(i.topic));
        });
      console.log(array);
      //setLessonsData(lessonsData.concat(array));
    };
  };*/

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

  const dispatch = useDispatch();
  const onSubmit = (data: TopicFormData) => {
    data.id = lessonsData.length + 1;
    setLessonsData(lessonsData.concat(data));
    dispatch(onCourseTopicsUpdate(data));
    console.log(data);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListView data={lessonsData} groupId={1} edit={true} />
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
