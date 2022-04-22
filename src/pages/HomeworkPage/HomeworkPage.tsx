import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { wretchHomework } from '../../actions/homework.actions';
import { HomeworkCard } from '../HomeworksPage/components/HomeworkCard';
import { HomeworkCardContent } from '../HomeworksPage/components/HomeworkCardContent';
import { BackButton } from '../../components/LinkArrow/BackButton';

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
    <div className="homework-edit-page">
      <BackButton path={'../homeworks'} />
      <HomeworkCard>
        <HomeworkCardContent />
      </HomeworkCard>
    </div>
  );
};
