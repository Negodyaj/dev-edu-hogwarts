import { ListView } from './ListView/ListView';
import { DragDropContext, DragUpdate } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import './EditCoursesPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { onCourseTopicsUpdate } from '../../actions/editCourses.thunk';
import { onTopicsLoad } from '../../actions/topics.thunk';
import { AppState } from '../../store/store';
import { CoursesPageState } from '../../store/reducers/topics.reducer';

export type TopicFormData = {
  id: number;
  position: number;
  topicName: string;
  hoursCount: number;
};

export const EditCoursesPage = () => {
  const dispatch = useDispatch();
  const { topics } = useSelector((state: AppState) => state.coursesPageState as CoursesPageState);
  useEffect(() => {
    console.log('loaded');
    dispatch(onTopicsLoad());
  }, []);
  const [lessonsData, setLessonsData] = useState<TopicFormData[]>(topics);
  const [savedVisible, setSavedVisible] = useState('invisible');

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

    const newLessonsArray = [...lessonsData];
    newLessonsArray.splice(source.index, 1);
    const dragElem = Object.assign(
      [...lessonsData].filter((item) => item.topicName === draggableId)[0]
    );
    newLessonsArray.splice(destination.index, 0, dragElem);
    const orderedLessonsArray = newLessonsArray.map((t, index) => {
      return { ...t, position: index + 1 };
    });
    setLessonsData(orderedLessonsArray);
    console.log(orderedLessonsArray); //put вот этого массива

    setSavedVisible('visible');
    setTimeout(() => setSavedVisible('invisible'), 3000);
  };

  const onSubmit = (data: TopicFormData) => {
    const newLessonsArray = lessonsData.concat(data);
    setLessonsData(() => [...newLessonsArray]);
    console.log(newLessonsArray); //put вот этого массива
    dispatch(onCourseTopicsUpdate(data)); //ещё надо будет передавать курс айди

    setSavedVisible('visible');
    setTimeout(() => setSavedVisible('invisible'), 3000);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListView data={lessonsData} groupId={1} edit={true} />
      </DragDropContext>
      <div className={`saved ${savedVisible}`}>Сохранено</div>
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
