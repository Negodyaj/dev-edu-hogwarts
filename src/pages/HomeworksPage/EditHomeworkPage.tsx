import { NewHomework } from '../NewHomework/NewHomework';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loadHomework } from '../../actions/homeworks.thunks';
import { loadHomeworkSuccess } from '../../actions/homework.actions';

export const EditHomeworkPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { homework } = useSelector((state: AppState) => state.homeworkPageState);
  const { selectedTab } = useSelector((state: AppState) => state.homeworksPageState);

  useEffect(() => {
    if (id && !homework) {
      dispatch(loadHomework(+id));
    }
    return () => {
      dispatch(loadHomeworkSuccess(undefined));
    };
  }, []);

  return <NewHomework initialHomework={homework} selectedGroup={selectedTab} />;
};
