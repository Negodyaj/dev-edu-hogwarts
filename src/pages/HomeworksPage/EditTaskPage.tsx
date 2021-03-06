import { useParams } from 'react-router-dom';
import { NewHomework } from '../NewHomework/NewHomework';
import { useEffect } from 'react';
import { getTaskById } from '../../actions/homeworks.thunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { getTask } from '../../actions/newHomeworkForm.action';
import { Loader } from './HomeworkPage/Loader';

export const EditTaskPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { task, inProcess } = useSelector((state: AppState) => state.newHomeworkFormState);
  const { selectedTab } = useSelector((state: AppState) => state.homeworksPageState);

  useEffect(() => {
    if (id) {
      dispatch(getTaskById(+id));
    }
    return () => {
      dispatch(getTask(undefined));
    };
  }, []);

  return (
    <>{inProcess ? <Loader /> : <NewHomework initialTask={task} selectedGroup={selectedTab} />}</>
  );
};
