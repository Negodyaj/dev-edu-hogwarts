import React, { useState } from 'react';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import { PaymentRow } from './components/PaymentRow';
import './PaymentsPage.scss';

const paymentsData = [
  {
    id: 1,
    userName: 'Антон',
    userSurname: 'Ефременков',
    group: 'Группа 1',
    firstPaymentStatus: 'Оплачено',    
    secondPaymentStatus: 'Оплачено',    
    thirdPaymentStatus: 'Оплачено',
  },
  {
    id: 2,
    userName: 'Борис',
    userSurname: 'Годунов',
    group: 'Группа 1',
    firstPaymentStatus: 'Оплачено',    
    secondPaymentStatus: 'Не оплачено',    
    thirdPaymentStatus: 'Не оплачено',
  },
  {
    id: 3,
    userName: 'Михаил',
    userSurname: 'Гончаров',
    group: 'Группа 1',
    firstPaymentStatus: 'Оплачено',    
    secondPaymentStatus: 'Оплачено',    
    thirdPaymentStatus: 'Не оплачено',
  },
];


const surnameFilterData: FilterItem[] = [
  { id: 1, name: 'Сортировать по фамилии' },
  { id: 2, name: 'Сортировать обратно' },
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
  const [payments, setPayments] = useState (paymentsData)
  const compareSurnames = (item:FilterItem) => {
    
    if(item.id == 1) {
      payments.sort (function(prev,next){  
        if(prev.userSurname < next.userSurname) {
          return -1;
        }
        if(prev.userSurname > next.userSurname) {
          return 1;
        }
        else {
          return 0;
      }})
    }
    else {
      payments.sort (function(prev,next){  
        if(prev.userSurname > next.userSurname) {
          return -1;
        }
        if(prev.userSurname < next.userSurname) {
          return 1;
        }
        else {
          return 0;
      }})
    }
    setPayments([...payments]);  
  };
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
        <thead className="filter-thread">
          <tr>
            <th scope="col" className="name-column">
              <FilterList data={surnameFilterData} callback={compareSurnames} />
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
