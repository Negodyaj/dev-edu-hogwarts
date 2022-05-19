import React, { useEffect, useState } from 'react';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import { StudentRow } from './components/StudentsGroupChangingRow';
import './StudentsListPage.scss';

const studentsData = [
  {
    id: 1,
    userName: 'Антон',
    userSurname: 'Ефременков',
    group: 'Группа 1',
    groupId: 2,
    email: 'chelovek@example.com',
    phoneNum: '+7(999)888-77-66',
  },
  {
    id: 2,
    userName: 'Борис',
    userSurname: 'Годунов',
    group: 'Группа 1',
    groupId: 2,
    email: 'chelovek@example.com',
    phoneNum: '+7(999)888-77-66',
  },
  {
    id: 3,
    userName: 'Михаил',
    userSurname: 'Гончаров',
    group: 'Группа 2',
    groupId: 3,
    email: 'chelovek@example.com',
    phoneNum: '+7(999)888-77-66',
  },
  {
    id: 4,
    userName: 'Булат',
    userSurname: 'Нуриахметов',
    group: 'Группа 2',
    groupId: 3,
    email: 'chelovek@example.com',
    phoneNum: '+7(999)888-77-66',
  },
  {
    id: 5,
    userName: 'Азат',
    userSurname: 'Юнусов',
    group: 'Группа 2',
    groupId: 3,
    email: 'chelovek@example.com',
    phoneNum: '+7(999)888-77-66',
  },
  {
    id: 6,
    userName: 'Камилла',
    userSurname: 'Ганеева',
    group: 'Группа 2',
    groupId: 3,
    email: 'chelovek@example.com',
    phoneNum: '+7(999)888-77-66',
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

export const StudentsListPage = () => {
  const [students, setStudents] = useState(studentsData);
  const [filterSurnameValue, setFilterSurnameValue] = useState(1);
  const [filterGroupValue, setFilterGroupValue] = useState(0);
  const [filtredList, setFiltredList] = useState(studentsData);

  const applySurnameSorting = () => {
    if (filterSurnameValue == 1) {
      const sortedForward = filtredList.sort(function (prev, next) {
        if (prev.userSurname < next.userSurname) {
          return -1;
        }
        if (prev.userSurname > next.userSurname) {
          return 1;
        } else {
          return 0;
        }
      });
      setFiltredList(sortedForward);
    }
    if (filterSurnameValue == 2) {
      const sortedBackward = filtredList.sort(function (prev, next) {
        if (prev.userSurname > next.userSurname) {
          return -1;
        }
        if (prev.userSurname < next.userSurname) {
          return 1;
        } else {
          return 0;
        }
      });
      setFiltredList(sortedBackward);
    }
  };

  useEffect(() => applySurnameSorting(), [filterSurnameValue]);

  const applySurnameFilter = (item: FilterItem) => {
    setFilterSurnameValue(item.id);
  };

  const FilterByGroup = () => {
    const filtered = students.filter(
      (s) => filterGroupValue === 0 || (filterGroupValue > 0 && s.groupId === filterGroupValue)
    );
    setFiltredList(filtered);
  };

  useEffect(() => FilterByGroup(), [filterGroupValue]);

  const applyGroupFilter = (item: FilterItem) => {
    setFilterGroupValue(item.id);
  };

  const changeGroup = (studentId: number, groupId: number) => {
    const studentIndex = students.findIndex((item) => item.id == studentId);
    if (students[studentIndex].groupId) {
      students[studentIndex].groupId = groupId;
      console.log(students[studentIndex].groupId);
    }
    setStudents([...students]);
  };

  return (
    <div className="content-container">
      <div className="group-table-wrapper">
        <div className="groups-table-header group-table-grid-container">
          <span>ФИО студента</span>
          <span>E-mail</span>
          <span>Телефон</span>
          <span className="group-column">Группа</span>
        </div>
      </div>
      <div className="group-table-wrapper">
        <div className="group-table-flex-container filters-row">
          <FilterList data={surnameFilterData} callback={applySurnameFilter} />
          <div className="group-column">
            <FilterList data={groupFilterData} callback={applyGroupFilter} />
          </div>
        </div>
      </div>
      <div>
        {filtredList.map((item) => (
          <StudentRow data={item} changeGroupId={changeGroup} />
        ))}
      </div>
    </div>
  );
};
