import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadGroups } from '../../actions/studentsList.thunk';
import { FilterItem, FilterList } from '../../components/FilterList/FilterList';
import { baseWretch } from '../../services/base-wretch.service';
import { studentsUrl } from '../../shared/consts';
import { StudentsListPageState } from '../../store/reducers/studentsList.reducer';
import { AppState } from '../../store/store';
import { StudentRow } from './components/StudentsGroupChangingRow';
import './StudentsListPage.scss';

const surnameFilterData: FilterItem[] = [
  { id: 1, name: 'A-z' },
  { id: 2, name: 'Z-a' },
];

const emptyGroupObject: Group = {
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
  const [students, setStudents] = useState<StudentToShow[]>([]);
  const [filteredList, setFilteredList] = useState<StudentToShow[]>(students);

  const { groups } = useSelector(
    (state: AppState) => state.studentsListPageState as StudentsListPageState
  );

  const groupsToSelect = [emptyGroupObject, ...groups];
  const groupsForFilter = [{ id: 0, name: 'Все' }, ...groupsToSelect];

  useEffect(() => {
    dispatch(loadGroups());
  }, []);

  async function getData() {
    const studentsList: StudentToShow[] = await baseWretch()
      .url(studentsUrl)
      .get()
      .json((data) => {
        const respData: Student[] = data as Student[];
        return respData.map<StudentToShow>((s) => {
          return {
            ...s,
            group: s.groups?.length ? s.groups[0] : undefined,
            groups: s.groups?.length ? s.groups : [emptyGroupObject],
          };
        });
      });
    setStudents(studentsList);
    setFilteredList(studentsList);
  }

  useEffect(() => {
    getData();
  }, []);

  const applySurnameSorting = (filterSurnameValue: number) => {
    const studentsCopy = [...students];
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
  const applyGroupFilter = (item: FilterItem) => {
    const filterValue = item.id;
    const filtered = students.filter(
      (s) =>
        filterValue === 0 ||
        (filterValue > 0 && s.groups[0].id === filterValue) ||
        (!s.group && filterValue === -1)
    );
    setFilteredList(filtered);
  };

  const changeGroup = (studentId: number, groupId: number) => {
    const studentsCopy = [...students];
    const student = studentsCopy.find((item) => item.id == studentId);
    const group = groupsToSelect.find((x) => x.id === groupId);
    if (!student || !group) return;
    if (student.groups && student.groups[0].id) {
      student.groups[0].id = groupId;
    } else {
      student.groups = [{ id: groupId, name: group.name }];
    }
    student.group = { id: groupId, name: group.name };
    const filtered = studentsCopy.filter(
      (s) =>
        groupId === 0 || (groupId > 0 && s.groups[0].id === groupId) || (!s.group && groupId === -1)
    );
    setFilteredList(filtered);
    setStudents(studentsCopy);
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
