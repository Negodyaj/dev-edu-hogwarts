import './HomeworkCard.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { StudentHomework } from '../../../models/responses/HomeworksResponse';
import { InputLink } from '../../../components/InputLink/InputLink';
import { baseWretch } from '../../../services/base-wretch.service';
import { studentHomeworkById, postStudentAnswer } from '../../../shared/consts';
import { useDispatch, useSelector } from 'react-redux';
import { editHomework, loadAnswer, loadStudentHomework } from '../../../actions/homework.actions';
import { useEffect } from 'react';
import { AppState } from '../../../store/store';
import { LinkWithUnderline } from '../../../components/LinkWithUnderline/LinkWithUnderline';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { HomeworkFormData } from '../../../models/HomeworkCardData';
import { editHomeworkStatus } from '../../../actions/homeworks.actions';

export const HomeworkCardContent = () => {
  // debugger;
  const method = useForm<HomeworkFormData>();
  const dispatch = useDispatch();
  const { homework, studentHomeworkProgress, isEdit } = useSelector(
    (state: AppState) => state.homeworkPageState
  );
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const answer = studentHomeworkProgress?.answer;

  const onSubmit = (data: HomeworkFormData) => {
    const dateToPost = {
      ...data,
      homeworkId: homework?.id,
    };
    if (homework?.id) {
      baseWretch()
        .url(postStudentAnswer(homework?.id))
        .post(dateToPost)
        .json((res) => {
          const studentHomework = res as StudentHomework;
          dispatch(loadStudentHomework(studentHomework));
          dispatch(editHomeworkStatus(studentHomework));
        });
    }
  };

  const onSaveEdit = (data: HomeworkFormData) => {
    const dateToPost = {
      ...data,
      id: studentHomeworkProgress?.id,
    };
    if (studentHomeworkProgress?.id) {
      baseWretch()
        .url(studentHomeworkById(studentHomeworkProgress?.id))
        .put(dateToPost)
        .json((res) => {
          const studentHomework = res as StudentHomework;
          dispatch(loadStudentHomework(studentHomework));
          dispatch(loadAnswer(studentHomework.answer));
        });
    }
  };

  useEffect(() => {
    if (answer && !location.pathname.includes('edit')) navigate(`/homeworks/${id}`);
    else if (!answer && !location.pathname.includes('edit') && !location.pathname.includes('new'))
      navigate(`new`);
  }, [answer]);

  useEffect(() => {
    const isEditMode = location.pathname.includes('edit');
    dispatch(editHomework(isEditMode));
  }, [location]);

  return (
    <>
      <span className="homework-description-title">Описание задания</span>
      {homework?.task.description.split('\n').map((par, index) => (
        <p className="homework-card__description" key={index}>
          {par}
        </p>
      ))}
      {homework?.task.links && <span className="homework-description-title">Полезные ссылки</span>}
      {homework?.task.links.split(' [link] ').map((link, index) => (
        <a href={link} className="homework-useful-link" target="_blank" key={index}>
          {link}
        </a>
      ))}
      <span className="homework-description-title">Ссылка на выполненное задание:</span>
      {answer && !isEdit ? (
        <a href={answer} className="homework-github-link" target="_blank">
          Ссылка на GitHub
        </a>
      ) : (
        <FormProvider {...method}>
          <form onSubmit={method.handleSubmit(isEdit ? onSaveEdit : onSubmit)}>
            <InputLink
              placeholder={'Ссылка на GitHub или архив'}
              inputName="answer"
              inputValue={answer}
            />
          </form>
        </FormProvider>
      )}
      {answer && !isEdit && (
        <LinkWithUnderline text="Редактировать" path={`homeworks/${homework?.id}/edit`} />
      )}
      <span className="homework-description-title">Результат выполненного задания:</span>
    </>
  );
};
