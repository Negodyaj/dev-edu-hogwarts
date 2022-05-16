import { HomeworkStatus } from '../../../../models/HomeworkCardData';
import { AnswerResponse } from './Responses/AnswerResponse';

export type HwResultRowProps = {
  data: AnswerResponse;
};

export const HwResultRow = (props: HwResultRowProps) => {
  const getGoal = () => {
    if (
      !props.data.answer ||
      props.data.status === HomeworkStatus.Done ||
      props.data.status === HomeworkStatus.DoneAfterDeadline
    )
      return '';
    else if (
      props.data.status === HomeworkStatus.ToCheck ||
      props.data.status === HomeworkStatus.ToVerifyFixes
    ) {
      return props.data.status;
    }
  };
  const getResult = () => {
    if (
      props.data.status === HomeworkStatus.Done ||
      props.data.status === HomeworkStatus.DoneAfterDeadline
    )
      return props.data.status;
    else return HomeworkStatus.Undone;
  };

  return (
    <div className="table-row">
      <div>{`${props.data.user.lastName} ${props.data.user.firstName}`}</div>
      <div>{getGoal()}</div>
      <div>{getResult()}</div>
      <div>Смотреть</div>
    </div>
  );
};
