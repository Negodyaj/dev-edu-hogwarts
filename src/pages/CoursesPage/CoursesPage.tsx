import { ListView } from './ListView/ListView';
import { DragDropContext } from 'react-beautiful-dnd';
import { lessons } from './ListView/exampleData';

export const CoursesPage = () => {
  return (
    <DragDropContext onDragEnd={() => {}}>
      <ListView data={lessons} groupId={1} edit={false} />
    </DragDropContext>
  );
};
