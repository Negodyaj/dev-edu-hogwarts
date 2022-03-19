import {ListView} from "./ListView/ListView";
import {DragDropContext, DragUpdate} from "react-beautiful-dnd";
import {useState} from "react";

const lessons = [
  {
    id: 1,
    lessonNumber: 1,
    lessonName: 'Введение',
    hoursCount: 1
  },
  {
    id: 2,
    lessonNumber: 2,
    lessonName: 'Знакомство со студией',
    hoursCount: 4
  },
  {
    id: 3,
    lessonNumber: 3,
    lessonName: 'Ввод/вывод',
    hoursCount: 1
  },
  {
    id: 4,
    lessonNumber: 4,
    lessonName: 'Алгебра логики',
    hoursCount: 2
  },
  {
    id: 5,
    lessonNumber: 5,
    lessonName: 'Одномерные массивы',
    hoursCount: 2
  },
  {
    id: 6,
    lessonNumber: 6,
    lessonName: 'Базовое понимание классов',
    hoursCount: 4
  },
]

export const CoursesPage = () => {
  const [lessonsData, setLessonsData] = useState(lessons); // Это типа данные, которые нам придут

  const onDragEnd = (result: DragUpdate) => {
    const {destination, source, draggableId} = result;

    if(!destination) {
      return;
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }

    const newLessonsArray = Array.from(lessonsData);
    newLessonsArray.splice(source.index,1);
    const dragElem = Object.assign([...lessonsData].filter(item => item.lessonName === draggableId)[0]);
    newLessonsArray.splice(destination.index, 0, dragElem);

    setLessonsData(() => [...newLessonsArray]);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='margin-common-content'>
        <ListView data={lessonsData} groupId={1}/>
      </div>
    </DragDropContext>
  )
}