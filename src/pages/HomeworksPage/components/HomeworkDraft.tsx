import './HomeworkCard.scss';
import { LinkArrow } from '../../../components/LinkArrow/LinkArrow';
import { Task } from '../../../models/responses/HomeworksResponse';

type DraftCardProps = {
  data: Task;
};

export const HomeworkDraft = ({ data }: DraftCardProps) => {
  return (
    <div className="homework-card-content homework-draft content-container">
      <div className="homework-card-description">
        <span className="homework-title">{data.name}</span>
        <LinkArrow text="редактировать" to={`new-homework/${data.id}`} />
      </div>
      <span className="task-status">{data.isRequired ? 'Обязательная' : 'Не обязательная'}</span>
    </div>
  );
};
