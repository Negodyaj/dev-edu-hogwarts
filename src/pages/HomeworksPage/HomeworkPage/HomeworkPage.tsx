import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { clearHomework } from '../../../actions/homework.actions';
import { HomeworkCard } from '../components/HomeworkCard';
import { HomeworkCardContent } from '../components/HomeworkCardContent';
import { AppState } from '../../../store/store';
import { loadHomework } from '../../../actions/homeworks.thunks';
import { Loader } from './Loader';
import { BackButton } from '../../../components/BackButton/BackButton';
import { HomeworksResults } from '../components/HomeworksResults/HomeworksResults';
import { LoginPageState } from '../../../store/reducers/login.reducer';
import { UserRole } from '../../../shared/enums/UserRole';

export const HomeworkPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { homework, isLoad } = useSelector((state: AppState) => state.homeworkPageState);
  const { currentRole } = useSelector((state: AppState) => state.loginPageState as LoginPageState);

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
      {currentRole == UserRole.Teacher && <HomeworksResults />}
    </div>
  );
};
