import './HomeworkCard.scss';
import { StudentHomeworkStatus } from '../../../models/responses/HomeworksResponse';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { HomeworkProps, HomeworkStatus } from '../../../models/HomeworkCardData';
import { LinkArrow } from '../../../components/LinkArrow/LinkArrow';

export const HomeworkCard = (props: HomeworkProps) => {
  const { homework, studentHomeworkProgress } = useSelector(
    (state: AppState) => state.homeworkPageState
  );
  const { homeworks } = useSelector((state: AppState) => state.homeworksPageState);
  const homeworkId = props.homeworkData?.id ?? homework?.id;
  return (
    <div
      className={`homework-card-content content-container ${
        props.children ? 'one-card-content' : ''
      }`}
    >
      <span className="task-number">
        Задание{' '}
        {homeworks && homeworks?.length > 0 ? props.homeworkData?.number : props.taskData?.id}
      </span>
      <div className="homework-card-description">
        <div className="homework-dates">
          {homeworks && homeworks?.length > 0 ? <span>Дата выдачи</span> : ''}
          <span>
            {homeworks && homeworks?.length > 0
              ? props.homeworkData?.startDate ?? homework?.startDate
              : ''}
          </span>
        </div>
        <div className="homework-dates">
          {homeworks && homeworks?.length > 0 ? <span>Cрок сдачи</span> : ''}
          <span>
            {homeworks && homeworks?.length > 0
              ? props.homeworkData?.endDate ?? homework?.endDate
              : ''}
          </span>
        </div>
        <span className="homework-title">
          {homeworks && homeworks?.length > 0
            ? props.homeworkData?.task.name ?? homework?.task.name
            : props.taskData?.name}
        </span>
        {props.children ? (
          props.children
        ) : (
          <LinkArrow text="к заданию" to={`homeworks/${homeworkId}`} />
        )}
      </div>
      {homeworks && homeworks?.length > 0 ? (
        <span className="task-status">
          {
            HomeworkStatus[
              props.homeworkData?.status ??
                studentHomeworkProgress?.status ??
                StudentHomeworkStatus.Undone
            ]
          }
        </span>
      ) : (
        ''
      )}
    </div>
  );
};
