import { ListView } from './ListView/ListView';
import { DragDropContext } from 'react-beautiful-dnd';
//import { lessons } from './ListView/exampleData';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onTopicsLoad } from '../../actions/topics.thunk';
import { CoursesPageState } from '../../store/reducers/topics.reducer';
import { AppState } from '../../store/store';

export const CoursesPage = () => {
  const { topics } = useSelector((state: AppState) => state.coursesPageState as CoursesPageState);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('loaded');
    dispatch(onTopicsLoad());
  });

  return (
    <DragDropContext onDragEnd={() => {}}>
      <ListView data={topics} groupId={1} edit={false} />
    </DragDropContext>
  );
};
