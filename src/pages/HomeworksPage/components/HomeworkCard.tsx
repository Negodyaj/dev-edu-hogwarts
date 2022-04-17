import './HomeworkCard.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { LinkArrow } from '../../../components/LinkArrow/LinkArrow';
import {
  Homework,
  StudentHomework,
  StudentHomeworkStatus,
} from '../../../models/responses/HomeworksResponse';
import { InputLink } from '../../../components/InputLink/InputLink';
import { baseWretch } from '../../../services/base-wretch.service';
import { studentHomeworkById, postStudentAnswer } from '../../../shared/consts';
import { useDispatch, useSelector } from 'react-redux';
import {
  editHomework,
  loadAnswer,
  loadStudentHomework,
} from '../../../actions/homework.actions';
import { useEffect } from 'react';
import { AppState } from '../../../store/store';
import { LinkWithUnderline } from '../../../components/LinkWithUnderline/LinkWithUnderline';
import { useLocation } from 'react-router-dom';

export type HomeworkProps = {
  data?: Homework;
  dataProgress?: StudentHomework;
  taskNumber?: number;
  oneCard?: boolean;
  edit?: boolean;
};

export type HomeworkFormData = {
  answer: string;
};

enum HomeworkStatus {
  NotDone = 'Не сделано',
  Unchecked = 'Не проверено',
  // "В проверке",
  // "Исправить",
  // "Сдано с опозданием"
}

export const HomeworkCard = (props: HomeworkProps) => {
  const method = useForm<HomeworkFormData>();
  const dispatch = useDispatch();
  const { homework, studentHomeworkProgress, isEdit, answer } = useSelector(
    (state: AppState) => state.homeworkPageState
  );
  const location = useLocation();
  console.log(answer);

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
          dispatch(loadAnswer(studentHomework.answer));
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
    const edit = location.pathname.split('/');
    if (edit[edit.length - 1] === 'edit') dispatch(editHomework(true));
    else dispatch(editHomework(false));
  }, [location]);

  return (
    <div
      className={`homework-card-content content-container ${
        props.oneCard ? 'one-card-content' : ''
      }`}
    >
      <span className="task-number">Задание {props.taskNumber}</span>
      <div className="homework-card-description">
        <div className="homework-dates">
          <span>Дата выдачи</span>
          <span>{homework?.startDate}</span>
        </div>
        <div className="homework-dates">
          <span>Срок сдачи</span>
          <span>{homework?.endDate}</span>
        </div>
        <span className="homework-title">{homework?.task.name}</span>
        {props.oneCard && (
          <>
            <span className="homework-description-title">Описание задания</span>
            {homework?.task.description.split('\n').map((par, index) => (
              <p key={index}>{par}</p>
            ))}
            {homework?.task.links && (
              <span className="homework-description-title">
                Полезные ссылки
              </span>
            )}
            {homework?.task.links.split(' [link] ').map((par, index) => (
              <a
                href={par}
                className="homework-useful-link"
                target="_blank"
                key={index}
              >
                {par}
              </a>
            ))}
            <span className="homework-description-title">
              Ссылка на выполненное задание:
            </span>
            {answer && !isEdit ? (
              <a href={answer} className="homework-github-link" target="_blank">
                Ссылка на GitHub
              </a>
            ) : (
              <FormProvider {...method}>
                <form
                  onSubmit={method.handleSubmit(isEdit ? onSaveEdit : onSubmit)}
                >
                  <InputLink
                    placeholder={'Ссылка на GitHub или архив'}
                    inputName="answer"
                    inputValue={answer}
                  />
                </form>
              </FormProvider>
            )}
            <span className="homework-description-title">
              Результат выполненного задания:
            </span>
          </>
        )}
        {!props.oneCard && (
          <LinkArrow
            back={false}
            text="к заданию"
            to={`homeworks/${homework?.id}`}
          />
        )}
      </div>
      {answer && !isEdit && (
        <LinkWithUnderline
          text="Редактировать"
          path={`homeworks/${homework?.id}/edit`}
        />
      )}
      <span className="task-status">
        {
          HomeworkStatus[
            studentHomeworkProgress?.studentHomeworkStatus ??
              StudentHomeworkStatus.NotDone
          ]
        }
      </span>
    </div>
  );
};
