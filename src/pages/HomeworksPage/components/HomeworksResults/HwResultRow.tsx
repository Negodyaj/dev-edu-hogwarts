import { LinkArrow } from '../../../../components/LinkArrow/LinkArrow';
import { HomeworkStatus } from '../../../../models/HomeworkCardData';
import { AnswerResponse } from './Responses/AnswerResponse';

export type HwResultRowProps = {
  data: AnswerResponse;
};

const getGoal = (status: HomeworkStatus) => {
  if (status.toString() === 'ToCheck') return HomeworkStatus.ToCheck;
  else if (status.toString() === 'ToVerifyFixes') return HomeworkStatus.ToVerifyFixes;
  else return '';
};

const getResult = (status: HomeworkStatus) => {
  if (status.toString() === 'Done') return HomeworkStatus.Done;
  if (status.toString() === 'DoneAfterDeadline') return HomeworkStatus.DoneAfterDeadline;
  else return HomeworkStatus.Undone;
};

export const HwResultRow = (props: HwResultRowProps) => {
  const goal = getGoal(props.data.status);
  const result = getResult(props.data.status);

  return (
    <div className="table-row">
      <div>{`${props.data.user.lastName} ${props.data.user.firstName}`}</div>
      <div>{goal}</div>
      <div>{result}</div>
      <LinkArrow text="смотреть" to={`check-homework/${props.data.id}`} />
    </div>
  );
};
