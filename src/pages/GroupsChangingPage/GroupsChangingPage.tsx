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
        <div className="groups-table-header group-table-flex-container">
          <span>ФИО студента</span>
          <span className="second-column">Группа</span>
        </div>
      </div>
      <div className="group-table-wrapper">
        <div className="group-table-flex-container filters-row">
          <FilterList data={surnameFilterData} callback={applySurnameFilter} />
          <div className="second-column">
            <FilterList data={groupFilterData} callback={applyGroupFilter} />
          </div>
        </div>
      </div>
      <div>
        {filtredList.map((item) => (
          <StudentsGroupRow data={item} changeGroupId={changeGroup} />
        ))}
      </div>
    </div>
  );
};
