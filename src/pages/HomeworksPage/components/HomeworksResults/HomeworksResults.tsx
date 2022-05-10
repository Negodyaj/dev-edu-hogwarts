import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  FilterItem,
  FilterList,
} from '../../../../components/FilterList/FilterList';
import { GroupResponse } from '../../../../models/responses/GroupResponse/GroupResponse';
import { UserResponse } from '../../../../models/responses/GroupResponse/UserResponse';
import { baseWretch } from '../../../../services/base-wretch.service';
import { groupUrl } from '../../../../shared/consts';
import { AppState } from '../../../../store/store';
import './HomeworkResults.scss';
import { HwResultRowProps } from './HwResultRow';
import { HwResultRow } from './HwResultRow';
//import { GroupResponseForHWResults, Users } from './HwResultsResponse';

const toCheckHWFilterData: FilterItem[] = [
  { id: 0, name: 'Все' },
  { id: 1, name: 'Проверить' },
  { id: 2, name: 'Проверить правки' },
];

const resultHWFilterData: FilterItem[] = [
  { id: 0, name: 'Все' },
  { id: 1, name: 'Сдано' },
  { id: 2, name: 'Не сдано' },
  { id: 3, name: 'Сдано с опозданием' },
];
///api/Homeworks/by-group/{groupId} -> get hw list
////api/student-homeworks/task/{taskId}/answers -> get array of stuents answers
//api/student-homeworks/by-user/{userId}
//
// type HwReultRowsData = {
//   id: number;
//   FIO: string;
//   taskToCheck: string;
//   answer: string;
// }

export const HomeworksResults = () => {
  const { homeworks, selectedTab } = useSelector(
    (state: AppState) => state.homeworksPageState
  );
  const [studentList, setStudentList] = useState<UserResponse[]>([]);
  
  useEffect(() => {
    if (selectedTab > 0) {
      baseWretch()
        .url(`${groupUrl}/${selectedTab}`) ///api/Groups/{id} -> to get students by group
        .get()
        .json((groupsData) => {
          setStudentList(((groupsData as GroupResponse).students) as UserResponse[]);
        });
    };
  }, []);

  const students: HwResultRow[] = studentList.map((student) => {return {id: student.id, FIO: `${student.lastName} ${student.firstName}`}})

  const applyFilterToCheckHW = (item: FilterItem) => {

  }
  
  return (
    <div className="homework-result-container">
      <h4 className="homework-result-header">Результаты выполнения задания</h4>
      <table>
        <tr>
          <th>ФИО студента</th>
          <th>Задача</th>
          <th>Результат</th>
          <th></th>
        </tr>
        <tr className="filter-inside">
          <td></td>
          <td>
            <FilterList data={toCheckHWFilterData} callback={applyFilterToCheckHW} />
          </td>
          <td>
            <FilterList data={resultHWFilterData} />
          </td>
          <td></td>
        </tr>
        {students.map((item)=>{ <HwResultRow data={item} />})}
      </table>
    </div>
  );
};
