export type PaymentRowProps = {
  data: PaymentRowModel;
};

export type PaymentRowModel = {
  id: number;
  user: string;
  group: string;
  firstPaymentStatus: string;
  secondPaymentStatus: string;
  thirdPaymentStatus: string;
};

export const PaymentRow = (props: PaymentRowProps) => {
  const paymentRow = props.data;
  return (
    <tr>
      <td>{paymentRow.user}</td>
      <td>{paymentRow.group}</td>
      <td>{paymentRow.firstPaymentStatus}</td>
      <td>{paymentRow.secondPaymentStatus}</td>
      <td>{paymentRow.thirdPaymentStatus}</td>
    </tr>
  );
};
