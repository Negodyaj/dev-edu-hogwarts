import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loadHomework, loadStudentHomework } from '../../../actions/homework.actions';
import { HomeworkCard } from '../components/HomeworkCard';
import { HomeworkCardContent } from '../components/HomeworkCardContent';
import { BackButton } from '../../../components/LinkArrow/BackButton';
import { baseWretch } from '../../../services/base-wretch.service';
import { getHomeworkById, getStudentAnswerByTaskId } from '../../../shared/consts';
import { Homework, StudentHomework } from '../../../models/responses/HomeworksResponse';
import { AppState } from '../../../store/store';

export const HomeworkPage = () => {
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
      <BackButton path={'../homeworks'} />
      <HomeworkCard>
        <HomeworkCardContent />
      </HomeworkCard>
    </div>
  );
};
