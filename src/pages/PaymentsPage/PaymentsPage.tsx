import React from 'react';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import { PaymentRow } from './components/PaymentRow';
import './PaymentsPage.scss';

const payments = [
  {
    id: 1,
    user: 'Антон Ефременков',
    group: 'Группа 1',
    firstPaymentStatus: 'Оплачено',    
    secondPaymentStatus: 'Оплачено',    
    thirdPaymentStatus: 'Оплачено',
  },
  {
    id: 2,
    user: 'Борис Годунов',
    group: 'Группа 1',
    firstPaymentStatus: 'Оплачено',    
    secondPaymentStatus: 'Не оплачено',    
    thirdPaymentStatus: 'Не оплачено',
  },
  {
    id: 3,
    user: 'Михаил Гончаров',   
    group: 'Группа 1',
    firstPaymentStatus: 'Оплачено',    
    secondPaymentStatus: 'Оплачено',    
    thirdPaymentStatus: 'Не оплачено',
  },
];


const surnameFilterData: FilterItem[] = [
  { id: 1, name: 'Сортировать по фамилии' },
  { id: 2, name: 'Сортировать по фамилии' },
];

const groupFilterData: FilterItem[] = [
  { id: 1, name: 'Сортировать по группе' },
  { id: 2, name: 'Сортировать по группе' },
];

const paymentStatusFilterData: FilterItem[] = [
  { id: 1, name: 'Оплачено' },
  { id: 2, name: 'Не оплачено' },
];

export const PaymentsPage = () => {
  return (
    <div className="content-container">
      <table className="payment-table">
        <thead>
          <tr>
            <th scope="col">ФИО студента</th>
            <th scope="col">Группа</th>
            <th scope="col">1 оплата</th>
            <th scope="col">2 оплата</th>
            <th scope="col">3 оплата</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th scope="col">
              <FilterList data={surnameFilterData} />
            </th>
            <th scope="col">
              <FilterList data={groupFilterData} />
            </th>
            <th scope="col">
              <FilterList data={paymentStatusFilterData} />
            </th>
            <th scope="col">
              <FilterList data={paymentStatusFilterData} />
            </th>
            <th scope="col">
              <FilterList data={paymentStatusFilterData} />
            </th>
          </tr>
        </thead>
        <tbody> 
          {
            payments.map((item) => (
              <PaymentRow
                data ={item}                
              />
            ))
          }
          
        </tbody>
      </table>
    </div>
  );
};
