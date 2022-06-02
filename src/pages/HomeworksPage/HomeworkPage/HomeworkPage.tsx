import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { clearHomework } from '../../../actions/homework.actions';
import { HomeworkCard } from '../components/HomeworkCard';
import { HomeworkCardContent } from '../components/HomeworkCardContent';
import { AppState } from '../../../store/store';
import { loadHomework, loadTask } from '../../../actions/homeworks.thunks';
import { Loader } from './Loader';
import { BackButton } from '../../../components/BackButton/BackButton';
import { HomeworksResults } from '../components/HomeworksResults/HomeworksResults';
import { LoginPageState } from '../../../store/reducers/login.reducer';
import { UserRole } from '../../../shared/enums/UserRole';
import { TaskCardContent } from '../components/TaskCardContent';
import { TaskCard } from '../components/TaskCard';

export const HomeworkPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const { tasks } = useSelector((state: AppState) => state.homeworksPageState);
  const { homework, isLoad, task } = useSelector((state: AppState) => state.homeworkPageState);
  const { currentRole } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
  useEffect(() => {
    if (id && +id !== homework?.id && currentRole != UserRole.Methodist) {
      dispatch(loadHomework(+id));
      console.log(task);
    } else if (id && +id !== task?.id && currentRole == UserRole.Methodist) {
      dispatch(loadTask(+id));
    }
  }, []);
  return (
    <div className="homework-edit-page">
      <BackButton path={'../homeworks'} callback={() => dispatch(clearHomework())} />
      {!isLoad && currentRole == UserRole.Methodist ? (
        <TaskCard>
          <TaskCardContent />
        </TaskCard>
      ) : !isLoad && currentRole != UserRole.Methodist ? (
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
