import { LinkArrow } from '../../../../components/LinkArrow/LinkArrow';
import { AnswerResponse } from '../../../../models/responses/AnswerResponse';
import { getTableData } from './ResultsHelper';

export type HwResultRowProps = {
  data: AnswerResponse;
};

export const HwResultRow = (props: HwResultRowProps) => {
  const tableData = getTableData(props.data.status);
  return (
    <div className="table-row">
      <div>{`${props.data.user.lastName} ${props.data.user.firstName}`}</div>
      <div>{tableData?.goal}</div>
      <div>{tableData?.result}</div>
      <LinkArrow text="смотреть" to={`check-homework/${props.data.id}`} />
    </div>
  );
};
