import './HomeworkCard.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { StudentHomework } from '../../../models/responses/HomeworksResponse';
import { InputLink } from '../../../components/InputLink/InputLink';
import { baseWretch } from '../../../services/base-wretch.service';
import { postStudentAnswer } from '../../../shared/consts';
import { useDispatch, useSelector } from 'react-redux';
import { editHomework, loadStudentHomework } from '../../../actions/homework.actions';
import React, { useEffect } from 'react';
import { AppState } from '../../../store/store';
import { LinkWithUnderline } from '../../../components/LinkWithUnderline/LinkWithUnderline';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { HomeworkFormData } from '../../../models/HomeworkCardData';
import { editHomeworkStatus } from '../../../actions/homeworks.actions';
import { saveEdit } from '../../../actions/newHomeworkForm.thunk';
import { LoginPageState } from '../../../store/reducers/login.reducer';
import { UserRole } from '../../../shared/enums/UserRole';
import {
  homeworkByIdLink,
  homeworkStudentAnswerEditLink,
  newHomeworkEditLink,
} from '../../../components/MainPanel/Navigation/constants';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledValidationError } from '../../../components/styled/StyledValidationError';

export const HomeworkCardContent = () => {
  const validationSchema = yup.object().shape({
    answer: yup
      .string()
      .matches(/^[a-z]+:\/\//i, 'Введите корректную ссылку')
      .required('Введите ссылку'),
  });

  const method = useForm<HomeworkFormData>({ resolver: yupResolver(validationSchema) });
  const dispatch = useDispatch();
  const { homework, studentHomeworkProgress, isEdit } = useSelector(
    (state: AppState) => state.homeworkPageState
  );
  const { currentRole } = useSelector((state: AppState) => state.loginPageState as LoginPageState);
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
    dispatch(saveEdit(data, studentHomeworkProgress?.id));
  };

  useEffect(() => {
    if (answer && !location.pathname.includes('edit')) navigate(homeworkByIdLink(id));
    else if (
      !answer &&
      !location.pathname.includes('edit') &&
      !location.pathname.includes('new') &&
      currentRole === UserRole.Student
    )
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
      {currentRole === UserRole.Student || location.pathname.includes('check-homework') ? (
        <>
          <span className="homework-description-title">Ссылка на выполненное задание:</span>
          {answer && !isEdit ? (
            <a href={answer} className="homework-github-link" target="_blank">
              Выполненное задание
            </a>
          ) : (
            <FormProvider {...method}>
              <form onSubmit={method.handleSubmit(isEdit ? onSaveEdit : onSubmit)}>
                <InputLink
                  placeholder={'Ссылка на GitHub или архив'}
                  inputName="answer"
                  inputValue={answer}
                />
                <StyledValidationError>
                  {method.formState.errors.answer?.message}
                </StyledValidationError>
              </form>
            </FormProvider>
          )}
          {answer && !isEdit && (
            <LinkWithUnderline
              text="Редактировать"
              path={homeworkStudentAnswerEditLink(homework?.id)}
            />
          )}
          <span className="homework-description-title">Результат выполненного задания:</span>
        </>
      ) : (
        currentRole === UserRole.Teacher && (
          <LinkWithUnderline text="Редактировать" path={newHomeworkEditLink(homework?.id)} />
        )
      )}
    </>
  );
};
