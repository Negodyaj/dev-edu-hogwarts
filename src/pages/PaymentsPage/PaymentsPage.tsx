import React, { useEffect, useState } from 'react';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import { PaymentRow } from './components/PaymentRow';
import './PaymentsPage.scss';

const paymentsData = [
  {
    id: 1,
    firstName: 'Антон',
    lastName: 'Ефременков',
    group: 'Группа 1',
    groupId: 2,
    firstPaymentStatus: '01.01.2022',
    secondPaymentStatus: '01.02.2022',
    thirdPaymentStatus: '01.03.2022',
    fourthPaymentStatus: null,
  },
  {
    id: 2,
    firstName: 'Борис',
    lastName: 'Годунов',
    group: 'Группа 1',
    groupId: 2,
    firstPaymentStatus: '05.01.2022',
    secondPaymentStatus: null,
    thirdPaymentStatus: null,
    fourthPaymentStatus: '05.05.2022',
  },
  {
    id: 3,
    firstName: 'Михаил',
    lastName: 'Гончаров',
    group: 'Группа 2',
    groupId: 3,
    firstPaymentStatus: '03.01.2022',
    secondPaymentStatus: '06.02.2022',
    thirdPaymentStatus: null,
    fourthPaymentStatus: null,
  },
  {
    id: 4,
    firstName: 'Булат',
    lastName: 'Нуриахметов',
    group: 'Группа 2',
    groupId: 3,
    firstPaymentStatus: '03.01.2022',
    secondPaymentStatus: '06.02.2022',
    thirdPaymentStatus: '06.04.2022',
    fourthPaymentStatus: '05.05.2022',
  },
  {
    id: 5,
    firstName: 'Азат',
    lastName: 'Юнусов',
    group: 'Группа 2',
    groupId: 3,
    firstPaymentStatus: null,
    secondPaymentStatus: null,
    thirdPaymentStatus: null,
    fourthPaymentStatus: null,
  },
  {
    id: 6,
    firstName: 'Камилла',
    lastName: 'Ганеева',
    group: 'Группа 2',
    groupId: 3,
    firstPaymentStatus: null,
    secondPaymentStatus: '06.02.2022',
    thirdPaymentStatus: null,
    fourthPaymentStatus: '05.05.2022',
  },
];

const surnameFilterData: FilterItem[] = [
  { id: 1, name: 'Сортировать по фамилии' },
  { id: 2, name: 'Сортировать обратно' },
];

const groupFilterData: FilterItem[] = [
  { id: 0, name: 'Показать все' },
  { id: 2, name: 'Группа 1' },
  { id: 3, name: 'Группа 2' },
];

const paymentStatusFilterData: FilterItem[] = [
  { id: 1, name: 'Показать все' },
  { id: 2, name: 'Оплачено' },
  { id: 3, name: 'Не оплачено' },
];

export const PaymentsPage = () => {
  const [payments] = useState(paymentsData);
  const [filterSurnameValue, setFilterSurnameValue] = useState(1);
  const [filterGroupValue, setFilterGroupValue] = useState(0);
  const [firstPaymentStatusFilterValue, setFirstPaymentStatusFilterValue] = useState(1);
  const [secondPaymentStatusFilterValue, setSecondPaymentStatusFilterValue] = useState(1);
  const [thirdPaymentStatusFilterValue, setThirdPaymentStatusFilterValue] = useState(1);
  const [fourthPaymentStatusFilterValue, setFourthPaymentStatusFilterValue] = useState(1);
  const [filtredList, setFiltredList] = useState(paymentsData);

  const applyFilters = () => {
    const filtered = payments.filter(
      (p) =>
        (filterGroupValue === 0 || (filterGroupValue > 0 && p.groupId === filterGroupValue)) &&
        (firstPaymentStatusFilterValue === 1 ||
          (firstPaymentStatusFilterValue === 2 && p.firstPaymentStatus) ||
          (firstPaymentStatusFilterValue === 3 && !p.firstPaymentStatus)) &&
        (secondPaymentStatusFilterValue === 1 ||
          (secondPaymentStatusFilterValue === 2 && p.secondPaymentStatus) ||
          (secondPaymentStatusFilterValue === 3 && !p.secondPaymentStatus)) &&
        (thirdPaymentStatusFilterValue === 1 ||
          (thirdPaymentStatusFilterValue === 2 && p.thirdPaymentStatus) ||
          (thirdPaymentStatusFilterValue === 3 && !p.thirdPaymentStatus)) &&
        (fourthPaymentStatusFilterValue === 1 ||
          (fourthPaymentStatusFilterValue === 2 && p.fourthPaymentStatus) ||
          (fourthPaymentStatusFilterValue === 3 && !p.fourthPaymentStatus))
    );
    setFiltredList(filtered);
  };

  const applySurnameSorting = () => {
    if (filterSurnameValue == 1) {
      const sortedForward = filtredList.sort(function (prev, next) {
        if (prev.lastName < next.lastName) {
          return -1;
        }
        if (prev.lastName > next.lastName) {
          return 1;
        } else {
          return 0;
        }
      });
      setFiltredList(sortedForward);
    }
    if (filterSurnameValue == 2) {
      const sortedBackward = filtredList.sort(function (prev, next) {
        if (prev.lastName > next.lastName) {
          return -1;
        }
        if (prev.lastName < next.lastName) {
          return 1;
        } else {
          return 0;
        }
      });
      setFiltredList(sortedBackward);
    }
  };

  useEffect(
    () => applyFilters(),
    [
      filterGroupValue,
      firstPaymentStatusFilterValue,
      secondPaymentStatusFilterValue,
      thirdPaymentStatusFilterValue,
    ]
  );

  useEffect(() => applySurnameSorting(), [filterSurnameValue]);

  const applySurnameFilter = (item: FilterItem) => {
    setFilterSurnameValue(item.id);
  };

  const applyGroupFilter = (item: FilterItem) => {
    setFilterGroupValue(item.id);
  };
  const applyFirstPaymentStatusFilter = (item: FilterItem) => {
    setFirstPaymentStatusFilterValue(item.id);
  };
  const applySecondPaymentStatusFilter = (item: FilterItem) => {
    setSecondPaymentStatusFilterValue(item.id);
  };
  const applyThirdPaymentStatusFilter = (item: FilterItem) => {
    setThirdPaymentStatusFilterValue(item.id);
  };
  const applyFourthPaymentStatusFilter = (item: FilterItem) => {
    setFourthPaymentStatusFilterValue(item.id);
  };

  return (
    <>
      {/* <div className="content-container">
        <table className="payment-table">
          <thead>
            <tr>
              <FilterList data={groupFilterData} callback={applyGroupFilter} />
            </tr>
          </thead>
          <thead>
            <tr>
              <th scope="col">ФИО студента</th>
              <th scope="col">1 оплата</th>
              <th scope="col">2 оплата</th>
              <th scope="col">3 оплата</th>
              <th scope="col">4 оплата</th>
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
                <FilterList
                  data={paymentStatusFilterData}
                  callback={applySecondPaymentStatusFilter}
                />
              </th>
              <th scope="col">
                <FilterList data={paymentStatusFilterData} callback={applyThirdPaymentStatusFilter} />
              </th>
              <th scope="col">
                <FilterList
                  data={paymentStatusFilterData}
                  callback={applyFourthPaymentStatusFilter}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filtredList.map((item) => (
              <PaymentRow data={item} />
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="content-container">
        <div className="group-table-wrapper">
          <FilterList data={groupFilterData} callback={applyGroupFilter} />
          <div className="groups-table-header payments-page-grid margin-top">
            <span>ФИО студента</span>
            <span>1 оплата</span>
            <span>2 оплата</span>
            <span>3 оплата</span>
            <span>4 оплата</span>
          </div>
        </div>
        <div className="group-table-wrapper">
          <div className="payments-page-grid filters-row">
            <FilterList data={surnameFilterData} callback={applySurnameFilter} />
            <FilterList data={paymentStatusFilterData} callback={applyFirstPaymentStatusFilter} />
            <FilterList data={paymentStatusFilterData} callback={applySecondPaymentStatusFilter} />
            <FilterList data={paymentStatusFilterData} callback={applyThirdPaymentStatusFilter} />
            <FilterList data={paymentStatusFilterData} callback={applyFourthPaymentStatusFilter} />
          </div>
        </div>
        <div>
          {filtredList.map((item) => (
            <PaymentRow data={item} />
          ))}
        </div>
      </div>
    </>
  );
};
