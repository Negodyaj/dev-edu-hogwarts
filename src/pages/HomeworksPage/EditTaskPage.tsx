import { useParams } from 'react-router-dom';
import { NewHomework } from '../NewHomework/NewHomework';
import { useEffect } from 'react';
import { getTaskById } from '../../actions/homeworks.thunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { getTask } from '../../actions/newHomeworkForm.action';

export const EditTaskPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { task } = useSelector((state: AppState) => state.newHomeworkFormState);
  const { homework } = useSelector((state: AppState) => state.homeworkPageState);
  const { selectedTab } = useSelector((state: AppState) => state.homeworksPageState);

  useEffect(() => {
    if (id && !homework) {
      dispatch(getTaskById(+id));
    }
    return () => {
      dispatch(getTask(undefined));
    };
  }, []);

  return <NewHomework initialHomework={homework} initialTask={task} selectedGroup={selectedTab} />;
};
