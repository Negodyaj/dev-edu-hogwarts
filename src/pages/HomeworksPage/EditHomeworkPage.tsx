import { NewHomework } from '../NewHomework/NewHomework';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loadHomework } from '../../actions/homeworks.thunks';
// import { loadHomeworkSuccess } from '../../actions/homework.actions';
import { Loader } from './HomeworkPage/Loader';

export const EditHomeworkPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { homework, isLoad } = useSelector((state: AppState) => state.homeworkPageState);

  useEffect(() => {
    debugger;
    if (id && !homework) {
      dispatch(loadHomework(+id));
    }
  }, []);

  return <>{isLoad ? <Loader /> : <NewHomework initialHomework={homework} />}</>;
};
