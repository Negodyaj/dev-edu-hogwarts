import React, { useEffect, useState } from 'react';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import { StudentsGroupRow } from './components/StudentsGroupChangingRow';
import './GroupsChangingPage.scss';

const studentsData = [
  {
    id: 1,
    userName: 'Антон',
    userSurname: 'Ефременков',
    group: 'Группа 1',
    groupId: 2,
  },
  {
    id: 2,
    userName: 'Борис',
    userSurname: 'Годунов',
    group: 'Группа 1',
    groupId: 2,
  },
  {
    id: 3,
    userName: 'Михаил',
    userSurname: 'Гончаров',
    group: 'Группа 2',
    groupId: 3,
  },
  {
    id: 4,
    userName: 'Булат',
    userSurname: 'Нуриахметов',
    group: 'Группа 2',
    groupId: 3,
  },
  {
    id: 5,
    userName: 'Азат',
    userSurname: 'Юнусов',
    group: 'Группа 2',
    groupId: 3,
  },
  {
    id: 6,
    userName: 'Камилла',
    userSurname: 'Ганеева',
    group: 'Группа 2',
    groupId: 3,
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

export const GroupsChangingPage = () => {
  const [students] = useState(studentsData);

  return (
    <div className="content-container">
      <div className="group-table-wrapper">
        <div className="groups-table-header group-table-flex-container">
          <span>ФИО студента</span>
          <span className="second-column">Группа</span>
        </div>
      </div>
      <div className="group-table-wrapper">
        <div className="group-table-flex-container filters-row">
          <FilterList data={surnameFilterData} callback={undefined} />
          <div className="second-column">
            <FilterList data={groupFilterData} callback={undefined} />
          </div>
        </div>
      </div>
      <div>
        {students.map((item) => (
          <StudentsGroupRow data={item} />
        ))}
      </div>
    </div>
  );
};
