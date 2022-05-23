import { ListView } from './ListView/ListView';
import { DragDropContext, DragUpdate } from 'react-beautiful-dnd';
import { useState } from 'react';
import { lessons } from './ListView/exampleData';

export const EditCoursesPage = () => {
  const [lessonsData, setLessonsData] = useState(lessons); // Это типа данные, которые нам придут

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ListView data={lessonsData} groupId={1} edit={true} />
    </DragDropContext>
  );
};
