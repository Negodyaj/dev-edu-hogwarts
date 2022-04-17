import { HomeworkCard } from '../HomeworksPage/components/HomeworkCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { wretchHomework } from '../../actions/homework.actions';
// import { Loader } from './Loader';
// import { getIdFromToken, getToken } from '../../services/auth.service';

export const HomeworkPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentUser } = useSelector(
    (state: AppState) => state.loginPageState
  );

  useEffect(() => {
    const userId = currentUser?.id;
    if (userId) dispatch(wretchHomework(Number(id), userId));
  }, [currentUser]);

  return (
    <div style={{ marginTop: 50 }}>
      <HomeworkCard oneCard={true} />
    </div>
  );
};
