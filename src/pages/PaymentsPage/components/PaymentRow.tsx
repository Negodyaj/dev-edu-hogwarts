export type PaymentRowProps = {
  data: PaymentRowModel;
};

export type PaymentRowModel = {
  id: number;
  userName: string;
  userSurname: string;
  group: string;
  groupId: number;
  firstPaymentStatus?: string | null;
  secondPaymentStatus?: string | null;
  thirdPaymentStatus?: string | null;
};

export const PaymentRow = (props: PaymentRowProps) => {
  const paymentRow = props.data;
  return (
    <tr>
      <td>
        {paymentRow.userName} {paymentRow.userSurname}
      </td>
      <td>{paymentRow.group}</td>
      <td>{paymentRow.firstPaymentStatus}</td>
      <td>{paymentRow.secondPaymentStatus}</td>
      <td>{paymentRow.thirdPaymentStatus}</td>
    </tr>
  );
};
