import './HomeworkCard.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { TaskProps } from '../../../models/HomeworkCardData';
import { LinkArrow } from '../../../components/LinkArrow/LinkArrow';

export const TaskCard = (props: TaskProps) => {
  const { task } = useSelector((state: AppState) => state.homeworkPageState);
  const taskId = props.data?.id ?? task?.id;

  return (
    <div
      className={`homework-card-content content-container ${
        props.children ? 'one-card-content' : ''
      }`}
    >
      <span className="task-number">Задание {props.data?.number}</span>
      <div className="homework-card-description">
        <span className="homework-title">{props.data?.name ?? task?.name}</span>
        {props.children ? (
          props.children
        ) : (
          <LinkArrow text="к заданию" to={`homeworks/${taskId}`} />
        )}
      </div>
    </div>
  );
};
