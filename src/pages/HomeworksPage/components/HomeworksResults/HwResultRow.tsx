export type HwResultRow = {
  id: number;
  FIO: string;
  statusToCheck?: string;
  status?: string;
}

export type HwResultRowProps = {
  data: HwResultRow;
}

export const HwResultRow = (props: HwResultRowProps) => {
  return (
    <tr key={props.data.id}>
      <td>{props.data.FIO}</td>
      <td>{props.data.statusToCheck}</td>
      <td>{props.data.status}</td>
      <td></td>
    </tr>
  );
};
