import './HomeworkCard.scss';
import { StudentHomeworkStatus } from '../../../models/responses/HomeworksResponse';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import {
  HomeworkProps,
  HomeworkStatus,
} from '../../../models/HomeworkCardData';
import { LinkArrow } from '../../../components/LinkArrow/LinkArrow';

export const HomeworkCard = (props: HomeworkProps) => {
  const { homework, studentHomeworkProgress } = useSelector(
    (state: AppState) => state.homeworkPageState
  );
  const homeworkId = props.data?.id ?? homework?.id;

  return (
    <div
      className={`homework-card-content content-container ${
        props.children ? 'one-card-content' : ''
      }`}
    >
      <span className="task-number">Задание {props.data?.number}</span>
      <div className="homework-card-description">
        <div className="homework-dates">
          <span>Дата выдачи</span>
          <span>{props.data?.startDate ?? homework?.startDate}</span>
        </div>
        <div className="homework-dates">
          <span>Срок сдачи</span>
          <span>{props.data?.endDate ?? homework?.endDate}</span>
        </div>
        <span className="homework-title">
          {props.data?.task.name ?? homework?.task.name}
        </span>
        {props.children ? (
          props.children
        ) : (
          <LinkArrow text="к заданию" to={`homeworks/${homeworkId}`} />
        )}
      </div>
      <span className="task-status">
        {
          HomeworkStatus[
            props.data?.status ??
              studentHomeworkProgress?.status ??
              StudentHomeworkStatus.Undone
          ]
        }
      </span>
    </div>
  );
};
