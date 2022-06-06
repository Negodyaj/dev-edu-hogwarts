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
  { id: 2, name: 'A-z' },
  { id: 1, name: 'Z-a' },
];

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
  const [filterSurnameValue, setFilterSurnameValue] = useState(1);
  const [filterGroupValue, setFilterGroupValue] = useState(0);
  const [filtredList, setFiltredList] = useState<StudentToShow[]>(students);

  const { groups } = useSelector(
    (state: AppState) => state.studentsListPageState as StudentsListPageState
  );
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
            groups: s.groups?.length ? s.groups : [{ id: 0, name: 'Без группы' }],
          };
        });
      });
    setStudents(studentsList);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setFiltredList(students);
  }, [students]);

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
      // setStudents(sortedForward);
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
      setStudents(sortedBackward);
      setFiltredList(sortedBackward);
    }
  };

  useEffect(() => applySurnameSorting(), [filterSurnameValue]);

  const applySurnameFilter = (item: FilterItem) => {
    setFilterSurnameValue(item.id);
  };

  const FilterByGroup = () => {
    const filtered = filtredList.filter(
      (s) =>
        filterGroupValue === 0 ||
        (filterGroupValue > 1 && s.groups[0].id === filterGroupValue) ||
        (!s.group && filterGroupValue === 1)
    );
    setFiltredList(filtered);
  };

  useEffect(() => FilterByGroup(), [filterGroupValue]);

  const applyGroupFilter = (item: FilterItem) => {
    setFilterGroupValue(item.id);
  };

  const changeGroup = (studentId: number, groupId: number) => {
    const studentIndex = students.findIndex((item) => item.id == studentId);
    if (students[studentIndex].groups[0].id) {
      students[studentIndex].groups[0].id = groupId;
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
            <FilterList data={groups || []} callback={applyGroupFilter} />
          </div>
        </div>
      </div>
      <div>
        {filtredList.map((item) => (
          <StudentRow data={item} groups={groups} changeGroupId={changeGroup} />
        ))}
      </div>
    </div>
  );
};
