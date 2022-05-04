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
    group: 'Группа 2',
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
  { id: 1, name: 'Показать все' },
  { id: 2, name: 'Группа 1' },
  { id: 3, name: 'Группа 2' },
];

const paymentStatusFilterData: FilterItem[] = [
  { id: 1, name: 'Показать все'},
  { id: 2, name: 'Оплачено' },
  { id: 3, name: 'Не оплачено' },
];

export const PaymentsPage = () => {
  const [payments, setPayments] = useState(paymentsData);
  const [filtredList, setFiltredList] = useState(paymentsData);
  const applySurnameFilter = (item:FilterItem) => {
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
  const applyGroupFilter = (item: FilterItem) => {
    if(item.id === 3) {
      setFiltredList(payments.filter(studentsList => studentsList.group === 'Группа 2'))
    }
    if(item.id === 2) {
      setFiltredList(payments.filter(studentsList => studentsList.group === 'Группа 1'))
    }
    if(item.id === 1) {
      setFiltredList(paymentsData);
    }
  };
  const applyFirstPaymentStatusFilter = (item: FilterItem) => {
    if(item.id === 2) {
      setFiltredList(payments.filter(studentsList => studentsList.firstPaymentStatus === 'Оплачено'))
    }
    if(item.id === 3) {
      setFiltredList(payments.filter(studentsList => studentsList.firstPaymentStatus === 'Не оплачено'))
    }
    if(item.id === 1) {
      setFiltredList(paymentsData);
    }
  };
  const applySecondPaymentStatusFilter = (item: FilterItem) => {
    if(item.id === 2) {
      setFiltredList(payments.filter(studentsList => studentsList.secondPaymentStatus === 'Оплачено'))
    }
    if(item.id === 3) {
      setFiltredList(payments.filter(studentsList => studentsList.secondPaymentStatus === 'Не оплачено'))
    }
    if(item.id === 1) {
      setFiltredList(paymentsData);
    }
  };
  const applyThirdPaymentStatusFilter = (item: FilterItem) => {
    if(item.id === 2) {
      setFiltredList(payments.filter(studentsList => studentsList.thirdPaymentStatus === 'Оплачено'))
    }
    if(item.id === 3) {
      setFiltredList(payments.filter(studentsList => studentsList.thirdPaymentStatus === 'Не оплачено'))
    }
    if(item.id === 1) {
      setFiltredList(paymentsData);
    }
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
              <FilterList data={surnameFilterData} callback={applySurnameFilter} />
            </th>
            <th scope="col">
              <FilterList data={groupFilterData} callback={applyGroupFilter} />
            </th>
            <th scope="col">
              <FilterList data={paymentStatusFilterData} callback={applyFirstPaymentStatusFilter} />
            </th>
            <th scope="col">
              <FilterList data={paymentStatusFilterData} callback={applySecondPaymentStatusFilter} />
            </th>
            <th scope="col">
              <FilterList data={paymentStatusFilterData} callback={applyThirdPaymentStatusFilter} />
            </th>
          </tr>
        </thead>
        <tbody> 
          {
            filtredList.map((item) => (
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
