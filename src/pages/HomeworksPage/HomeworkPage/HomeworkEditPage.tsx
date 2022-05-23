import { HomeworkCardContent } from '../components/HomeworkCardContent';
import { HomeworkCard } from '../components/HomeworkCard';
import './HomeworkCardPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppState } from '../../../store/store';
import { useEffect } from 'react';
import { BackButton } from '../../../components/BackButton/BackButton';
import { loadHomework } from '../../../actions/homeworks.thunks';
import { Loader } from './Loader';

export const HomeworkEditPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { homework, isLoad } = useSelector((state: AppState) => state.homeworkPageState);

  useEffect(() => {
    if (id && +id !== homework?.id) {
      dispatch(loadHomework(+id));
    }
  }, []);

  return (
    <div className="homework-edit-page">
      <BackButton />
      {!isLoad ? (
        <HomeworkCard>
          <HomeworkCardContent />
        </HomeworkCard>
      ) : (
        <Loader />
      )}
    </div>
  );
};
