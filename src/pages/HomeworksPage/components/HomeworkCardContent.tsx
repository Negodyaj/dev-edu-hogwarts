import './HomeworkCard.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { StudentHomework } from '../../../models/responses/HomeworksResponse';
import { InputLink } from '../../../components/InputLink/InputLink';
import { baseWretch } from '../../../services/base-wretch.service';
import { postStudentAnswer } from '../../../shared/consts';
import { useDispatch, useSelector } from 'react-redux';
import { editHomework, loadStudentHomework } from '../../../actions/homework.actions';
import { useEffect } from 'react';
import { AppState } from '../../../store/store';
import { LinkWithUnderline } from '../../../components/LinkWithUnderline/LinkWithUnderline';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { HomeworkFormData } from '../../../models/HomeworkCardData';
import { editHomeworkStatus } from '../../../actions/homeworks.actions';
import { saveEdit } from '../../../actions/newHomeworkForm.thunk';
import { LoginPageState } from '../../../store/reducers/login.reducer';
import { UserRole } from '../../../shared/enums/UserRole';
import {
  checkHomeworkLink,
  homeworkByIdLink,
  homeworkStudentAnswerEditLink,
  newHomeworkEditLink,
} from '../../../components/MainPanel/Navigation/constants';

export const HomeworkCardContent = () => {
  // debugger;
  const method = useForm<HomeworkFormData>();
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
    else if (!answer && !location.pathname.includes('edit') && !location.pathname.includes('new'))
      navigate(`new`);
  }, [answer]);

  useEffect(() => {
    const isEditMode = location.pathname.includes('edit');
    dispatch(editHomework(isEditMode));
  }, [location]);

  return (
    <>
      <span className="homework-description-title">???????????????? ??????????????</span>
      {homework?.task.description.split('\n').map((par, index) => (
        <p className="homework-card__description" key={index}>
          {par}
        </p>
      ))}
      {homework?.task.links && <span className="homework-description-title">???????????????? ????????????</span>}
      {homework?.task.links.split(' [link] ').map((link, index) => (
        <a href={link} className="homework-useful-link" target="_blank" key={index}>
          {link}
        </a>
      ))}
      {currentRole === UserRole.Student || location.pathname.includes('check-homework') ? (
        <>
          <span className="homework-description-title">???????????? ???? ?????????????????????? ??????????????:</span>
          {answer && !isEdit ? (
            <a href={answer} className="homework-github-link" target="_blank">
              ?????????????????????? ??????????????
            </a>
          ) : (
            <FormProvider {...method}>
              <form onSubmit={method.handleSubmit(isEdit ? onSaveEdit : onSubmit)}>
                <InputLink
                  placeholder={'???????????? ???? GitHub ?????? ??????????'}
                  inputName="answer"
                  inputValue={answer}
                />
              </form>
            </FormProvider>
          )}
          {answer && !isEdit && (
            <LinkWithUnderline
              text="??????????????????????????"
              path={homeworkStudentAnswerEditLink(homework?.id)}
            />
          )}
          <span className="homework-description-title">?????????????????? ???????????????????????? ??????????????:</span>
        </>
      ) : (
        currentRole === UserRole.Teacher &&
        !location.pathname.includes(checkHomeworkLink) && (
          <LinkWithUnderline text="??????????????????????????" path={newHomeworkEditLink(homework?.id)} />
        )
      )}
    </>
  );
};
