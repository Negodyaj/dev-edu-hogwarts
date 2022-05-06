export type HwResultRow = {
  FIO: string;
  statusToCheck: string;
  status: string;
}

export const HwResultRow = (props: HwResultRow) => {
  return (
    <tr>
      <td>{props.FIO}</td>
      <td>{props.statusToCheck}</td>
      <td>{props.status}</td>
      <td></td>
    </tr>
  );
};
