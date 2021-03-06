import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadGroups, loadStudents } from '../../actions/studentsList.thunk';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import { StudentsListPageState } from '../../store/reducers/studentsList.reducer';
import { AppState } from '../../store/store';
import { StudentRow } from './components/StudentsGroupChangingRow';
import './StudentsListPage.scss';

const surnameFilterData: FilterItem[] = [
  { id: 1, name: 'A-z' },
  { id: 2, name: 'Z-a' },
];

export const emptyGroupObject: Group = {
  id: -1,
  name: 'Без группы',
};

export type Group = {
  id: number;
  name: string;
};

export type Student = {
  id: number;
  firstName: string;
  lastName: string;
  groups: Group[];
  phoneNumber: string;
  email: string;
};

export type StudentToShow = {
  id: number;
  firstName: string;
  lastName: string;
  group: Group | undefined;
  groups: Group[];
  phoneNumber: string;
  email: string;
};

export const StudentsListPage = () => {
  const dispatch = useDispatch();
  const [studentsToShow, setStudentsToShow] = useState<StudentToShow[]>([]);
  const [filteredList, setFilteredList] = useState<StudentToShow[]>(studentsToShow);

  const { groups, students } = useSelector(
    (state: AppState) => state.studentsListPageState as StudentsListPageState
  );

  const groupsToSelect = [emptyGroupObject, ...groups];
  const groupsForFilter = [{ id: 0, name: 'Все' }, ...groupsToSelect];

  useEffect(() => {
    dispatch(loadGroups());
    dispatch(loadStudents());
  }, []);

  function getData() {
    const studentsList = students.map<StudentToShow>((s) => {
      return {
        ...s,
        group: s.groups?.length ? s.groups[0] : undefined,
        groups: s.groups?.length ? s.groups : [emptyGroupObject],
      };
    });
    setStudentsToShow(studentsList);
    setFilteredList(studentsList);
  }

  useEffect(() => {
    getData();
  }, []);

  const applySurnameSorting = (filterSurnameValue: number) => {
    const studentsCopy = [...studentsToShow];
    if (filterSurnameValue == 1) {
      const sortedForward = studentsCopy.sort(function (prev, next) {
        if (prev.lastName < next.lastName) {
          return -1;
        }
        if (prev.lastName > next.lastName) {
          return 1;
        } else {
          return 0;
        }
      });

      setFilteredList(sortedForward);
    }
    if (filterSurnameValue == 2) {
      const sortedBackward = studentsCopy.sort(function (prev, next) {
        if (prev.lastName > next.lastName) {
          return -1;
        }
        if (prev.lastName < next.lastName) {
          return 1;
        } else {
          return 0;
        }
      });

      setFilteredList(sortedBackward);
    }
  };

  const applySurnameFilter = (item: FilterItem) => {
    applySurnameSorting(item.id);
  };
  const setFiltered = (arr: StudentToShow[], neededId: number) => {
    const filtered = arr.filter(
      (s: { groups: { id: number }[]; group: any }) =>
        neededId === 0 ||
        (neededId > 0 && s.groups[0].id === neededId) ||
        (!s.group && neededId === -1)
    );
    setFilteredList(filtered);
  };
  const applyGroupFilter = (item: FilterItem) => {
    const filterValue = item.id;
    setFiltered(studentsToShow, filterValue);
  };

  const changeGroup = (studentId: number, groupId: number) => {
    const studentsCopy = [...studentsToShow];
    const student = studentsCopy.find((item) => item.id == studentId);
    const group = groupsToSelect.find((x) => x.id === groupId);
    if (!student || !group) return;
    if (student.groups && student.groups[0].id) {
      student.groups[0].id = groupId;
    } else {
      student.groups = [{ id: groupId, name: group.name }];
    }
    student.group = { id: groupId, name: group.name };
    setStudentsToShow(studentsCopy);
    setFiltered(studentsCopy, groupId);
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
            <FilterList data={groupsForFilter || []} callback={applyGroupFilter} />
          </div>
        </div>
      </div>
      <div>
        {filteredList.map((item) => (
          <StudentRow
            data={item}
            groups={groupsToSelect}
            changeGroupId={changeGroup}
            key={`student${item.id}`}
            selectedGroup={item.groups[0]}
          />
        ))}
      </div>
    </div>
  );
};
