import { ListView } from './ListView/ListView';
import { DragDropContext, DragUpdate } from 'react-beautiful-dnd';
import { useState } from 'react';
import { lessons } from './ListView/exampleData';
import { useForm } from 'react-hook-form';
import { Button, ButtonModel, ButtonType } from '../../components/Button/Button';
import './EditCoursesPage.scss';

//вопросы:
//как сделать так чтобы при отправке темы в массив поля ресетились
//после нажатия ресет можно отправить пустой инпут (сделать onError?)

export type UserFormData = {
  id: number;
  lessonNumber: number;
  lessonName: string;
  hoursCount: number;
};

export const EditCoursesPage = () => {
  const [lessonsData, setLessonsData] = useState(lessons); // Это типа данные, которые нам придут
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();

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
      [...lessonsData].filter((item) => item.lessonName === draggableId)[0]
    );
    newLessonsArray.splice(destination.index, 0, dragElem);

    setLessonsData(() => [...newLessonsArray]);
  };

  const onSubmit = (data: UserFormData) => {
    setLessonsData(lessonsData.concat(data));
    console.log(lessonsData, data);
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
              <input
                className="form-input short"
                placeholder="0"
                {...register('lessonNumber', { required: true })}
              />
              {errors.lessonNumber && <span>Введи номер темы</span>}
            </div>
            <div>
              <span>Название</span>
              <input
                className="form-input long"
                placeholder="Введите текст"
                {...register('lessonName', { required: true })}
              />
              {errors.lessonName && <span>Введи название темы</span>}
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
