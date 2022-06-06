import { HomeworkCardContent } from '../components/HomeworkCardContent';
import { HomeworkCard } from '../components/HomeworkCard';
import './HomeworkCardPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppState } from '../../../store/store';
import { useEffect } from 'react';
import { BackButton } from '../../../components/BackButton/BackButton';
import { loadHomework, loadTask } from '../../../actions/homeworks.thunks';
import { Loader } from './Loader';
import { UserRole } from '../../../shared/enums/UserRole';
import { LoginPageState } from '../../../store/reducers/login.reducer';

export const HomeworkEditPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { homework, isLoad, task } = useSelector((state: AppState) => state.homeworkPageState);
  const { currentRole } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  useEffect(() => {
    if (id && +id !== homework?.id && currentRole != UserRole.Methodist) {
      dispatch(loadHomework(+id));
    } else if (id && +id !== task?.id && currentRole == UserRole.Methodist) {
      dispatch(loadTask(+id));
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
