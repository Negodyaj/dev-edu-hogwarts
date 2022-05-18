import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FilterItem, FilterList } from '../../../../components/FilterList/FilterList';
import { GroupResponse } from './Responses/GroupResponse';
import { UserResponse } from './Responses/UserResponse';
import { baseWretch } from '../../../../services/base-wretch.service';
import { groupUrl } from '../../../../shared/consts';
import { AppState } from '../../../../store/store';
import './HomeworkResults.scss';
import { AnswerResponse } from './Responses/AnswerResponse';
import { HwResultRow } from './HwResultRow';
import { AnswersMock } from './Responses/AnswersMock';

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

export const HomeworksResults = () => {
  const { selectedTab } = useSelector((state: AppState) => state.homeworksPageState);
  const { homework } = useSelector((state: AppState) => state.homeworkPageState);

  const [answerList, setAnswerList] = useState<AnswerResponse[]>([]);

  useEffect(() => {
    if (homework) {
      //ЗАМЕНИТЬ ПРИ НАЛИЧИИ ENDPOINT'A
      baseWretch()
        .url(`${groupUrl}/${selectedTab}`) ///api/Groups/{id} -> to get students by group
        .get()
        .json((groupsData) => {
          const studentList: UserResponse[] = (groupsData as GroupResponse)
            .students as UserResponse[];
          const usersIds = studentList.map((user) => user.id);
          baseWretch()
            .url(`api/student-homeworks/task/${homework?.task.id}/answers`)
            .get()
            .json((ans) => {
              setAnswerList(
                (ans as AnswerResponse[]).filter((answer) => usersIds.includes(answer.user.id))
              );
            });
        });
    }
  }, []);
  const [answersToDisplay, setAnswersToDisplay] = useState<AnswerResponse[]>(answerList);

  useEffect(() => {
    setAnswerList(AnswersMock); // TO DELETE (MOCK)
    setAnswersToDisplay(answerList);
  }, [answerList]);

  const applyFilterToCheckHW = (item: FilterItem) => {
    setAnswersToDisplay(
      answerList.filter((answer) => {
        switch (item.id) {
          case 1:
            return answer.status.toString() === 'ToCheck';
          case 2:
            return answer.status.toString() === 'ToVerifyFixes';
          default:
            return true;
        }
      })
    );
  };

  const applyFilterIsPass = (item: FilterItem) => {
    setAnswersToDisplay(
      answerList.filter((answer) => {
        switch (item.id) {
          case 1:
            return answer.status.toString() === 'Done';
          case 2:
            return (
              answer.status.toString() === 'Undone' ||
              answer.status.toString() === 'ToCheck' ||
              answer.status.toString() === 'ToVerifyFixes'
            );
          case 3:
            return answer.status.toString() === 'DoneAfterDeadline';
          default:
            return true;
        }
      })
    );
  };

  return (
    <div className="homework-result-container">
      <h4 className="homework-result-header">Результаты выполнения задания</h4>
      <div className="table-row header">
        <div>ФИО студента</div>
        <div>Задача</div>
        <div>Результат</div>
        <div></div>
      </div>
      <div className="filter-inside table-row">
        <div></div>
        <div>
          <FilterList data={toCheckHWFilterData} callback={applyFilterToCheckHW} />
        </div>
        <div>
          <FilterList data={resultHWFilterData} callback={applyFilterIsPass} />
        </div>
        <div></div>
      </div>
      {answersToDisplay.map((ans) => (
        <HwResultRow data={ans} key={ans.id} />
      ))}
    </div>
  );
};
