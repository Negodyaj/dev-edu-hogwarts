import {ListView} from "./ListView/ListView";
import {DragDropContext} from "react-beautiful-dnd";

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
  //
  // const onDragStart = () => {
  //
  // }

  const onDragEnd = () => {

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='margin-common-content'>
        <ListView data={lessons} groupId={1}/>
      </div>
    </DragDropContext>
  )
}