import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { clearHomework } from '../../../actions/homework.actions';
import { HomeworkCard } from '../components/HomeworkCard';
import { HomeworkCardContent } from '../components/HomeworkCardContent';
import { AppState } from '../../../store/store';
import { BackButton } from '../../../components/BackButton/BackButton';
import { loadHomework } from '../../../actions/homeworks.thunks';
import { Loader } from './Loader';

export const HomeworkPage = () => {
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
      <BackButton path={'../homeworks'} callback={() => dispatch(clearHomework())} />
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
