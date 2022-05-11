import { HomeworkCardContent } from '../components/HomeworkCardContent';
import { HomeworkCard } from '../components/HomeworkCard';
import { BackButton } from '../../../components/BackButton/BackButton';
import './HomeworkCardPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppState } from '../../../store/store';
import { useEffect } from 'react';
import { baseWretch } from '../../../services/base-wretch.service';
import { getHomeworkById, getStudentAnswerByTaskId } from '../../../shared/consts';
import { loadHomework, loadStudentHomework } from '../../../actions/homework.actions';
import { Homework, StudentHomework } from '../../../models/responses/HomeworksResponse';

export const HomeworkEditPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { homework } = useSelector((state: AppState) => state.homeworkPageState);

  useEffect(() => {
    if (id && +id !== homework?.id) {
      baseWretch()
        .url(getHomeworkById(+id))
        .get()
        .json((response) => {
          dispatch(loadHomework(response as Homework));
          baseWretch()
            .url(getStudentAnswerByTaskId((response as Homework).task.id))
            .get()
            .json((studentHomework) => {
              dispatch(loadStudentHomework(studentHomework as StudentHomework));
            });
        });
    }
  }, []);

  return (
    <div className="homework-edit-page">
      <BackButton />
      <HomeworkCard>
        <HomeworkCardContent />
      </HomeworkCard>
    </div>
  );
};
