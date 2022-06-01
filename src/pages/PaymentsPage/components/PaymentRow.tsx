export type PaymentRowProps = {
  data: PaymentRowModel;
};

export type PaymentRowModel = {
  id: number;
  firstName: string;
  lastName: string;
  groupId: number;
  firstPaymentStatus?: string | null;
  secondPaymentStatus?: string | null;
  thirdPaymentStatus?: string | null;
  fourthPaymentStatus: string | null;
};

export const PaymentRow = (props: PaymentRowProps) => {
  const paymentRow = props.data;
  return (
    // <tr>
    //   <td>
    //     {paymentRow.userName} {paymentRow.userSurname}
    //   </td>
    //   <td>{paymentRow.firstPaymentStatus}</td>
    //   <td>{paymentRow.secondPaymentStatus}</td>
    //   <td>{paymentRow.thirdPaymentStatus}</td>
    //   <td>{paymentRow.fourthPaymentStatus}</td>
    // </tr>
    <div className="group-table-row-wrapper">
      <div className="payments-page-grid group-table-row">
        <span>
          {paymentRow.firstName} {paymentRow.lastName}
        </span>
        <span className="payment-cell">{paymentRow.firstPaymentStatus}</span>
        <span className="payment-cell">{paymentRow.secondPaymentStatus}</span>
        <span className="payment-cell">{paymentRow.thirdPaymentStatus}</span>
        <span className="payment-cell">{paymentRow.fourthPaymentStatus}</span>
      </div>
    </div>
  );
};
