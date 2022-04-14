import { ListView } from './ListView/ListView';
import { DragDropContext } from 'react-beautiful-dnd';
import { lessons } from './ListView/exampleData';

export const CoursesPage = () => {
  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="margin-common-content">
        <ListView data={lessons} groupId={1} edit={false} />
      </div>
    </DragDropContext>
  );
};
