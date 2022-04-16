import './HomeworkCard.scss';
import { LinkArrow } from '../../../components/LinkArrow/LinkArrow';

export type HomeworkProps = {
  data: HomeworkData;
};

export type HomeworkData = {
  id: number;
  taskNumber: number;
  title: string;
  dateBeginning: string;
  dateEnd: string;
  status: number;
  elseData: string;
};

// Не знала лучше enum или array,
// или вообще по-другому

enum HomeworkStatus {
  'Сдано',
  'Не сделано',
  'В проверке',
  'Исправить',
  'Сдано с опозданием',
}

export const HomeworkCard = (props: HomeworkProps) => {
  const homework = props.data;

  return (
    <div className="homework-card-content content-container">
      <span className="task-number">Задание {homework.taskNumber}</span>
      <div className="homework-card-description">
        <div className="homework-dates">
          <span>Дата выдачи</span>
          <span>{homework.dateBeginning}</span>
        </div>
        <div className="homework-dates">
          <span>Срок сдачи</span>
          <span>{homework.dateEnd}</span>
        </div>
        <span className="homework-title">{homework.title}</span>
        <LinkArrow text="к заданию" to={`homeworks/${homework.id}`} />
      </div>
      <span className="task-status">{HomeworkStatus[homework.status]}</span>
    </div>
  );
};
