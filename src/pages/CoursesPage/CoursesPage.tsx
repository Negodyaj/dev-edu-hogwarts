import { ListView } from './ListView/ListView';
import { DragDropContext } from 'react-beautiful-dnd';
import { lessons } from './ListView/exampleData';
import { useEffect } from 'react';

export const CoursesPage = () => {
  useEffect(() => {
    console.log('loaded');
  });

  return (
    <DragDropContext onDragEnd={() => {}}>
      <ListView data={lessons} groupId={1} edit={false} />
    </DragDropContext>
  );
};
